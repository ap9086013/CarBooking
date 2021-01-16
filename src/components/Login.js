import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, Keyboard, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-paper';
import BaseUrl from './baseurl/BaseURL';
import appStyles from './styles/AppStyles';
const {width,height}=Dimensions.get("screen")
export default class Login extends Component {
  constructor(props) {
    super(props);
      this.state = {
          mobileNo: '',
          password: '',
          loadding:false
    };
    }
    loginSubmit = () => {
        Keyboard.dismiss();
        if (this.state.mobileNo !== "" || this.state.password !== "") {
            if (this.state.mobileNo.length === 10) {
                console.log("------login by-->", this.state.mobileNo, "--passord-->", this.state.password)
                this.setState({loadding:true})
                var details = {
                    'userName': this.state.mobileNo,
                    'password': this.state.password,
                    'grant_type': 'password'
                };

                var formBody = [];
                for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");
                this.setState({
                    lodding: true
                })
                fetch(BaseUrl+"Token", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formBody
                })
                    .then((response) => response.json())
                    .then((json) => {
                        
                        console.log(json);
                        if (json.access_token) {
                            this.storeData(JSON.stringify(json))
                            console.log("--token-->",json.access_token)
                        } else {
                            this.setState({
                                loadding: false
                            })
                            alert(json.error_description)
                        }

                    })
                    .catch((error) => {
                        this.setState({
                            loadding: false
                        })
                        console.log("error-->", error)

                    });
              
            }
            else {
                alert("Please enter correct Mobile number")
            }
           
        }
        else {
            alert("Please enter mobile or password")
        }
    }

    //store data in local stroge 
    storeData = async (value) => {
        try {
            await AsyncStorage.setItem('userData', value)
            this.setState({
                lodding: false
            })
            this.props.navigation.navigate("SideDrawer")

        } catch (error) {
            console.log("-----asybcStroage storedata- error->", error)
            // saving error
        }
    }


    //click forgot password text click
    forgotPasswordClick = () => {
        this.props.navigation.navigate("ForgotPassword")
        
    }
    signupClick = () => {
        this.props.navigation.navigate("Signup")
    }

  render() {
    return (
        <View style={styles.mainView}>
            <ImageBackground
                source={require("../assest/background.jpg")}
                style={styles.backImage}>
            <View style={styles.upperView}>
          
            </View>
            <View style={styles.lowerView}>
                    <View style={styles.loginView}>
                        
                    <Text style={{fontSize:20,fontWeight:'bold',marginTop:'5%'}}>
                        Login Account
                    </Text>
                    <View style={{borderWidth:0.5,width:"100%",marginTop:'2%'}}/>
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
                        onSubmitEditing={() => { this.loginSubmit(); }}
                        ref={(input) => { this.passwordTextInput = input; }}
                        blurOnSubmit={false}
                        onChangeText={(text) => {
                            this.setState({ password: text });
                        }}
                    />
                    <TouchableOpacity style={{ marginTop: '5%' }}
                        onPress={() => { this.forgotPasswordClick()}}>

                        <Text style={{color:'red'}}>In case you forgot password ? </Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.sigInButton}
                        onPress={() => {
                            this.loginSubmit();
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                color: '#fff',
                                fontSize: 18,
                                fontWeight: 'bold',
                            }}>
                            Log In
                </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: '15%', alignItems: 'center', }}
                        onPress={() => { this.signupClick()}}>

                        <Text style={{ color: '#000' }}>Don't have an account? </Text>
                        <Text style={{ color: '#0d319f',fontWeight:'bold' }}>REGISTER </Text>


                    </TouchableOpacity>
                  
                </View>
           
                </View>
                   
            </ImageBackground>
             {
                        this.state.loadding ?

                            <View style={appStyles.lodingView}>
                                <ActivityIndicator size="large" color="#fff" />
                            </View> : null
            }
            
          
      </View>
    );
  }
}
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        //backgroundColor: '#6ae5af'
    },
    upperView: {
        flex: 1,
      //  backgroundColor:'#6ae5af'
    },
    lowerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    loginView: {
        backgroundColor: '#fff',
        shadowColor: "#fff",
        // width: width / 1.05,
        width: width / 1.2,
        height: height / 2,
        marginBottom: height / 8,
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