// /app/screens/Settings/index.js
import React, {Component} from "react";
import {View, Text, Picker, Alert} from "react-native";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";

import masterStyles, {dataEntryPage, bigButtonStyles} from "./../../styles/master";

class SettingsScreen extends Component {

    constructor(props) {
        super(props);
    }

    _btnSave = () => {
        Alert.alert("Not implemented",
            "This component has not been implemented",
            [{text: "Ok"}]);
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={masterStyles.component}>
                <View style={dataEntryPage.inputSection}>
                    <Text>Default Program</Text>
                    <Picker mode="dropdown" />
                </View>
                <View style={dataEntryPage.bottomButtonArea}>
                    <PortableButton defaultLabel="Save Settings"
                        onPress={()=> {this._btnSave()}}
                        onLongPress={()=>{}}
                        style={bigButtonStyles}
                        disabled={false} />
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(SettingsScreen));