import React, {Component} from "react";
import {View, Text, TextInput, TouchableOpacity, Alert} from "react-native";

import {open, execute} from "./../../util/DbUtils";

import styles from "./styles";

class AddDivisionScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {DIVISION_NAME: ""};
    }

    async componentDidMount() {

        this.db = await open({name: "stats.db",createFromLocation: "~soccerstats.db"});

    }

    async componentWillUnmount() {

        await this.db.close();
    }

    _btnAdd = async () => {

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

        this.props.navigation.navigate("DivisionManagementScreen");
    }

    render() {
        return (
            <View style={styles.component}>
                <View style={styles.inputArea} >
                    <Text>Division Name: </Text>
                    <TextInput onChangeText={(text) => this.setState({"DIVISION_NAME": text})} />
                </View>
                <View style={styles.bottomButtonArea}>
                    <TouchableOpacity style={styles.bottomButton}
                        onPress={this._btnAdd}>
                        <Text style={styles.bottomButtonText}>Add Division</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default AddDivisionScreen;