import React, {Component} from "react";
import {View, Text, TextInput, Picker} from "react-native";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";

import {open, execute, close, query} from "./../../util/DbUtils";

import {addTeam} from "./../../redux/actions/teamActions";
import PortableButton from "./../../components/PortableButton";

import masterStyles, {dataEntryPage, bigButtonStyles} from "./../../styles/master";

class AddTeam extends Component {

    constructor(props) {
        super(props);

        this.state = {TEAM_NAME: "",
            TEAM_DIVISION_ID: -1,
            TEAM_COACH_ID: -1,
            TEAM_GENDER: "M",
            coachList: []
        }
    }


    _btnAdd = async () => {

        let divisionId = this.props.navigation.getParam("divisionId");
        let teamObj = {
            TEAM_NAME: this.state.TEAM_NAME,
            TEAM_DIVISION_ID: this.state.TEAM_DIVISION_ID,
            TEAM_COACH_ID: this.state.TEAM_COACH_ID,
            TEAM_GENDER: this.state.TEAM_GENDER
        };

        this.props.addTeam(teamObj);
        this.props.navigation.navigate("TeamManagementScreen",{divisionId: divisionId});
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

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        addTeam: (teamObj) => dispatch(addTeam(teamObj))
    }
}
export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(AddTeam));