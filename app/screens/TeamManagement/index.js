// /app/screens/TeamManagement/index.js

import React, {Component} from "react";
import {View, FlatList, Alert} from "react-native";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";

import {open, close, query, execute} from "./../../util/DbUtils";

import TeamManagementRow from "./TeamManagementRow";
import PortableButton from "./../../components/PortableButton";

import {getAllTeams,deleteTeam} from "./../../redux/actions/teamActions";

import masterStyles, {listPage} from "./../../styles/master";
import styles, {bigButtonStyles} from "./styles";

class TeamManagementScreen extends Component {

    constructor(props) {
        super(props);

    }

    async componentDidMount() {

        console.log("Entered componentDidMount()");

        let divisionId = this.props.navigation.getParam("divisionId");
        this.props.getTeams(divisionId);
    }


    _btnDeleteTeam = (teamId) => {

        Alert.alert("Are You Sure?",
            "You will not be able to undo this action. Continue?",
            [
                {text: "Ok", onPress: () => {this.props.deleteTeam(teamId)}},
                {text: "Cancel"}
            ]);

    }

    _btnEditTeam = (teamId) => {
        let divisionId = this.props.navigation.getParam("divisionId");
        this.props.navigation.navigate("EditTeamScreen",{teamId: teamId, divisionId: divisionId});
    }

    _btnAddPlayers = (teamId) => {
        this.props.navigation.navigate("Add Players", {teamId: teamId});
    }

    _btnAddTeam = () => {
        this.props.navigation.navigate("AddTeamScreen", {divisionId: this.state.divisionId});
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
                        data={this.props.teams}
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

function mapStateToProps(state) {

    return {
        teams: state.teams
    }
}

function mapDispatchToProps(dispatch) {

    return {
        getTeams: (divisionId) => {dispatch(getAllTeams(divisionId))},
        deleteTeam: (teamId) => {dispatch(deleteTeam(teamId))}
    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(TeamManagementScreen));