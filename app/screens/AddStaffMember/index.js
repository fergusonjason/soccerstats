import React, {Component} from "react";
import {View, Text, TextInput, Alert, Switch} from "react-native";
import {withNavigation} from "react-navigation";

import {open, close, execute} from "./../../util/DbUtils";

import PortableButton from "./../../components/PortableButton";
import masterStyles, {dataEntryPage, bigButtonStyles} from "./../../styles/master";

class AddStaffMemberScreen extends Component {

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
            STAFF_ID: -1,
            STAFF_IS_COMMISIONER: -1,
            STAFF_IS_COACH: -1
        }
    }

    _btnUpdate = async () => {

        // run an insert (What will happen with a constraint violation? DB err 7?)
        const sql = "INSERT INTO STAFF(STAFF_LAST_NAME, STAFF_FIRST_NAME, STAFF_EMAIL, STAFF_CELL) VALUES (?,?,?,?)";
        let result = await execute(this.db, sql,[this.state.STAFF_LAST_NAME, this.state.STAFF_FIRST_NAME, 
            this.state.STAFF_EMAIL, this.state.STAFF_CELL]);

        console.log("Records updated: " + result.rowsAffected);

        if (result.rowsAffected > 0) {
            this.props.navigation.state.params.refresh();
            // navigate back to Staff Management
            this.props.navigation.navigate("StaffManagementScreen");
        } else {
            // show an alert saying something went wrong
            Alert.alert(
                "Database error",
                "Unable to insert record in database",
                [
                    {text: "Ok"}
                ]
            )
        }

    }

    async componentDidMount() {

        // db has to be opened here instead of the constructor due to the await keyword
        this.db = await open({name: "stats.db",createFromLocation: "~soccerstats.db"});

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
                         onChangeText={(text) => { this.setState({STAFF_LAST_NAME: text}) }}
                         value={this.state.STAFF_LAST_NAME} />                    
                    <Text>First Name:</Text>
                    <TextInput 
                         onChangeText={(text) => { this.setState({STAFF_FIRST_NAME: text}) }}
                         value={this.state.STAFF_FIRST_NAME} />                    
                    <Text>Email:</Text>
                    <TextInput 
                         onChangeText={(text) => { this.setState({STAFF_EMAIL: text}) }}
                         value={this.state.STAFF_EMAIL} />
                    <Text>Cell:</Text>
                    <TextInput 
                         onChangeText={(text) => { this.setState({STAFF_CELL: text}) }}
                         value={this.state.STAFF_CELL} />       
                    <Text>Coach</Text>
                    <Switch disabled={false}
                        value = {true}
                        onValueChange = {(value) => {value === true ? this.setState({STAFF_IS_COMMISIONER: 1}) : this.setState({"STAFF_IS_COMMISIONER": 0})}} 
                    />
                </View>
                <View style={dataEntryPage.bottomButtonArea}>
                    <PortableButton defaultLabel="Add Staff Member"
                        onPress={()=>this._btnUpdate()}
                        onLongPress={()=>{}}
                        style={bigButtonStyles} />
                </View>
            </View>
        );

    }
}

export default withNavigation(AddStaffMemberScreen);