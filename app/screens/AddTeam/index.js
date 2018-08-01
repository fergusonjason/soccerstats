import React, {Component} from "react";
import {View, Text, TextInput, Picker} from "react-native";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";

import {addTeam, setCurrentTeamId} from "./../../redux/actions/teamActions";
import {getAllCoaches} from "./../../redux/actions/utilityActions";

import PortableButton from "./../../components/PortableButton";

import masterStyles, {dataEntryPage, bigButtonStyles} from "./../../styles/master";

class AddTeam extends Component {

    constructor(props) {
        super(props);

        this.state = {
            //TEAM_NAME: "",
            //TEAM_DIVISION_ID: -1,
            TEAM_COACH_ID: -1,
            TEAM_GENDER: "M"
            //coachList: []
        }
    }


    _btnAdd = () => {

        let divisionId = this.props.navigation.getParam("divisionId");
        let teamObj = {
            TEAM_NAME: this.state.TEAM_NAME,
            TEAM_DIVISION_ID: this.props.currentDivisionId,
            TEAM_COACH_ID: this.state.TEAM_COACH_ID,
            TEAM_GENDER: this.state.TEAM_GENDER
        };

        console.log(`teamObj: ${JSON.stringify(teamObj)}`);
        this.props.addTeam(teamObj);
        this.props.navigation.navigate("TeamManagementScreen",{divisionId: this.props.currentDivisionId});
    }

    componentDidMount() {
        this.props.getAllCoaches();
        console.log(`props: ${JSON.stringify(this.props)}`);
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
                        selectedValue={this.state.TEAM_COACH_ID}
                        onValueChange={(itemValue, itemIndex) => this.setState({"TEAM_COACH_ID": itemValue})}>
                        <Picker.item label="" value={-1} />
                        {this.props.coaches.map((item) => 
                            <Picker.Item label={item.STAFF_LAST_NAME} value={item.STAFF_ID} />
                        )}
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
        coaches: state.coaches,
        currentDivisionId: state.currentDivisionId,
        currentTeamId: state.currentTeamId
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addTeam: (teamObj) => dispatch(addTeam(teamObj)),
        getAllCoaches: () => dispatch(getAllCoaches()),
        setCurrentTeamId: (teamId) => dispatch(setCurrentTeamId(teamId))
    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(AddTeam));