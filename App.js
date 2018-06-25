/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Navigator from "./app/util/Navigator";



export default class App extends Component {
  render() {
    return (
      <Navigator />
    );
  }
}