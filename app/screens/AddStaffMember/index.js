import React, {Component} from "react";
import {View, Text, TextInput, Alert, Switch} from "react-native";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";

import PortableButton from "./../../components/PortableButton";

import {addStaffMember} from "./../../redux/actions/staffActions";

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

        console.log("Entered _btnUpdate");

            let staffMember = {STAFF_LAST_NAME: this.state.STAFF_LAST_NAME,
                STAFF_FIRST_NAME: this.state.STAFF_FIRST_NAME,
                STAFF_EMAIL: this.state.STAFF_EMAIL,
                STAFF_CELL: this.state.STAFF_CELL};

            this.props.addStaffMember(staffMember);
            this.props.navigation.navigate("StaffManagementScreen");

    }

    _validate = (dbresult) => {

        if (!dbresult.hasErrors) {

            return true;

        } else {

            Alert.alert(
                "Database error",
                "Unable to insert record in database: " + dbresult.errorMessage,
                [
                    {text: "Ok"}
                ]
            );

            return false;
        }
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

function mapStateToProps(state) {

    return {

    }
}

function mapDispatchToProps(dispatch) {

    return {
        addStaffMember: (member) => dispatch(addStaffMember(member))
    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(AddStaffMemberScreen));