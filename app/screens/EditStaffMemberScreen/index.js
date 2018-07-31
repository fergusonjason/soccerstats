// /app/screens/EditStaffMemberScreen/index.js
import React, {Component} from "react";
import {View, Text, TextInput} from "react-native";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";


import { getStaffMemberById, editStaffMember } from "./../../redux/actions/staffActions";

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

    _btnUpdate = async () => {

        // run an update
        let id = this.props.navigation.getParam("id",-1);

        let staffMember = {
            STAFF_LAST_NAME: this.state.STAFF_LAST_NAME,
            STAFF_FIRST_NAME: this.state.STAFF_FIRST_NAME,
            STAFF_EMAIL: this.state.STAFF_EMAIL,
            STAFF_CELL: this.state.STAFF_CELL,
            STAFF_ID: id
        }

        this.props.editStaffMember(staffMember);
        this.props.navigation.navigate("StaffManagementScreen");

    }

    componentDidMount() {

        let id = this.props.navigation.getParam("id");
        this.props.getStaffMember(id);

    }

    render() {
        return (
            <View style={masterStyles.component}>
                <View style={dataEntryPage.inputArea}>
                    <Text>Last Name:</Text>
                    <TextInput 
                        onChangeText={(text)=>{ this.setState({STAFF_LAST_NAME: text}) }}
                        value={this.props.staffMember.STAFF_LAST_NAME} />
                    <Text>First Name:</Text>
                    <TextInput 
                        onChangeText={(text)=>{ this.setState({STAFF_FIRST_NAME: text}) }}
                        value={this.props.staffMember.STAFF_FIRST_NAME} />
                    <Text>Email:</Text>
                    <TextInput 
                         onChangeText={(text) => { this.setState({STAFF_EMAIL: text}) }}
                         value={this.props.staffMember.STAFF_EMAIL} />
                    <Text>Cell:</Text>
                    <TextInput 
                        onChangeText={(text)=>{ this.setState({STAFF_CELL: text}) }}
                        value={this.props.staffMember.STAFF_CELL} />                         
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

export function mapStateToProps(state) {

    return {
        staffMember: state.staffMember
    }
}

export function mapDispatchToProps(dispatch) {

    return {
        getStaffMember: (staffMemberId) => { dispatch(getStaffMemberById(staffMemberId))},
        editStaffMember: (staffMember) => { dispatch(editStaffMember(staffMember))}
    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(EditStaffMemberScreen));