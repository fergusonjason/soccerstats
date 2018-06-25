import React,{Component} from "react";
import {View} from "react-native";

import MenuNavigationButton from "./../../../components/MenuNavigationButton";
import {open, query, close} from "./../../../util/DbUtils";

import styles from "./styles";

class DivisionManagement extends Component {

    db = open({name: "stats.db", createFromLocation: "soccerstats.db"});

    constructor(props) {
        super(props);
        this.state = {result: []};

    }

    async componentDidMount() {
        const sql = "SELECT * FROM DIVISION ORDER BY DIVISION_NAME";
        result = await query(this.db, sql, []);

        this.setState({result: result});
    }

    componentWillUnmount() {
        close(db);
    }

    render() {
        return (
            <View>
                <MenuNavigationButton label="New Division" />
                {
                    this.state.result.map(division => 
                        <MenuNavigationButton label={division.DIVISION_NAME} />
                    )
                }
            </View>
        );
    }
}

export default DivisionManagement;