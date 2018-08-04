// /app/components/NullSafePicker.js
import React, {Component} from "react";
import {Picker} from "react-native";

import _ from "lodash";

class NullSafePicker extends Component {

    // selectedValue
    // onValueChange
    // enabled
    // mode

    // inputValues
    // inputValueValue
    // inputValueLabel

    _nullInputValues = () => {

        return <Picker.Item value={-1} label="No Values To Display" />
    }

    _notNullInputValues = () => {

        return this.props.inputValues.map((item) => {
            let value = _.get(item, this.props.inputValueValue,-1);
            let label = _.get(item, this.props.inputValueLabel, "undefined");
            
            return <Picker.Item value={value} label={label} />
        });
    }

    render() {
        console.log(`Props: ${JSON.stringify(this.props)}`);
        return (
            <Picker mode={this.props.mode}
                selectedValue={this.props.selectedValue}
                onValueChange={this.props.onValueChange}
                enabled={this.props.enabled}>
                {_.isEmpty(this.props.inputValues) ? this._nullInputValues() : this._notNullInputValues()}
            </Picker>
        )
    }
}

export default NullSafePicker;