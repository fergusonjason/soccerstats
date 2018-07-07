// /apps/screens/EditTeam/EditTeam.js
import React, {Component} from "react";
import {View,Text, TextInput, Alert, TouchableHighlight} from "react-native";
import {withNavigation} from "react-navigation";
import PropTypes from "prop-types";

import {open, execute, close} from "./../../util/DbUtils";

import PortableButton from "./../../components/PortableButton";
import masterStyles, {dataEntryPage, bigButtonStyles} from "./../../styles/master";


class EditTeam extends Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {

        this.db = await open({location: "stats.db", createFromLocation: "~soccerstats.db"});
    }

    async componentWillUnmount() {
        await close(this.db);
    }

    _btnPress = async () => {

        let teamId = this.props.teamId;

        const sql = "UPDATE TEAM SET TEAM_NAME=? WHERE TEAM_ID=?";
        let result = await execute(this.db, sql, []);

        if (result.rowsAffected == 0) {
            Alert("Database error",
                "Unable to update database",
                [{text: "Ok"}]);
        }

        this.props.onEdit();
    }

    render() {
        return (
            <View style={masterStyles.component}>
                <View style={dataEntryPage.inputArea}>
                    <Text>Team Name</Text>
                    <TextInput value={this.state.TEAM_NAME}
                        onChangeText={(text) => {this.setState(TEAM_NAME, text)}} />
                </View>
                <View style={dataEntryPage.bottomButtonSection}>
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

EditTeam.propTypes = {
    teamId: PropTypes.number.isRequired,
    onEdit: PropTypes.func.isRequired
}
export default withNavigation(EditTeam);