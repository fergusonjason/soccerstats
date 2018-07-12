import React, {Component} from "react";
import {View, Text, TextInput, Picker} from "react-native";
import {withNavigation} from "react-navigation";

import {open, execute, close, query} from "./../../util/DbUtils";

import PortableButton from "./../../components/PortableButton";

import masterStyles, {dataEntryPage, bigButtonStyles} from "./../../styles/master";

class AddTeam extends Component {

    constructor(props) {
        super(props);

        //this.state = {TEAM_NAME: ""}

        this.state = {TEAM_NAME: "",
            TEAM_DIVISION_ID: -1,
            TEAM_COACH_ID: -1,
            TEAM_GENDER: "M",
            coachList: []
        }
    }

    async componentDidMount() {
        this.db = await open({name: "stats.db",createFromLocation: "~soccerstats.db"});
    }

    async componentWillUnmount() {
        await close(this.db);
    }

    _query = async () => {

        const coachSql = "SELECT * FROM STAFF WHERE STAFF_IS_COACH = 1 ORDER BY STAFF_LAST_NAME";
        let result = await query(this.db, coachSql, []);

        this.setState({coachList: result.result});

    }

    _add = async () => {

        // TODO: Eventually we have to prevent too many kids being put on a team. Probably
        // need a db table to store the max number of players based on division

        let divisionId = this.props.navigation.getParam("divisionId");

        const sql = "INSERT INTO TEAM(TEAM_NAME, TEAM_DIVISION_ID, TEAM_COACH_ID, TEAM_GENDER) VALUES (?,?,?,?)";
        await execute(this.db, sql, [this.state.TEAM_NAME, divisionId, null, this.state.TEAM_GENDER]);

        this.props.navigation.state.params.refresh();
        this.props.navigation.navigate("TeamManagementScreen",{divisionId: divisionId});
    }

    _btnAdd = async () => {

        this._add();
    }

    render() {
        return (
            <View style={masterStyles.component}>
                <View style={dataEntryPage.inputArea} >
                    <Text>Team Name: </Text>
                    <TextInput onChangeText={(text) => this.setState({"TEAM_NAME": text})} />
                    <Text>Team Gender:</Text>
                    <Picker selectedValue={this.state.TEAM_GENDER}
                        mode="dropdown"
                        onValueChange={(itemValue, itemIndex) => this.setState({"TEAM_GENDER": itemValue})}>
                        <Picker.Item label="Boys/Coed" value="M" />
                        <Picker.Item label="Girls" value="F" />
                    </Picker>
                    <Text>Team Coach:</Text>
                    <Picker mode="dropdown"
                        onValueChange={(itemValue, itemIndex) => this.setState({"TEAM_COACH_ID": itemValue})}>
                        {this.state.coachList.map((item) => {
                            <Picker.Item label={item.COACH_LAST_NAME} value={item.COACH_ID} />
                        })}
                    </Picker>

                </View>
                <View style={dataEntryPage.bottomButtonArea}>
                    <PortableButton defaultLabel="Add Team"
                        onPress={() => this._btnAdd()}
                        onLongPress={()=>{}}
                        style={bigButtonStyles}
                        disabled={false} />
                </View>
            </View>            
        );
    }
}

export default withNavigation(AddTeam);