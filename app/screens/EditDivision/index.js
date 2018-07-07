// /apps/screens/EditDivision/index.js
import React, {Component} from "react";
import {View, Text, TextInput, Alert, TouchableOpacity} from "react-native";
import {withNavigation} from "react-navigation";

import {open,query, execute, close} from "./../../util/DbUtils";

import PortableButton from "./../../components/PortableButton";

import masterStyles, {dataEntryPage, bigButtonStyles} from "./../../styles/master";

class EditDivisionScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {division: null,
            DIVISION_ID: -1,
            DIVISION_NAME: ""}
    }

    async componentDidMount() {

        let divisionId = this.props.navigation.getParam("divisionId");

        const sql = "SELECT * FROM DIVISION WHERE DIVISION_ID = ?";

        this.db = await open({name: "stats.db",createFromLocation: "~soccerstats.db"});
        let result = await query(this.db, sql, [divisionId]);

        this.setState({DIVISION_NAME: result.result[0].DIVISION_NAME, DIVISION_ID: divisionId});
    }

    async componentWillUnmount() {

        close(this.db);
    }

    _btnUpdate = async () => {

        const sql = "UPDATE DIVISION(DIVISION_NAME) VALUES(?) WHERE DIVISION_ID = ?";
        let result = await execute(this.db, sql, [this.state.DIVISION_NAME, this.state.DIVISION_ID]);

        console.log("Rows affected: " + result.rowsAffected);
        if (result.rowsAffected == 0) {
            Alert.alert("Database error",
            "Error: Database update failed",
            [
                {text: "Ok"}
            ]);
        } else {
            this.props.navigation.state.params.refresh();
            this.props.navigation.navigate("DivisionManagementScreen", {programId: 1});
        }
        

    }

    render() {
        return (
            <View style={masterStyles.component}>
                <View style={dataEntryPage.inputSection}>
                    <Text>Division Name</Text>
                    <TextInput value={this.state.DIVISION_NAME} 
                        onChangeText={(text) => this.setState({DIVISION_NAME: text})}/>
                </View>
                <View style={dataEntryPage.bottomButtonArea}>
                    <PortableButton defaultLabel="Update Division"
                        onPress={() => {this_btnUpdate()}}
                        onLongPress={()=>{}}
                        style={bigButtonStyles} />
                </View>
            </View>
        );
    }
}

export default withNavigation(EditDivisionScreen);