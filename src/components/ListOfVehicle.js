import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class ListOfVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
      return (
          <LinearGradient colors={['#f99050', '#f94c5d']} style={styles.linearMainView}>
      <View>
        <Text> ListOfVehicle </Text>
              </View>
              </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
    linearMainView: {
        flex: 1,
        alignItems: 'center'
    },
})