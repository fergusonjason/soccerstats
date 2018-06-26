import React, {Component} from "react";
import {View, FlatList} from "react-native";
import {withNavigation} from "react-navigation";

import {open,query,close} from "./../../util/DbUtils";

import styles from "./styles";
import DivisionManagementRow from "./DivisionManagementRow";
import MenuNavigationButton from "./../../components/MenuNavigationButton";

class DivisionManagmementScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            divisions: []
        };
    }

    async componentDidMount() {

        let programId = this.props.navigation.getParam("programId", 1);

        this.db = await open({name: "stats.db",createFromLocation: "~soccerstats.db"});

        const sql = "SELECT * FROM DIVISION where DIVISION_PROGRAM_ID = ? ORDER BY DIVISION_NAME";

        let result = await query(this.db, sql, [programId]); 

        this.setState({divisions: result.result});
    }

    async componentWillUnmount() {
        await close(this.db);
    }

    render() {
        return (
            <View style={styles.component}>
                <View style={styles.listArea}>
                    <FlatList 
                        data={this.state.divisions}
                        renderItem={(division) => <DivisionManagementRow division={division} />}
                        keyExtractor={(item) => item.DIVISION_ID.toString() }/>
                </View>
                <View style={styles.bottomButtonArea}>
                    <View style={styles.bottomButtonSection}>
                        <MenuNavigationButton label="Add Division" target="AddDivisionScreen" />
                    </View>
                </View>
            </View>
        );
    }
}

export default withNavigation(DivisionManagmementScreen);