import React, { Component } from 'react';
import {Provider} from "react-redux";

import Navigator from "./app/util/Navigator";

import store from "./app/redux/store";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}