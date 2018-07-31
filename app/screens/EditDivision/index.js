// /apps/screens/EditDivision/index.js
import React, {Component} from "react";
import {View, Text, TextInput, Alert, TouchableOpacity} from "react-native";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";

import PortableButton from "./../../components/PortableButton";

import {getDivision} from "./../../redux/actions/divisionActions";

import masterStyles, {dataEntryPage, bigButtonStyles} from "./../../styles/master";

class EditDivisionScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            DIVISION_NAME: ""
        };
    }

    async componentDidMount() {

        let divisionId = this.props.navigation.getParam("divisionId");

        this.props.getDivision(divisionId);

    }

    _btnUpdate = () => {

            let division = {
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
        editDivision: (division) => {dispatch(editDivision(division))}
    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(EditDivisionScreen));