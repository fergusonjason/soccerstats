import React, {Component} from "react";
import {View, FlatList, Alert} from "react-native";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";

import PortableButton from "./../../components/PortableButton";

import masterStyles, {listPage, bigButtonStyles} from "./../../styles/master";

import DivisionManagementRow from "./DivisionManagementRow";
import { getAllDivisions, deleteDivision, setCurrentDivisionId } from "../../redux/actions/divisionActions";

class DivisionManagmementScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        console.log("Entered componentDidMount()");
        this.props.setCurrentDivisionId(-1);
        this.props.getDivisions(1);

        
    }

    _addTeam = (divisionId) => {

        console.log("Entered _addTeam()");
        
        this.props.navigation.navigate("TeamManagementScreen",{divisionId: divisionId});

    }

    _addDivision = () => {

        this.props.navigation.navigate("AddDivisionScreen");
    }

    _editDivision = (divisionId) => {

        this.props.navigation.navigate("EditDivisionScreen", {divisionId: divisionId});

    }


    _btnDeleteDivision = (divisionId) => {

        console.log(`Props: ${JSON.stringify(this.props)}`);
        Alert.alert("Are you sure?",
            "You will not be able to undo this. Are you sure?",
            [
                {text: "Ok", onPress: ()=>{this.props.deleteDivision(divisionId)}},
                {text: "Cancel"}
            ]);
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
        divisions: state.divisions,
        currentDivisionId: state.currentDivisionId
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDivisions: (programId) => dispatch(getAllDivisions(programId)),
        deleteDivision: (divisionId) => dispatch(deleteDivision(divisionId)),
        setCurrentDivisionId: (divisionId) => dispatch(setCurrentDivisionId(divisionId))
    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(DivisionManagmementScreen));