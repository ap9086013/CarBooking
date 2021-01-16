import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, { Component } from 'react';
import { View, Text, Dimensions, ImageBackground, StyleSheet } from 'react-native';
import BaseUrl from './baseurl/BaseURL';
import appStyles from './styles/AppStyles';
const { width, height } = Dimensions.get("screen")
export default class OTPScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resendButtonDisabledTime: 30,
            mobileNumber: this.props.route.params.mobileNumber,
            userCode: this.props.route.params.userCode,
            isLoading: false,
        };
    }
    componentDidMount = () => {
        this.startResendOtpTimer()
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
    onVarifyOTP = (otp) => {
        fetch(BaseUrl+'Api/Authentication/OTPCheck?UserCode=' + this.state.userCode +
            '&MobileNo=' + this.state.mobileNumber + '&OTP=' + otp, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },

        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                if (json.successcode === 1) {
                    if (this.state.userCode === 0) {
                        this.props.navigation.navigate("SetNewPassword", {
                            mobileNo: this.state.mobileNumber
                        })
                    } else {

                        this.props.navigation.navigate("Login")
                    }
                }


            })
            .catch((error) => {
                console.error(error);
            });




    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={require("../assest/background.jpg")}
                    style={styles.backImage}>
                    <Text> OTfdsfsPScreen </Text>
                    <View style={appStyles.loginView}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: '5%' }}>
                            Verifying your number
                    </Text>
                        <View style={{ borderWidth: 0.5, width: "100%", marginTop: '2%' }} />
                        <Text style={{ fontSize: 17, marginTop: '5%', textAlign: 'center' }}>
                            We have sent an OTP on your nunber 9435234567
                    </Text>
                        <View style={{ height: '20%', width: '80%', backgroundColor: 'transprent', marginTop: '15%' }}>
                            <OTPInputView pinCount={6}

                                autoFocusOnLoad={true}
                                keyboardType="number-pad"

                                codeInputFieldStyle={styles.underlineStyleBase}
                                codeInputHighlightStyle={{ borderColor: 'black', borderWidth: 2 }}
                                onCodeFilled={(code => {
                                    this.onVarifyOTP(code);
                                })}
                            />
                            {this.state.resendButtonDisabledTime <= 0 ?

                                <Text
                                    onPress={this.onResendOtp}
                                    style={{ textAlign: 'center', fontSize: 20, marginTop: 10, fontWeight: 'bold', letterSpacing: 1, color: '#0d319f' }}>Resend OTP</Text> :
                                <Text

                                    style={{ textAlign: 'center', fontSize: 17, marginTop: 10, fontWeight: 'bold', letterSpacing: 1 }}>Resend OTP in {this.state.resendButtonDisabledTime}s</Text>}

                        </View>
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

