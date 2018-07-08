// /apps/screens/EditTeam/EditTeam.js
import React, {Component} from "react";
import {View,Text, TextInput, Alert} from "react-native";
import {withNavigation} from "react-navigation";

import {open, query, execute, close} from "./../../util/DbUtils";

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

    async componentDidMount() {

        this.db = await open({name: "stats.db", createFromLocation: "~soccerstats.db"});

        const sql = "SELECT * FROM TEAM WHERE TEAM_ID=?";
        let result = await query(this.db, sql, [this.state.teamId]);

        console.log("TEAM NAME: " + result.result[0].TEAM_NAME);
        this.setState({"TEAM_NAME": result.result[0].TEAM_NAME});
    }

    async componentWillUnmount() {
        await close(this.db);
    }

    _btnPress = async () => {

        console.log("Entered _btnPress()");

        const sql = "UPDATE TEAM SET TEAM_NAME=? WHERE TEAM_ID=?";
        let result = await execute(this.db, sql, [this.state.TEAM_NAME, this.state.teamId]);

        if (result.rowsAffected == 0) {
            Alert("Database error",
                "Unable to update database",
                [{text: "Ok"}]);
        } else {

            this.props.navigation.state.params.refresh();
            this.props.navigation.navigate("TeamManagementScreen", {divisionId: this.state.divisionId});
        }
    }

    render() {
        return (
            <View style={masterStyles.component}>
                <View style={dataEntryPage.inputSection}>
                    <Text>Team Name</Text>
                    <TextInput value={this.state.TEAM_NAME}
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

export default withNavigation(EditTeam);