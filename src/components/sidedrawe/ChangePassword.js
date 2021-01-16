import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
      this.state = {
          oldpassword: '',
          newPassword: '',
          confirmPassword: '',
          userData: [],
          lodding: false
    };
    }
    // componentDidMount = () => {
    //     this.getStoreData();
    //     this.changePasswordSubmit();
    // }
    getStoreData = async () => {
        try {
            const value = await AsyncStorage.getItem('userData');
            if (value !== null) {

                this.setState({
                    userData: JSON.parse(value),
                });

                console.log('--statr--->', this.state.userData.access_token);
                // value previously stored
            }
        } catch (e) {
            console.log("--errror-->",e)
            // error reading value
        }
    }
    changePasswordSubmit = () => {
        console.log("----token-->", this.state.userData.access_token)
        fetch("http://103.21.54.52/Testing_API/Api/Authentication/UserChangePassword?" +
            "OldPassword=" + "1234567" + "&NewPassword=" + "123456", {
            method: 'POST',
            headers: {
                // "Accept": 'application/json',
                // 'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + "zZbegNGOZQTvZUQJQWkwGbHXjDtdHK4ZsqeCSo8NSrGuQ4SQOvpHyEc_DaQcHwYAbTVn8vM79mAKhtx2rApEunMCLfD6LD0qLVxrOhSBq_sTN-P-M4chlXCSc4TxB3rigORh89lSfCG7P7px2Nvls2qDECzTZVzzvJn50z_Vb4fhf8NN6TsA6HL0vKTJjoHLUyi1jrC-mTqyCXEZnu1tp3wIbvR__Wy3Z0JFDYzgrBUyzoXwNyoNpYrXtabhRYhXRkVWIOY5DiI5F6GxYg234PiNqpHFtnLpCAWhv7LIUEoDwE0ZHkff0bm8xV7FNRdxWXG6xInLBlu0tyGs0FzTB8q9mzPsPHpaky8UCyaPPfM"
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("changepassword-->",json)
                // this.setState({
                //     lodding: false
                // })

                if (json.successcode === 1) {
                    this.setState({
                        newPassword: '',
                        oldpassword: '',
                        confirmPassword: '',
                    })
                    alert(json.msg);
                }
                else {
                    alert(json.msg);
                }


            })
            .catch((error) =>
                console.log("--error--.", error))

        if (this.state.newPassword !== "" || this.state.confirmPassword !== "" || this.state.oldpassword !== "") {
            if (this.state.newPassword.length >= 6) {
                if (this.state.newPassword === this.state.confirmPassword) {
                    console.log("--accesstoken-->", this.state.userData.access_token);
                    this.setState({
                        lodding: true
                    })
                    fetch("http://103.21.54.52/Testing_API/Api/Authentication/UserChangePassword?" +
                        "OldPassword=" + this.state.oldpassword + "&NewPassword=" + this.state.newPassword, {
                        method: 'POST',
                        headers: {
                            // "Accept": 'application/json',
                            // 'Content-Type': 'application/json',
                            "Authorization": 'Bearer ' + this.state.userData.access_token
                        },
                    })
                        .then((response) => response.json())
                        .then((json) => {
                            console.log(json)
                            this.setState({
                                lodding: false
                            })
                            if (json.successcode === 1) {
                                this.setState({
                                    newPassword: '',
                                    oldpassword: '',
                                    confirmPassword: '',
                                })
                                alert(json.msg);
                            }
                            else {
                                alert(json.msg);
                            }


                        })
                        .catch((error) =>
                            console.log("--error--.", error))

                }
                else {
                    alert("New Password and Confirm Password not matched")
                }
            }
        } else {
            alert("Please Fill all Field")
        }

    }


  render() {
    return (
      <View>
        <Text> ChangePassword </Text>
      </View>
    );
  }
}
