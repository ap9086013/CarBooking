import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import BaseUrl from './baseurl/BaseURL';
const { width, height } = Dimensions.get("screen")

export default class SetNewPassword extends Component {
  constructor(props) {
    super(props);
      this.state = {
          newPassword: '',
          confirmPassword: '',
          mobileNumber: this.props.route.params.mobileNo
    };
    }
    submit = () => {
        fetch(BaseUrl+"api/Authentication/Updateforgotpassword?MobileNo=" +
            this.state.mobileNumber + "&Password=" + this.state.newPassword, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("--json-->", json)
                if (json.successcode === 1) {
                    this.props.navigation.navigate("Login")
                }
            })
            .catch((error) =>
                console.log("forgotpassword error-->", error))
        this.props.navigation.navigate("Login")
    }

  render() {
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require("../assest/background.jpg")}
                style={styles.backImage}>
                <Text> SetNewPassword </Text>
                <View style={styles.loginView}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: '5%' }}>
                       Set New Password
                    </Text>
                    <View style={{ borderWidth: 0.5, width: "100%", marginTop: '2%' }} />
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="New Password*"
                        placeholderTextColor="#000000"
                        autoCapitalize="none"
                        value={this.state.newPassword}
                        label="New Password"
                        maxLength={10}
                        returnKeyType="next"
                        mode='outlined'
                        onSubmitEditing={() => { this.passwordTextInput.focus(); }}
                        blurOnSubmit={false}
                        onChangeText={(text) => {
                            this.setState({ newPassword: text });
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Confirm Password*"
                        placeholderTextColor="#000000"
                        autoCapitalize="none"
                        value={this.state.confirmPassword}
                        label="Confirm Password"
                        maxLength={10}
                        returnKeyType="next"
                        mode='outlined'
                        ref={(input) => { this.passwordTextInput = input; }}
                        onSubmitEditing={() => { this.submit();}}
                        blurOnSubmit={false}
                        onChangeText={(text) => {
                            this.setState({ confirmPassword: text });
                        }}
                    />
                    <TouchableOpacity
                        style={styles.sigInButton}
                        onPress={() => {
                            this.submit();
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                color: '#fff',
                                fontSize: 18,
                                fontWeight: 'bold',
                            }}>
                            Submit
                </Text>
                    </TouchableOpacity>
                    </View>

                </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    backImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center'
    },
    loginView: {
        backgroundColor: '#fff',
        shadowColor: "#fff",
        // width: width / 1.05,
        width: width / 1.2,
        height: height / 2.3,
        marginTop: height / 5,
        shadowOpacity: 10,
        shadowRadius: 16.00,
        borderRadius: 15,
        alignItems: 'center',
        elevation: 24,
        shadowOffset: {
            width: 0,
            height: 12,
        },
    },
    input: {
        height: height / 18,
        borderRadius: 20,
        width: '90%',
        marginTop: '6%',
    },
    sigInButton: {
        backgroundColor: '#0d319f',
        width: '90%',
        height: height / 18,
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: height / 25,
    },
})