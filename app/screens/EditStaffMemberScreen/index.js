import React, {Component} from "react";
import {View, Text, TextInput, TouchableOpacity, Alert} from "react-native";
import {withNavigation} from "react-navigation";

import {open, query, close, execute} from "./../../util/DbUtils";

import styles from "./styles";

class EditStaffMemberScreen extends Component {

    constructor(props) {
        super(props);

        // create default values for the STAFF values we need so that we don't get an
        // undefined error when render() runs before the database query returns the
        // values. Don't get fancy with an object, just store the values in their own keys.
        this.state = {
            STAFF_NAME: "",
            STAFF_EMAIL: "",
            STAFF_ID: -1
        }
    }

    _btnUpdate = async () => {

        // run an update
        let id = this.props.navigation.getParam("id",-1);

        const sql = "UPDATE STAFF SET STAFF_NAME = ?, STAFF_EMAIL = ? WHERE STAFF_ID = ?";
        let result = await execute(this.db, sql,[this.state.STAFF_NAME, this.state.STAFF_EMAIL, id]);

        console.log("Records updated: " + result.rowsAffected);

        if (result.rowsAffected > 0) {
            // navigate back to Staff Management
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

        // get the id to load from the nav props
        let id = this.props.navigation.getParam("id",-1);
        console.log("ID: " + id);

        // load the record
        const sql = "SELECT * FROM STAFF WHERE STAFF_ID = ?";

        // db has to be opened here instead of the constructor due to the await keyword
        this.db = await open({name: "stats.db",createFromLocation: "~soccerstats.db"});

        let result = await query(this.db, sql, [id]);
        console.log("Result count: " + result.result.length);

        // this probably won't happen since we are getting the id from the nav props, but
        // safety third!
        if (result.result.length > 0) {
            console.log("Result: " + JSON.stringify(result.result[0]));
            this.setState({STAFF_NAME: result.result[0].STAFF_NAME, STAFF_EMAIL: result.result[0].STAFF_EMAIL});
            console.log("State: " + JSON.stringify(this.state));
        }
    }

    componentWillUnmount() {

        this.db.close();
    }

    render() {
        return (
            <View style={styles.component}>
                <View style={styles.inputArea}>
                    <Text>Name:</Text>
                    <TextInput 
                        onChangeText={(text)=>{ this.setState({STAFF_NAME: text}) }}
                        value={this.state.STAFF_NAME} />
                    <Text>Email:</Text>
                    <TextInput 
                         onChangeText={(text) => { this.setState({STAFF_EMAIL: text}) }}
                         value={this.state.STAFF_EMAIL} />
                </View>
                <View style={styles.bottomButtonArea}>
                    <TouchableOpacity style={styles.bottomButton}
                        onPress={this._btnUpdate}>
                        <Text style={styles.bottomButtonText}>Update Staff Member</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );

    }
}

export default withNavigation(EditStaffMemberScreen);