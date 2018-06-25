import React, {Component} from "react";
import {View, Text, TextInput} from "react-native";
import {withNavigation} from "react-navigation";

import {open, query, close} from "./../../util/DbUtils";

class EditStaffMemberScreen extends Component {

    constructor(props) {
        super(props);

        this.db = SQLite.openDatabase({name: "stats.db",createFromLocation: "~soccerstats.db"});

        this.state = {member: null};
    }

    async componentDidMount() {

        // get the id to load from the nav props
        let id = this.props.navigation.props.id;
        // load the record
        const sql = "SELECT * FROM STAFF WHERE STAFF_ID = ?";

        this.db = await open({name: "stats.db",createFromLocation: "~soccerstats.db"});
        let result = await query(this.db, sql, [id]);

        this.setState({member: result.result});
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