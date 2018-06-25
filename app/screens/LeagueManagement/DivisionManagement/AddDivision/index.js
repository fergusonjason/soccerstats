import React, {Component} from "react";
import {View, Text, TextInput} from "react-native";

import {open, query, execute, close} from "./../../../../util/DbUtils";

class AddDivision extends Component {

    db = open({name: "stats.db", createFromLocation: "soccerstats.db"});

    constructor(props) {
        super(props);
        this.state = {divisionName: "", commissionerName: ""}
    }

    _chkDivisionName = (text) => {

        this.setState({divisionName: text});
    }

    _chkCommissionerName = (text) => {

        this.setState({commissionerName: text});
    }

    async componentDidMount() {

        
    }

    async componentWillUnmount() {

        const sql = "INSERT INTO DIVISION() VALUES ()";

        result = await execute(this.db, sql, []);
        console.log("Rows updated: " + result);
    }

    render() {
        return (
            <View>
                <Text>Division Name</Text>
                <TextInput onBlur={this._chkDivisionName} />
                <Text>Division Commisioner Name</Text>
                <TextInput onBlur={this._chkCommissionerName}/>
            </View>
        );
    }
}