// /apps/screens/EditTeam/EditTeam.js
import React, {Component} from "react";
import {View,Text, TextInput, Alert} from "react-native";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";

import {getTeam, editTeam} from "./../../redux/actions/teamActions";

import PortableButton from "./../../components/PortableButton";
import masterStyles, {dataEntryPage, bigButtonStyles} from "./../../styles/master";


class EditTeam extends Component {

    constructor(props) {
        super(props);

        this.state = {TEAM_NAME: "",
            teamId: this.props.navigation.getParam("teamId"),
            divisionId: this.props.navigation.getParam("divisionId")
        };
    }

    componentDidMount() {

        let teamId = this.props.navigation.getParam("teamId");
        this.props.getTeam(teamId);

    }


    _btnPress = () => {

        console.log("Entered _btnPress()");
        let teamObj = {
            TEAM_NAME: this.state.TEAM_NAME,
            TEAM_ID: this.state.TEAM_ID
        }

        this.props.editTeam(teamObj);

        this.props.navigation.navigate("TeamManagementScreen", {divisionId: this.state.divisionId});

    }

    render() {
        return (
            <View style={masterStyles.component}>
                <View style={dataEntryPage.inputSection}>
                    <Text>Team Name</Text>
                    <TextInput value={this.props.team.TEAM_NAME}
                        onChangeText={(text) => {this.setState({"TEAM_NAME": text})}} />
                </View>
                <View style={dataEntryPage.bottomButtonArea}>
                    <PortableButton defaultLabel="Edit Team"
                        onPress={()=> {this._btnPress()}}
                        onLongPress={()=>{}}
                        style={bigButtonStyles}
                        disabled={false} />
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {

    return {
        team: state.team
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTeam: (teamId) => dispatch(getTeam(teamId)),
        editTeam: (teamObj) => dispatch(editTeam(teamObj))
    }
}
export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(EditTeam));