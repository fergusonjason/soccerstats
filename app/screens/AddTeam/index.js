import React, {Component} from "react";
import {View, Text, TextInput, Alert} from "react-native";
import {withNavigation} from "react-navigation";

import {open, execute, close} from "./../../util/DbUtils";

import PortableButton from "./../../components/PortableButton";

import masterStyles, {dataEntryPage, bigButtonStyles} from "./../../styles/master";

class AddTeam extends Component {

    constructor(props) {
        super(props);

        this.state = {TEAM_NAME: ""}
    }

    async componentDidMount() {
        this.db = await open({name: "stats.db",createFromLocation: "~soccerstats.db"});
    }

    async componentWillUnmount() {
        await close(this.db);
    }

    _add = async () => {

        let divisionId = this.props.navigation.getParam("divisionId");

        const sql = "INSERT INTO TEAM(TEAM_NAME, TEAM_DIVISION_ID) VALUES (?,?)";
        await execute(this.db, sql, [this.state.TEAM_NAME, divisionId]);

        this.props.navigation.state.params.refresh();
        this.props.navigation.navigate("TeamManagementScreen",{divisionId: divisionId});
    }

    _btnAdd = async () => {

        this._add();
    }

    render() {
        return (
            <View style={masterStyles.component}>
                <View style={dataEntryPage.inputArea} >
                    <Text>Team Name: </Text>
                    <TextInput onChangeText={(text) => this.setState({"TEAM_NAME": text})} />
                </View>
                <View style={dataEntryPage.bottomButtonArea}>
                    <PortableButton defaultLabel="Add Team"
                        onPress={() => this._btnAdd()}
                        onLongPress={()=>{}}
                        style={bigButtonStyles}
                        disabled={false} />
                </View>
            </View>            
        );
    }
}

export default withNavigation(AddTeam);