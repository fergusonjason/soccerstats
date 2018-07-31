import React, {Component} from "react";
import {View, FlatList, Alert} from "react-native";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";

import {open,query,close} from "./../../util/DbUtils";

import PortableButton from "./../../components/PortableButton";

import masterStyles, {listPage, bigButtonStyles} from "./../../styles/master";

import DivisionManagementRow from "./DivisionManagementRow";
import { getAllDivisions } from "../../redux/actions/divisionActions";

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

        this.props.getDivisions(1);
        // this.db = await open({name: "stats.db",createFromLocation: "~soccerstats.db"});
        // this._query();
    }

    async componentWillUnmount() {

        // console.log("Entered componentWillUnount()");

        // await close(this.db);
    }

    _query = async () => {

        // const sql = "SELECT * FROM DIVISION where DIVISION_PROGRAM_ID = ? ORDER BY DIVISION_NAME";

        // let result = await query(this.db, sql, [this.state.programId]);
        // this.setState({divisions: result.result});
    }

    _addTeam = async (divisionId) => {

        console.log("Entered _addTeam()");
        
        this.props.navigation.navigate("TeamManagementScreen",{divisionId: divisionId});

    }

    _addDivision = () => {

        // console.log("Entered _addDivision");

        // this.props.navigation.navigate("AddDivisionScreen", {refresh: () => this._query()});
    }

    _editDivision = async (divisionId) => {

        // console.log("Entered _editDivision");

        // this.props.navigation.navigate("EditDivisionScreen", {divisionId: divisionId, refresh: () => this._requery()});

    }



    _deleteDivision = async (divisionId) => {

        // console.log("Entered _deleteDivision, divisionId: " + divisionId);

        // const sql = "DELETE FROM DIVISION WHERE DIVISION_ID = ?";

        // await execute(this.db, sql, [divisionId]);

        // this._query();


    }

    _btnDeleteDivision = async (divisionId) => {

        // console.log("Entered _btnDeleteDivision, divisionId: " + divisionId);

        // Alert.alert("Are you sure?",
        //     "You will not be able to undo this. Are you sure?",
        //     [
        //         {text: "Ok", onPress: ()=>{this._deleteDivision(divisionId)}},
        //         {text: "Cancel"}
        //     ]);
    }

    _renderItem = ({item}) => (
        <DivisionManagementRow divisionId={item.DIVISION_ID} divisionName={item.DIVISION_NAME}
            onAddTeam={() => {this._addTeam(item.DIVISION_ID)}}
            onEdit={() => {this._editDivision(item.DIVISION_ID)}}
            onDelete={() => {this._btnDeleteDivision(item.DIVISION_ID)}}/>        
     
    );


    render() {
        return (
            <View style={masterStyles.component}>
                <View style={listPage.listArea}>
                    <FlatList 
                        data={this.props.divisions}
                        renderItem={this._renderItem}
                        keyExtractor={(item) => item.DIVISION_ID.toString() } />
                </View>        
                <View style={listPage.bottomButtonArea}>
                    <PortableButton defaultLabel="Add Division"
                        disabled={false}
                        onPress={() => {this._addDivision()}}
                        onLongPress={() => {}}
                        style={bigButtonStyles} />
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        divisions: state.divisions
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDivisions: (programId) => dispatch(getAllDivisions(programId))
    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(DivisionManagmementScreen));