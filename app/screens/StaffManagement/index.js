import React,{Component} from "react";
import {View, Text, FlatList, TouchableOpacity} from "react-native";
import SQLite from "react-native-sqlite-storage";
import {withNavigation} from "react-navigation";


import StaffManagementRow from "./StaffManagementRow";

import {open, query, close} from "./../../util/DbUtils";

import PortableButton from "./../../components/PortableButton";
import masterStyles, {listPage, bigButtonStyles} from "./../../styles/master";


SQLite.enablePromise(true);

class StaffManagementScreen extends Component {

    db = null;

    constructor(props) {
        super(props);

        this.state = {staff:[]};
       
    }

    _btnAddStaff = () => {
        this.props.navigation.navigate("AddStaffMemberScreen");
    }

    async componentDidMount() {

        const sql = "SELECT * FROM STAFF";

        this.db = await open({name: "stats.db",createFromLocation: "~soccerstats.db"});
        let result = await query(this.db, sql, []);
        console.log("Result: " + JSON.stringify(result.result));

        this.setState({staff: result.result});
    }

    componentWillUnmount() {

        close(this.db);
        
    }

    render() {
        return (
            <View style={masterStyles.component}>
                <View style={listPage.listArea}>
                    <FlatList data={this.state.staff}
                        renderItem={({item}) => <StaffManagementRow staffMember={item} />} 
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