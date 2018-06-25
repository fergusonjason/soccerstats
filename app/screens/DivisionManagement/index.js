import React, {Component} from "react";
import {View} from "react-native";

import MenuNavigationButton from "./../../components/MenuNavigationButton";

import {open, query} from "./../../util/DbUtils";

import styles from "./styles";

class DivisionManagementScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {divisions:[]};
    }

    async componentDidMount() {
        this.db = await open({name: "stats.db",createFromLocation: "~soccerstats.db"});

        const sql = "SELECT * FROM DIVISION ORDER BY DIVISION_NAME";
        let result = await query(this.db, sql,[]);

        this.setState({divisions: result.result});
    }

    async componentWillUnmount() {
        this.db.close();
    }

    render() {
        return (
            <View style={styles.component}>
                <View style={styles.divisionSection}>
                {
                    this.state.divisions.map((division) => <MenuNavigationButton label={division.DIVISION_NAME} target="TeamManagementScreen" targetId={division.DIVISION_ID.toString()}/>)
                }
                </View>
                <View style={styles.bottomButtonSection}>
                    <MenuNavigationButton label="Add Division" target="AddDivisionScreen" />
                </View>
            </View>
        );
    }
}

export default DivisionManagementScreen;