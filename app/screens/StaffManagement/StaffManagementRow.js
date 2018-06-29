import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Alert} from "react-native";
import {withNavigation} from "react-navigation";
import PropTypes from "prop-types";

import {open, execute} from "./../../util/DbUtils";

class StaffManagementRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: props.item
        };
    }

    _btnEdit = () => {

        this.props.navigation.navigate("EditStaffMemberScreen", {id: this.state.item.STAFF_ID});
    }

    _btnDelete = () => {
        Alert.alert("Confirm",
            "Are you sure? You will not be able to undo this",
            [
                {text: "Cancel"},
                {text: "Ok", onPress: () => {this._delete}}
            ]);

    }

    _delete = async () => {

        console.log("Entered _delete");

        const sql = "DELETE FROM STAFF WHERE STAFF_ID = ?";

        let result = await execute(this.db, sql, [this.state.item.STAFF_ID]);

        if (result.rowsAffected == 0) {
            Alert.alert("Database Error",
                "No deletions made",
                [{text: "Ok"}]);
        }
    }

    async componentDidMount() {

        this.db = await open({name: "stats.db",createFromLocation: "~soccerstats.db"});
    }

    componentWillUnmount() {

        this.db.close();
    }

    render() {
        return (
            <View style={styles.component}>
                <Text style={styles.text}>{this.state.staffMember.STAFF_NAME}</Text>
                    <TouchableOpacity style={styles.button}
                        onPress={this._btnEdit}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={this._btnDelete}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>                    

            </View>
        );
    }
}

StaffManagementRow.propTypes = {
    staffMember: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
    component: {
        flex: 1,
        flexDirection: "row",
        padding: 10,
        height: 50
        
    },
    text: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        fontWeight: "bold",
        height: 50,
        width: 100},
    button: {
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: '#202646',
        width: 75,
        height: 25,
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        marginHorizontal: 10
    },
    buttonText: {
        fontSize:14,
        color: '#ffffff',
        alignSelf: "center"
       
    }
});

export default withNavigation(StaffManagementRow);