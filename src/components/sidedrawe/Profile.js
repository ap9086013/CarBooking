import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class Profile extends Component {
  constructor(props) {
    super(props);
      this.state = {
          userData: [],
          userName: '',
          stateCode: 0,
          cityCode: 0,
          mobileNo: '',
          emailId: '',
          address: '',
          aadharNo: '',
          panCardNo: '',
          bankName: '',
          bankAccountNumber: '',
          ifscCode: '',
          branchName: '',
          lodding: true,
          cityArray: [],
          stateArray: [],
    };
    }
    componentDidMount = () => {
        this.getStoreData();
    }
    getDropDownLists = () => {

        fetch('http://103.21.54.52/Testing_API/api/Authentication/DropDownList', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.successcode === 1) {
                    this.setState({
                        stateArray: json.data.State,
                        cityArray: json.data.City,
                        //userTypeArray: json.data.UserType,
                    })
                    //  console.log("------userArray-->", this.state.userTypeArray.length)
                    this.state.stateArray.map((item) => {
                        //    console.log("------amap-->", item)
                    })

                }
                else {
                    alert("Please Try agane")
                }
            })
            .catch((error) => {
                console.error(error);
            });


    }
    getStoreData = async () => {
        console.log("-----------------")
        try {
            const value = await AsyncStorage.getItem('userData');
            if (value !== null) {
                this.setState({
                    userData: JSON.parse(value),
                });
                this.getProfileData();

                console.log('--stadfdsftr--->', this.state.userData.userName);
                // value previously stored
            }
        } catch (e) {
            // error reading value
        }
    }
    getProfileData = () => {
        console.log("------------------rofile")
        fetch('http://103.21.54.52/Testing_API/api/Authentication/ProfileView', {
            method: 'GET',
            headers: {
                "Authorization": 'Bearer ' + this.state.userData.access_token
            },
        })
            .then((response) => response.json())
            .then((json) => {
                // if (json.successcode === 1) {
                //     this.setState({
                //         userName: json.data[0].OwnerName,
                //         stateCode: json.data[0].StateCode,
                //         cityCode: json.data[0].CityCode,
                //         mobileNo: json.data[0].MobileNo,
                //         emailId: json.data[0].EmailId,
                //         address: json.data[0].Address,
                //         aadharNo: json.data[0].AadhaarNo,
                //         panCardNo: json.data[0].PanNo,
                //         bankName: json.data[0].BankName,
                //         bankAccountNumber: json.data[0].AccNo,
                //         ifscCode: json.data[0].IFSCCode,
                //         branchName: json.data[0].BranchName,
                //         lodding: false
                //     })

                // }
                // else {
                //     console.log("00000else")
                // }
                console.log("profile-->", json)
            }).catch((error) => {
                console.log("--error==>", error)
            })
    }

  render() {
    return (
      <View>
        <Text> Profile </Text>
      </View>
    );
  }
}
