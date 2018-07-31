// /app/screens/StaffManagementScreen/index.js

import React,{Component} from "react";
import {View, Alert, FlatList} from "react-native";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";

import StaffManagementRow from "./StaffManagementRow";

import {open, query, close} from "./../../util/DbUtils";

import PortableButton from "./../../components/PortableButton";
import masterStyles, {listPage, bigButtonStyles} from "./../../styles/master";
import { getAllStaffMembers, deleteStaffMember } from "../../redux/actions/staffActions";

class StaffManagementScreen extends Component {

    constructor(props) {
        super(props);
    }

    _btnEdit = (item) => {
        this.props.navigation.navigate("EditStaffMemberScreen", {id: item.STAFF_ID});
    }


    _btnDelete = (item) => {

        Alert.alert("Are you sure?",
            "You will not be able to undo this operation. Are you sure?",
            [
                {text: "Ok", onPress: () => {
                    this.props.deleteStaffMember(item.STAFF_ID);
                }},
                {text: "Cancel"}
            ]);

    }

    _btnAddStaff = () => {
        this.props.navigation.navigate("AddStaffMemberScreen");
    }

    _renderItem = ({item}) => {
        return (
            <StaffManagementRow staffMember={item}
                onEdit = {()=>{this._btnEdit(item)}} 
                onDelete = {()=>{this._btnDelete(item)}} />
        );

    }

    componentDidMount() {

        this.props.getAllStaff();

    }

    componentWillUnmount() {

        // close(this.db);
        
    }

    render() {
        return (
            <View style={masterStyles.component}>
                <View style={listPage.listArea}>
                    <FlatList data={this.props.staffMembers}
                        renderItem={this._renderItem} 
                        keyExtractor={(item) => item.STAFF_ID.toString() }/>
                </View>
                <View style={listPage.bottomButtonArea}>
                    <PortableButton defaultLabel="Add Staff Member"
                        onPress={()=>{this._btnAddStaff()}}
                        onLongPress={()=>{}}
                        style={bigButtonStyles}
                        disabled={false} />
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {

    return {
        staffMembers: state.staffMembers
    }
}

function mapDispatchToProps(dispatch) {

    return {
        getAllStaff: () => {dispatch(getAllStaffMembers())},
        deleteStaffMember: (memberId) => {dispatch(deleteStaffMember(memberId))}
    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(StaffManagementScreen));