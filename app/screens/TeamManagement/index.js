// /app/screens/TeamManagement/index.js

import React, {Component} from "react";
import {View, FlatList, Alert} from "react-native";

import {open, close, query, execute} from "./../../util/DbUtils";

import TeamManagementRow from "./TeamManagementRow";
import PortableButton from "./../../components/PortableButton";

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

        this.props.navigation.navigate("EditTeamPage",{teamId: teamId, refresh: () => this._query()});
    }

    _btnAddPlayers = (teamId) => {
        this.props.navigation.navigate("Add Players", {teamId: teamId, refresh: () => this._query()});
    }

    _btnAddTeam = () => {
        Alert.alert("Not Implemented",
            "Adding Teams not yet implemented",
            [
                {text: "Ok"}
            ]);
        //this.props.navigation.navigate("AddTeamScreen", {divisionId: this.state.divisionId});
    }

    _renderItem = ({item}) => {

        return (
            <TeamManagementRow
                teamName={item.TEAM_NAME}
                onPlayers={() => {this._btnAddPlayers()}}
                onEdit={() =>{this._btnEditTeam()}}
                onDelete={()=>{this._btnDeleteTeam()}} />
        );
    }

    render() {
        return (
            <View style={styles.component} >
                <View styles={styles.listArea}>
                    <FlatList
                        data={this.state.teams}
                        renderItem={this._renderItem}
                        keyExtractor={(item) => item.TEAM_ID.toString()} />
                </View>
                <View style={styles.bottomButtonArea}>
                    <PortableButton defaultLabel="Add Team" 
                        onPress={()=>this._btnAddTeam()}
                        style={bigButtonStyles}
                        disabled={false}
                    />
                    {/* <TouchableOpacity style={styles.bottomButton}
                        onPress={() => {this._addDivision()}}>
                        <Text style={styles.bottomButtonText}>Add Team</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        );
    }
}

export default TeamManagementScreen;