import React, {Component} from "react";
import {View, Text, TextInput, TouchableOpacity, Alert} from "react-native";
import {withNavigation} from "react-navigation";

import {open, execute, close} from "./../../util/DbUtils";

import PortableButton from "./../../components/PortableButton";

import styles from "./styles";
import masterStyles, {dataEntryPage, bigButtonStyles} from "./../../styles/master";

class AddDivisionScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {DIVISION_NAME: ""};
    }

    _btnAdd = async () => {

        console.log("Entered _btnAdd");

        this.db = await open({name: "stats.db",createFromLocation: "~soccerstats.db"});

        // TODO: don't hard-code the 1
        const sql = "INSERT INTO DIVISION(DIVISION_NAME, DIVISION_PROGRAM_ID) VALUES(?, 1)";
        let result = await execute(this.db, sql, [this.state.DIVISION_NAME]);
        
        console.log("Result: " + JSON.stringify(result));
        if (result.rowsAffected == 0) {
            Alert.alert(
                "Database error",
                "Unable to insert record in database",
                [
                    {text: "Ok"}
                ]
            )
        } else {
            console.log("Rows affected: " + result.rowsAffected);
        }

        close(this.db);

        this.props.navigation.state.params.refresh();
        this.props.navigation.navigate("DivisionManagementScreen",{programId: 1});
    }

    render() {
        return (
            <View style={masterStyles.component}>
                <View style={dataEntryPage.inputArea} >
                    <Text>Division Name: </Text>
                    <TextInput onChangeText={(text) => this.setState({"DIVISION_NAME": text})} />
                </View>
                <View style={dataEntryPage.bottomButtonArea}>
                    <PortableButton defaultLabel="Add Division"
                        onPress={() => this._btnAdd()}
                        onLongPress={()=>{}}
                        style={bigButtonStyles} />
                </View>
            </View>
        );
    }
}

export default withNavigation(AddDivisionScreen);