import React, {Component} from "react";
import {View, Text, Alert, TouchableOpacity, StyleSheet} from "react-native";
import {withNavigation} from "react-navigation";
import PropTypes from "prop-types";

import {open,query, execute, close} from "./../../util/DbUtils";


class DivisionManagementRow extends Component {

    constructor(props) {
        super(props);

        this.state = {division: props.division};

    }

    _btnTeams = () => {

        // navigate to Team Management
    }

    _btnEditDivision = () => {
        this.props.navigation.navigate("EditDivisionScreen", {divisionId: this.state.division.DIVISION_ID});
    }

    _btnDeleteDivision = () => {
        Alert.alert(
            "Are you sure?",
            "This will delete all teams that are assigned to this division. Are you sure you want to do this?",
            [
                {text: "Cancel"},
                {text: "Ok", onPress: () => this._deleteDivision()}
            ]
        );
    }

    _deleteDivision = async () => {

        console.log("Entered _deleteDivision, divisionId: " + this.state.division.DIVISION_ID);
        const sql = "DELETE FROM DIVISION WHERE DIVISION_ID = ?";

        let db = await open({name: "stats.db",createFromLocation: "~soccerstats.db"});
        let result = await execute(db, sql, [this.state.division.DIVISION_ID]);

        console.log("Rows affected: " + result.rowsAffected);

        this.props.navigation.navigate("DivisionManagementScreen");
    }

    render() {
        console.log("Props: " + JSON.stringify(this.props));
        return (
            <View style={styles.component}>
                <Text>{this.state.division.item.DIVISION_NAME}</Text>
                <View style={styles.buttonSection}>
                <TouchableOpacity style={styles.button}
                    onPress={this._btnAddTeam}>
                    <Text style={styles.buttonText}>Teams</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                    onPress={this._btnEditDivision}>
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                    onPress={this._btnDeleteDivision}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
                </View>
            </View>
        );
    }
}

DivisionManagementRow.propTypes = {
    division: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
    component: {
        flexDirection: "row"
    },
    textSection: {
        flexDirection: "row",
        alignItems: "flex-start"
    },
    buttonSection: {
        flexDirection: "row",
        alignItems: "flex-end"
    },
    button: {
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: '#202646',
        width: 100,
        height: 25,
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        marginHorizontal: 10
    },
    buttonText: {
        color: "#ffffff",
        alignSelf: "center"
    }
});

export default withNavigation(DivisionManagementRow);