import React,{Component} from "react";
import {View, Alert, FlatList} from "react-native";
import {withNavigation} from "react-navigation";

import StaffManagementRow from "./StaffManagementRow";

import {open, query, close} from "./../../util/DbUtils";

import PortableButton from "./../../components/PortableButton";
import masterStyles, {listPage, bigButtonStyles} from "./../../styles/master";

class StaffManagementScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {staff:[]};
       
    }

    _btnEdit = (item) => {
        this.props.navigation.navigate("EditStaffMemberScreen", {id: item.STAFF_ID, refresh: this._query()});
    }

    _delete = async (item) => {
        const sql = "DELETE FROM STAFF WHERE STAFF_ID = ?";

        await execute(this.db, sql, [item.STAFF_ID]);
        this._query();
    }

    _btnDelete = async (item) => {


        console.log("Entered _delete");

        Alert.alert("Are you sure?",
            "You will not be able to undo this operation. Are you sure?",
            [
                {text: "Ok", onPress: () => {
                    this._delete(item);
                }},
                {text: "Cancel"}
            ]);

    }

    _btnAddStaff = () => {
        this.props.navigation.navigate("AddStaffMemberScreen", {refresh: () => {this._query()}});
    }

    _query = async () => {

        console.log("Entered _query()");
        
        const sql = "SELECT * FROM STAFF";
        let result = await query(this.db, sql, []);

        this.setState({staff: result.result});
    }

    _renderItem = ({item}) => {
        return (
            <StaffManagementRow staffMember={item}
                onEdit = {()=>{this._btnEdit(item)}} 
                onDelete = {()=>{this._btnDelete(item)}} />
        );

    }

    async componentDidMount() {

        this.db = await open({name: "stats.db",createFromLocation: "~soccerstats.db"});
        this._query();

    }

    componentWillUnmount() {

        close(this.db);
        
    }

    render() {
        return (
            <View style={masterStyles.component}>
                <View style={listPage.listArea}>
                    <FlatList data={this.state.staff}
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

export default withNavigation(StaffManagementScreen);