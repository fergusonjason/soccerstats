// /app/screens/TeamManagement/index.js

import React, {Component} from "react";
import {View, FlatList, Alert} from "react-native";
import {withNavigation} from "react-navigation";

import {open, close, query, execute} from "./../../util/DbUtils";

import TeamManagementRow from "./TeamManagementRow";
import PortableButton from "./../../components/PortableButton";

import masterStyles, {listPage} from "./../../styles/master";
import styles, {bigButtonStyles} from "./styles";

class TeamManagementScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            divisionId: this.props.navigation.getParam("divisionId"),
            teams: []
        }
    }

    async componentDidMount() {

        console.log("Entered componentDidMount()");

        this.db = await open({name: "stats.db",createFromLocation: "~soccerstats.db"});
        this._query();
    }

    async componentWillUnmount() {

        await close(this.db);
    }

    _query = async () => {

        console.log("Entered _query");
        const sql = "SELECT * FROM TEAM WHERE TEAM_DIVISION_ID = ?";
        let result = await query(this.db, sql, [this.state.divisionId]);

        this.setState({teams: result.result});
    }

    _btnDeleteTeam = async (teamId) => {

        await _deleteTeam(teamId);
        await _query();
    }

    _deleteTeam = async (teamId) => {

        const sql = "DELETE FROM TEAM WHERE TEAM_ID = ?";
        let result = await execute(this.db, sql, [teamId]);
    }

    _btnEditTeam = (teamId) => {
        console.log("Entered _btnEditTeam, teamId: " + teamId);
        this.props.navigation.navigate("EditTeamScreen",{teamId: teamId, divisionId: this.state.divisionId, refresh: () => this._query()});
    }

    _btnAddPlayers = (teamId) => {
        this.props.navigation.navigate("Add Players", {teamId: teamId, refresh: () => this._query()});
    }

    _btnAddTeam = () => {
        this.props.navigation.navigate("AddTeamScreen", {divisionId: this.state.divisionId, refresh: () => this._query()});
    }

    _renderItem = ({item}) => {

        return (
            <TeamManagementRow
                teamName={item.TEAM_NAME}
                onPlayers={() => {this._btnAddPlayers(item.TEAM_ID)}}
                onEdit={() =>{this._btnEditTeam(item.TEAM_ID)}}
                onDelete={()=>{this._btnDeleteTeam(item.TEAM_ID)}} />
        );
    }

    render() {
        return (
            <View style={masterStyles.component} >
                <View styles={listPage.listArea}>
                    <FlatList
                        data={this.state.teams}
                        renderItem={this._renderItem}
                        keyExtractor={(item) => item.TEAM_ID.toString()} />
                </View>
                <View style={listPage.bottomButtonArea}>
                    <PortableButton defaultLabel="Add Team" 
                        onPress={()=>this._btnAddTeam()}
                        style={bigButtonStyles}
                        disabled={false}
                    />
                </View>
            </View>
        );
    }
}

export default withNavigation(TeamManagementScreen);