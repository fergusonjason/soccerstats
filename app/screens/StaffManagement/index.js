import React,{Component} from "react";
import {View, Text, FlatList, TouchableOpacity} from "react-native";
import SQLite from "react-native-sqlite-storage";

import StaffEntry from "./../../components/StaffEntry";

import {open, query, close} from "./../../util/DbUtils";

import styles from "./styles";

SQLite.enablePromise(true);

class StaffManagementScreen extends Component {

    db = null;

    constructor(props) {
        super(props);

        this.db = SQLite.openDatabase({name: "stats.db",createFromLocation: "~soccerstats.db"});

        this.state = {staff:[]};
       
    }

    async componentDidMount() {

        const sql = "SELECT * FROM STAFF";

        // Promise<SQLiteDatabase>
        this.db = await open({name: "stats.db",createFromLocation: "~soccerstats.db"});
        let result = await query(this.db, sql, []);
        console.log("Result: " + JSON.stringify(result.result));

        this.setState({staff: result.result});
    }

    componentWillUnmount() {

        this.db.close();
        
    }

    render() {
        return (
            <View style={styles.component}>
                <View style={styles.listArea}>
                    <FlatList data={this.state.staff}
                        renderItem={({item}) => <StaffEntry item={item} />} 
                        keyExtractor={(item) => item.STAFF_ID }/>
                </View>
                <View style={styles.bottomButtonArea}>
                    <TouchableOpacity style={styles.bottomButton}>
                        <Text style={styles.bottomButtonText}>Add Staff Member</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default StaffManagementScreen;