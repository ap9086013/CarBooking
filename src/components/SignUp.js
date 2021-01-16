import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-paper';
import BaseUrl from './baseurl/BaseURL';
const { width, height } = Dimensions.get("screen")

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNo: '',
      password: '',
      fullName: '',
      email: '',
      confirmPassword:'',
    };
  }
  
  registerSubmit = () => {
    console.log("----jsondata-->", JSON.stringify({
      "UserName": this.state.fullName,
      "MobileNo": this.state.mobileNo,
      "EmailId": this.state.email,
      "Address": "",
      "Password": this.state.password
    }))
    if (this.state.fullName != "" || this.state.mobileNo != "" || this.state.password != "" || this.state.confirmPassword != "" || this.state.email != "") {
      if (this.state.mobileNo.length === 10) {
        if (this.state.password.length >= 6) {
          if (this.state.password === this.state.confirmPassword) {
    

            fetch(BaseUrl + "api/Authentication/UserRegistration", {
              method: 'POST',
              headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                "UserName": this.state.fullName,
                "MobileNo": this.state.mobileNo,
                "EmailId": this.state.email,
                "Address": "",
                "Password": this.state.password
              })
            }).then((response) => response.json())
              .then((json) => {
                console.log("-----json-->", json)

                this.props.navigation.navigate("OTPScreen", 
                  {
                    mobileNumber: this.state.mobileNo,
                    userCode: json.data[0].UserCode
                  }
                )
              })
              .catch((error) =>
                console.log("error-->", error))
          } else {
            alert("password and confirm not matched ")
          }
        } else {
          alert("Please enter min 6 digite password")
        }


      } else {
        alert("Please enter correct mobile number")
      }
    } else{
      alert("Please Enter all field")
      }
   
  }



  render() {
    return (
      <View style={styles.mainView}>
        <ImageBackground
          source={require("../assest/background.jpg")}
          style={styles.backImage}>
        <View style={styles.lowerView}>
            <View style={styles.loginView}>
              
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: '5%' }}>
              Register
                    </Text>
            <View style={{ borderWidth: 0.5, width: "100%", marginTop: '2%' }} />
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Full Name*"
              placeholderTextColor="#000000"
              autoCapitalize="none"
              value={this.state.fullName}
              label="Full Name"
              returnKeyType="next"
              mode='outlined'
              onSubmitEditing={() => { this.emailTextInput.focus(); }}
              blurOnSubmit={false}
              onChangeText={(text) => {
                this.setState({ fullName: text });
              }}
            />
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Email*"
              placeholderTextColor="#000000"
              autoCapitalize="none"
              value={this.state.email}
              label="Email"
              returnKeyType="next"
              mode='outlined'
              ref={(input) => { this.emailTextInput = input; }}
              onSubmitEditing={() => { this.mobileNoTextInput.focus(); }}
              blurOnSubmit={false}
              onChangeText={(text) => {
                this.setState({ email: text });
              }}
            />
            <TextInput  style={styles.input}
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
              ref={(input) => { this.mobileNoTextInput = input; }}
              blurOnSubmit={false}
              onChangeText={(text) => {
                this.setState({ mobileNo: text });
              }}
            />
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Password *"
              placeholderTextColor="#000000"
              autoCapitalize="none"
              value={this.state.password}
              label="Password"
              secureTextEntry={true}
              returnKeyType="next"
              mode='outlined'
              onSubmitEditing={() => { this.confirmPasswordTextInput.focus() }}
              ref={(input) => { this.passwordTextInput = input; }}
              blurOnSubmit={false}
              onChangeText={(text) => {
                this.setState({ password: text });
              }}
            />
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Confirm Password *"
              placeholderTextColor="#000000"
              autoCapitalize="none"
              value={this.state.confirmPassword}
              label="Confirm Password"
              secureTextEntry={true}
              returnKeyType="next"
              mode='outlined'
              onSubmitEditing={() => { this.registerSubmit(); }}
              ref={(input) => { this.confirmPasswordTextInput = input; }}
              blurOnSubmit={false}
              onChangeText={(text) => {
                this.setState({ confirmPassword: text });
              }}
            />
            
            <TouchableOpacity
              style={styles.sigInButton}
              onPress={() => {
                this.registerSubmit();
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Register
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: '15%', alignItems: 'center', }}
              onPress={() => { this.props.navigation.navigate("Login")}}>

              <Text style={{ color: '#000' }}>Already have an account? </Text>
              <Text style={{ color: '#0d319f', fontWeight: 'bold' }}>LOGIN </Text>


            </TouchableOpacity>

          </View>

          </View>
          </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#6ae5af',
    position:'relative',
  },
  upperView: {
    flex: 1,
    backgroundColor: '#6ae5af'
  },
  lowerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: '0%',
    right: '0%',
    top:"4%",
  },
  loginView: {
 
    backgroundColor: '#fff',
    shadowColor: "#000",
    // width: width / 1.05,
    width: width / 1.2,
    height: height / 1.2,
//marginBottom: height / 8,
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
  backImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
})