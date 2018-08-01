// /apps/screens/EditDivision/index.js
import React, {Component} from "react";
import {View, Text, TextInput, Alert, TouchableOpacity} from "react-native";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";

import PortableButton from "./../../components/PortableButton";

import {getDivision, setCurrentDivisionId} from "./../../redux/actions/divisionActions";

import masterStyles, {dataEntryPage, bigButtonStyles} from "./../../styles/master";

class EditDivisionScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            DIVISION_NAME: ""
        };
    }

    componentDidMount() {

        let divisionId = this.props.navigation.getParam("divisionId");
        this.props.setCurrentDivisionId(divisionId);
        this.props.getDivision(divisionId);

    }

    _btnUpdate = () => {

            let division = {
                DIVISION_ID: this.props.divisionId,
                DIVISION_NAME: this.state.DIVISION_NAME
            }

            this.props.editDivision(division);
            this.props.navigation.navigate("DivisionManagementScreen", {programId: 1});
        //}
        

    }

    render() {
        return (
            <View style={masterStyles.component}>
                <View style={dataEntryPage.inputSection}>
                    <Text>Division Name</Text>
                    <TextInput value={this.props.division.DIVISION_NAME} 
                        onChangeText={(text) => this.setState({DIVISION_NAME: text})}/>
                </View>
                <View style={dataEntryPage.bottomButtonArea}>
                    <PortableButton defaultLabel="Update Division"
                        disabled={false}
                        onPress={() => {this_btnUpdate()}}
                        onLongPress={()=>{}}
                        style={bigButtonStyles} />
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        division: state.division
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDivision: (divisionId) => {dispatch(getDivision(divisionId))},
        editDivision: (division) => {dispatch(editDivision(division))},
        setCurrentDivisionId: (divisionId) => {dispatch(setCurrentDivisionId(divisionId))}
    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(EditDivisionScreen));