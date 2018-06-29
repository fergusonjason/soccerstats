import React, {Component} from "react";
import {View, Text} from "react-native";

import {open, close, query, execute} from "./../../util/DbUtils";

class TeamManagementScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            divisionId: this.props.navigation.getParam("divisionId"),
            teams: []
        }
    }

    async componentDidMount() {

        this.db = await open({name: "stats.db",createFromLocation: "~soccerstats.db"});
    }

    async componentWillUnmount() {

        await close(this.db);
    }

    _query = async () => {

        const sql = "SELECT * FROM TEAM WHERE DIVISION_ID = ?";
        let result = await query(this.db, sql, [this.state.divisionId]);

        this.setState({teams: result.result});
    }

    _btnDeleteTeam = async (teamId) => {

        await _deleteTeam(teamId);
        await _query();
    }

    _deleteTeam = async (teamId) => {

        const sql = "DELETE FROM TEAM WHERE TEAM_ID = ?";
        let result = await execute(this.db, sql, [teamId]);
    }

    render() {
        return (
            <View>
                <Text>Not Implemented Yet</Text>
            </View>
        );
    }
}

export default TeamManagementScreen;