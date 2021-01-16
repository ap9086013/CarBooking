import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import BaseUrl from './baseurl/BaseURL';
const { width, height } = Dimensions.get("screen")


export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
      this.state = {
          otpFlag: 0,
          resendButtonDisabledTime: 30,
          mobileNo:'',
    };
    }

    startResendOtpTimer = () => {

        const resendOtpTimerInterval = setInterval(() => {
            if (this.state.resendButtonDisabledTime <= 0) {
                clearInterval(resendOtpTimerInterval)
                console.log("------", this.state.resendButtonDisabledTime)
                console.log("--Done-")
            } else {
                this.setState({ resendButtonDisabledTime: this.state.resendButtonDisabledTime - 1 })

            }
        }, 1000);

    };


    sendOTP = () => {

        fetch(BaseUrl+"api/Authentication/forgotpassword?MobileNo=" + this.state.mobileNo, {
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
                    this.props.navigation.navigate("OTPScreen",
                        {
                            mobileNumber: this.state.mobileNo,
                            userCode: 0
                        })
                }
            })
            .catch((error) =>
                console.log("forgotpassword error-->", error))

       
      
    }
    onVarifyOTP = (otp) => {
        console.log("-------", otp)
        this.props.navigation.navigate("SetNewPassword")
    }

  render() {
    return (
        <View style={{flex:1}}>
            <ImageBackground
                source={require("../assest/background.jpg")}
                style={styles.backImage}>
                
                <View style={styles.loginView}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: '5%' }}>
                       Forgot Your Password ?
                    </Text>
                    <View style={{ borderWidth: 0.5, width: "100%", marginTop: '2%' }} />
                    <Text style={{ fontSize: 17,  marginTop: '5%',textAlign:'center' }}>
                        To recover your password,you need to enter your registered mobile number.We will sent the recover code 
                        to your mobile number. 
                    </Text>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Mobile Number*"
                        placeholderTextColor="#000000"
                        autoCapitalize="none"
                        value={this.state.mobileNo}
                        label="Mobile Number"
                        maxLength={10}
                        returnKeyType="next"
                        mode='outlined'
                        onSubmitEditing={() => { this.passwordTextInput.focus(); }}
                        blurOnSubmit={false}
                        onChangeText={(text) => {
                            this.setState({ mobileNo: text });
                        }}
                    />
                  
                    <TouchableOpacity
                        style={styles.sigInButton}
                        onPress={() => {
                            this.sendOTP();
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                color: '#fff',
                                fontSize: 18,
                                fontWeight: 'bold',
                            }}>
                            SEND
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
        alignItems:'center'
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
    underlineStyleBase: {
        width: 35,
        height: 45,
        borderWidth: 1,
        borderColor: '#000',
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold'

    },
})