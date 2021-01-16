import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
export default class SplaceScreen extends Component {
  constructor(props) {
    super(props);
      this.state = {
          splaceScreenDisabledTime: 3
    };
  }
    componentDidMount = () => {
        const resendOtpTimerInterval = setInterval(() => {
            if (this.state.splaceScreenDisabledTime <= 0) {
                clearInterval(resendOtpTimerInterval)
                this.closeSplace();
            } else {
                this.setState({ splaceScreenDisabledTime: this.state.splaceScreenDisabledTime - 1 })

            }
        }, 1000);

    }
    closeSplace = async () => {
        let keys = []
        try {
            keys = await AsyncStorage.getAllKeys()
        } catch (e) {
            console.log("---clseSplace =error==>", e)
        }
        if (keys.length === 0) {
            this.props.navigation.navigate("Login")
        } else {
            this.props.navigation.navigate("SideDrawer")
        }

        console.log(keys)

    }
  render() {
      return (
          <LinearGradient colors={['#f99050', '#f94c5d']} style={styles.linearGradient}>
              <ActivityIndicator size="large" color="#fff" />
          </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
       
    },
    buttonText: {
        fontSize: 18,
      //  fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});