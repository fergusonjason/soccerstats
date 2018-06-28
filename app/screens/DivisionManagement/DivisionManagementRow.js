import React, {Component} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {withNavigation} from "react-navigation";
import PropTypes from "prop-types";
import dataEntryStyles from "./../../styles/DataEntryPageStyles";


class DivisionManagementRow extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={dataEntryStyles.component}>
                <Text>{this.props.divisionName}</Text>
                <View style={dataEntryStyles.buttonSection}>
                <TouchableOpacity style={dataEntryStyles.button}
                    onPress={() => {this.props.onAddTeam()}}>
                    <Text style={dataEntryStyles.buttonText}>Teams</Text>
                </TouchableOpacity>
                <TouchableOpacity style={dataEntryStyles.button}
                    onPress={() => {this.props.onEdit()}}>
                    <Text style={dataEntryStyles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={dataEntryStyles.button}
                    onPress={() => {this.props.onDelete()}} >
                    <Text style={dataEntryStyles.buttonText}>Delete</Text>
                </TouchableOpacity>
                </View>
            </View>
        );
    }
}

DivisionManagementRow.propTypes = {
    divisionId: PropTypes.number.isRequired,
    divisionName: PropTypes.string.isRequired,
    onAddTeam: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}


// TODO: is withNavigation still needed?
export default withNavigation(DivisionManagementRow);