import React,{Component} from "react";
import {View, Text, FlatList, TouchableOpacity} from "react-native";
import SQLite from "react-native-sqlite-storage";
import {withNavigation} from "react-navigation";

//import StaffEntry from "./../../components/StaffEntry";
import StaffManagementRow from "./StaffManagementRow";

import {open, query, close} from "./../../util/DbUtils";

import styles from "./styles";

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
            <View style={styles.component}>
                <View style={styles.listArea}>
                    <FlatList data={this.state.staff}
                        renderItem={({item}) => <StaffManagementRow staffMember={item} />} 
                        keyExtractor={(item) => item.STAFF_ID.toString() }/>
                </View>
                <View style={styles.bottomButtonArea}>
                    <TouchableOpacity style={styles.bottomButton}
                        onPress={this._btnAddStaff}>
                        <Text style={styles.bottomButtonText}>Add Staff Member</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default withNavigation(StaffManagementScreen);