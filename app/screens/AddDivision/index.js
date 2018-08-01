import React, {Component} from "react";
import {View, Text, TextInput, Alert} from "react-native";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";

import PortableButton from "./../../components/PortableButton";

import {addDivision, setCurrentDivisionId} from "./../../redux/actions/divisionActions";

import masterStyles, {dataEntryPage, bigButtonStyles} from "./../../styles/master";

class AddDivisionScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {DIVISION_NAME: ""};
    }

    _btnAdd = async () => {

        console.log("Entered _btnAdd");

        let division = {
            DIVISION_NAME: this.state.DIVISION_NAME,
            DIVISION_PROGRAM_ID: 1};
        this.props.addDivision(division);

        this.props.navigation.navigate("DivisionManagementScreen",{programId: 1});
    }

    componentDidMount() {
        let currentDivisionId = this.props.navigation.getParam("divisionId"); 
        this.props.setCurrentDivisionId(currentDivisionId);
    }

    render() {
        return (
            <View style={masterStyles.component}>
                <View style={dataEntryPage.inputArea} >
                    <Text>Division Name: </Text>
                    <TextInput onChangeText={(text) => this.setState({"DIVISION_NAME": text})} />
                </View>
                <View style={dataEntryPage.bottomButtonArea}>
                    <PortableButton defaultLabel="Add Division"
                        disabled={false}
                        onPress={() => this._btnAdd()}
                        onLongPress={()=>{}}
                        style={bigButtonStyles} />
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentDivisionId: state.currentDivisionId
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addDivision: (division) => dispatch(addDivision(division)),
        setCurrentDivisionId: (divisionId) => dispatch(setCurrentDivisionId(divisionId))
    }
}
export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(AddDivisionScreen));