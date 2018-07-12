// /app/screens/EditStaffMemberScreen/index.js
import React, {Component} from "react";
import {View, Text, TextInput, Alert} from "react-native";
import {withNavigation} from "react-navigation";

import {open, query, close, execute} from "./../../util/DbUtils";

import PortableButton from "./../../components/PortableButton";

import masterStyles, {dataEntryPage, bigButtonStyles} from "./../../styles/master";

class EditStaffMemberScreen extends Component {

    constructor(props) {
        super(props);

        // create default values for the STAFF values we need so that we don't get an
        // undefined error when render() runs before the database query returns the
        // values. Don't get fancy with an object, just store the values in their own keys.
        this.state = {
            STAFF_LAST_NAME: "",
            STAFF_FIRST_NAME: "",
            STAFF_EMAIL: "",
            STAFF_CELL: "",
            STAFF_ID: -1
        }
    }

    _query = async () => {

        let id = this.props.navigation.getParam("id",-1);

        // load the record
        const sql = "SELECT * FROM STAFF WHERE STAFF_ID = ?";

        let result = await query(this.db, sql, [id]);

        if (result.result.length > 0) {
            let row = result.result[0];
            this.setState({"STAFF_LAST_NAME": row.STAFF_LAST_NAME,
                "STAFF_FIRST_NAME": row.STAFF_FIRST_NAME,
                "STAFF_EMAIL": row.STAFF_EMAIL,
                "STAFF_CELL": row.STAFF_CELL});
        } else {
            Alert.alert("Database error",
                "Unable to load user from database",
                [
                    {text:"Ok"}
                ]);
        }
        
    }

    _btnUpdate = async () => {

        // run an update
        let id = this.props.navigation.getParam("id",-1);

        const sql = "UPDATE STAFF SET STAFF_LAST_NAME = ?, STAFF_FIRST_NAME = ?, STAFF_EMAIL = ?, STAFF_CELL = ? WHERE STAFF_ID = ?";
        let result = await execute(this.db, sql,[this.state.STAFF_LAST_NAME, this.state.STAFF_FIRST_NAME, this.state.STAFF_EMAIL, this.state.STAFF_CELL, id]);

        console.log("Records updated: " + result.rowsAffected);

        if (result.rowsAffected > 0) {
            // navigate back to Staff Management
            this.props.navigation.state.params.refresh();
            this.props.navigation.navigate("StaffManagementScreen");
        } else {
            // show an alert saying something went wrong
            Alert.alert(
                "Database error",
                "Unable to update record in database",
                [
                    {text: "Ok"}
                ]
            )
        }

    }

    async componentDidMount() {

        // db has to be opened here instead of the constructor due to the await keyword
        this.db = await open({name: "stats.db",createFromLocation: "~soccerstats.db"});

        await this._query();

    }

    async componentWillUnmount() {

        await close(this.db);

    }

    render() {
        return (
            <View style={masterStyles.component}>
                <View style={dataEntryPage.inputArea}>
                    <Text>Last Name:</Text>
                    <TextInput 
                        onChangeText={(text)=>{ this.setState({STAFF_LAST_NAME: text}) }}
                        value={this.state.STAFF_LAST_NAME} />
                    <Text>First Name:</Text>
                    <TextInput 
                        onChangeText={(text)=>{ this.setState({STAFF_FIRST_NAME: text}) }}
                        value={this.state.STAFF_FIRST_NAME} />
                    <Text>Email:</Text>
                    <TextInput 
                         onChangeText={(text) => { this.setState({STAFF_EMAIL: text}) }}
                         value={this.state.STAFF_EMAIL} />
                    <Text>Cell:</Text>
                    <TextInput 
                        onChangeText={(text)=>{ this.setState({STAFF_CELL: text}) }}
                        value={this.state.STAFF_CELL} />                         
                </View>
                <View style={dataEntryPage.bottomButtonArea}>
                    <PortableButton defaultLabel="Update Staff Member"
                        onPress={()=>{this._btnUpdate()}}
                        onLongPress={()=>{}}
                        style={bigButtonStyles} 
                        disabled={false}/>
                </View>
            </View>
        );

    }
}

export default withNavigation(EditStaffMemberScreen);