import React, {Component} from "react";
import {View, Text, TextInput} from "react-native";
import {withNavigation} from "react-navigation";
import SQLite from "react-native-sqlite-storage";

import {open, query, close} from "./../../util/DbUtils";

class EditStaffMemberScreen extends Component {

    constructor(props) {
        super(props);

        //this.db = SQLite.openDatabase({name: "stats.db",createFromLocation: "~soccerstats.db"});

        this.state = {member: {
            STAFF_NAME: "",
            STAFF_EMAIL: "",
            STAFF_ID: -1
        }};
    }

    async componentDidMount() {

        // get the id to load from the nav props
        let id = this.props.navigation.getParam("id",-1);
        console.log("ID: " + id);

        // load the record
        const sql = "SELECT * FROM STAFF WHERE STAFF_ID = ?";

        this.db = await open({name: "stats.db",createFromLocation: "~soccerstats.db"});
        let result = await query(this.db, sql, [id]);

        // this probably won't happen since we are getting the id from the nav props
        if (result.length > 0) {
            console.log("Result: " + result.result[0]);
            this.setState({member: result.result[0]});
        }
    }

    componentWillUnmount() {

        // update the record

        this.db.close();
    }

    render() {
        return (
            <View>
                <Text>Name:</Text>
                <TextInput value={this.state.member.STAFF_NAME} />
                <Text>Email:</Text>
                <TextInput value={this.state.member.STAFF_EMAIL} />
            </View>
        );

    }
}

export default withNavigation(EditStaffMemberScreen);