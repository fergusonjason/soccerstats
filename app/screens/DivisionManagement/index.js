import React, {Component} from "react";
import {View, FlatList, TouchableOpacity, Text, StyleSheet, Alert} from "react-native";
import {withNavigation} from "react-navigation";

import {open,query,close} from "./../../util/DbUtils";

import PortableButton from "./../../components/PortableButton";

import masterStyles, {listPage, bigButtonStyles} from "./../../styles/master";

import DivisionManagementRow from "./DivisionManagementRow";

class DivisionManagmementScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            programId: this.props.navigation.getParam("programId", 1),
            divisions: [],
            toggle: true
        };

        
    }

    async componentDidMount() {

        console.log("Entered componentDidMount()");

        this.db = await open({name: "stats.db",createFromLocation: "~soccerstats.db"});
        let result = await this._queryDivisions(); // initially populate the divisions
        this.setState({divisions: result.result});
        console.log("State after componentDidMount(): " + JSON.stringify(this.state));
    }

    async componentWillUnmount() {

        console.log("Entered componentWillUnount()");

        await close(this.db);
    }

    _queryDivisions = async () => {

        const sql = "SELECT * FROM DIVISION where DIVISION_PROGRAM_ID = ? ORDER BY DIVISION_NAME";

        let result = await query(this.db, sql, [this.state.programId]); 

        return result;

    }

    _addTeam = async (divisionId) => {

        console.log("Entered _addTeam()");
        
        this.props.navigation.navigate("TeamManagementScreen",{divisionId: divisionId});

    }

    _addDivision = () => {

        console.log("Entered _addDivision");

        this.props.navigation.navigate("AddDivisionScreen", {refresh: () => this._requery()});
    }

    _editDivision = async (divisionId) => {

        console.log("Entered _editDivision");

        this.props.navigation.navigate("EditDivisionScreen", {divisionId: divisionId, refresh: () => this._requery()});

    }



    _deleteDivision = async (divisionId) => {

        console.log("Entered _deleteDivision, divisionId: " + divisionId);

        const sql = "DELETE FROM DIVISION WHERE DIVISION_ID = ?";

        let result = await execute(this.db, sql, [divisionId]);

        console.log("Rows affected: " + result.rowsAffected);

        console.log("Exited _deleteDivision");

    }

    _btnDeleteDivision = async (divisionId) => {

        console.log("Entered _btnDeleteDivision, divisionId: " + divisionId);
        await this._deleteDivision(divisionId);
        let result = await this._queryDivisions();
        this.setState({divisions: result.result});

        console.log("Exited _btnDeleteDivision");
    }

    _renderItem = ({item}) => (
        <DivisionManagementRow divisionId={item.DIVISION_ID} divisionName={item.DIVISION_NAME}
            onAddTeam={() => {this._addTeam(item.DIVISION_ID)}}
            onEdit={() => {this._editDivision(item.DIVISION_ID)}}
            onDelete={() => {this._btnDeleteDivision(item.DIVISION_ID)}}/>        
     
    );

    _requery = async () => {

        let result = await this._queryDivisions();
        this.setState({divisions: result.result});
    }

    render() {
        return (
            <View style={masterStyles.component}>
                <View style={listPage.listArea}>
                    <FlatList 
                        data={this.state.divisions}
                        renderItem={this._renderItem}
                        keyExtractor={(item) => item.DIVISION_ID.toString() }
                        extraData={this.state.toggle}/>
                </View>
                <View style={listPage.bottomButtonArea}>
                    <PortableButton defaultLabel="Add Division"
                        onPress={() => {this._addDivision()}}
                        onLongPress={() => {}}
                        style={bigButtonStyles} />
                </View>
            </View>
        );
    }
}

export default withNavigation(DivisionManagmementScreen);