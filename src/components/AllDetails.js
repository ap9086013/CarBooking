import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import appStyles from './styles/AppStyles';
import { connect } from "react-redux";
import BaseUrl from './baseurl/BaseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("screen");
 class AllDetails extends Component {
  constructor(props) {
    super(props);
      this.state = {
          data: this.props.route.params.item,
          userData: [],
          currentDate: '',
          currentTime:'',
    };

      
     }
     getData = async () => {
         try {
             const value = await AsyncStorage.getItem('userData')
             if (value !== null) {
                 this.setState({
                     userData: JSON.parse(value)
                 })
                 console.log("--statr--->", this.state.userData)
                 // value previously stored
             }
         } catch (e) {
             // error reading value
             console.log("-drawecontent.getData==error=>", e)
         }
     }
     componentDidMount = () => {
         console.log("---data-->", this.state.data)
         console.log("--array-->", this.props.reduceSourceCityArray)
         console.log("--Destinationarray-->", this.props.reduceDestinationCityArray)
         console.log("--reducer--", this.props.reducerTripSelectedID, "-----name", this.props.reducerTripSelected)
         console.log()
         this.getData();
         this.getCureentDate_Time();
     
     }
     

     getCureentDate_Time = async () => {
         var date = new Date().getDate();
         var month = new Date().getMonth() + 1;
         var year = new Date().getFullYear();
         var hours = new Date().getHours(); //Current Hours
         var min = new Date().getMinutes(); //Current Minutes
         var sec = new Date().getSeconds(); //Current Seconds

        await  this.setState({
             currentDate: year + '-' + month + '-' + date,
             currentTime: hours + ":" + min + ":" + sec
         })
         console.log("---time-----",this.state.currentDate,"-----",this.state.currentTime)
     }

     bookSubmit = () => {
         console.log("URL---->", JSON.stringify({
             "VichalCode": this.state.data.VehicleCode,
             "VichalRegCode": this.state.data.RegistrationNo,
             "OneorTwoWayCode": this.props.reducerTripSelectedID,
             "OneorTwoWayDesc": this.props.reducerTripSelected,//this.state.data,
             "BookingDate": this.state.currentDate,
             "BookingTime": this.state.currentTime,
             "BookingFromDate": this.props.reducerFromDate,
             "BookingFromTime": "2021-01-22",
             "BookingToDate": this.props.reducerToDate,
             "BookingToTime": "15:59",
             "SourceCityCode": this.props.reduceSourceCityArray.CityCode,
             "SourceCityName": this.props.reduceSourceCityArray.CityDesc,
             "SourceStateCode": this.props.reduceSourceCityArray.StateCode,
             "SourceStateDesc": "M.p",
             "DestinStateCode": this.props.reduceDestinationCityArray.StateCode,
             "DestinStateDesc": "ddb"
         }))
         
        // fetch(BaseUrl +'api/UserBooking/UserBooking',{
        //     method: 'POST',
        //     headers: {
        //         "Authorization": 'Bearer ' + this.state.userData.access_token,
        //         "Accept": 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //  JSON.stringify({
        //      "VichalCode": this.state.data.VehicleCode,
        //      "VichalRegCode": this.state.data.RegistrationNo,
        //      "OneorTwoWayCode": this.props.reducerTripSelectedID,
        //      "OneorTwoWayDesc": this.props.reducerTripSelected,//this.state.data,
        //      "BookingDate": this.state.currentDate,
        //      "BookingTime": this.state.currentTime,
        //      "BookingFromDate": this.props.reducerFromDate,
        //      "BookingFromTime": "2021-01-22",
        //      "BookingToDate": this.props.reducerToDate,
        //      "BookingToTime": "15:59",
        //      "SourceCityCode": this.props.reduceSourceCityArray.CityCode,
        //      "SourceCityName": this.props.reduceSourceCityArray.CityDesc,
        //      "SourceStateCode": this.props.reduceSourceCityArray.StateCode,
        //      "SourceStateDesc": "M.p",
        //      "DestinStateCode": this.props.reduceDestinationCityArray.StateCode,
        //      "DestinStateDesc": "ddb"
        //  })
        // })
        //     .then((response) => response.json())
        //     .then((json) => {
             
        //         console.log("profile-->", json)
        //     }).catch((error) => {
        //         console.log("--error==>", error)
        //     })
    }

  render() {
    return (
        <LinearGradient colors={['#f99050', '#f94c5d']} style={styles.linearMainView}>
       
            <View style={styles.vehicleListView}>
                <View style={{alignItems:'center'}}>
                    <View style={{ margin:'auto',marginTop:'2%'}}>
                        <Image
                            style={styles.imageStyles}
                            source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                        />
                    </View>
                    <View style={{ width: '100%', alignItems:"flex-start", marginTop: '2%',marginLeft:'5%' }}>
                        <Text style={styles.textStyle}> Registration No. :-  {this.state.data.RegistrationNo }</Text>
                        <Text style={styles.textStyle}> Company  Name :-  {this.state.data.VichlCompName }</Text>
                        <Text style={styles.textStyle}> Brand Name :-  {this.state.data.BandName }</Text>
                        <Text style={styles.textStyle}> Rate/Per KM :-  {this.state.data.RoutePerKM} RS</Text>
                        <Text style={styles.textStyle}> Number of Seet :-  {this.state.data.NoOfSeet}</Text>
                        <TouchableOpacity style={styles.bookButtonStyle}
                            onPress={() => {
                                this.bookSubmit();
                                console.log("--------")
                                
                            }}>
                            <Text style={[appStyles.textColor, { fontWeight: 'bold', fontSize: 18 }]}>
                                Book
                          </Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
    vehicleListView: {
        backgroundColor: '#fff',
        width: width / 1.1,
        height: height / 1.2,
        borderRadius: 30,
      //  justifyContent: 'center',
        marginTop: '2%'
        //   alignItems:'center'
    },
    imageStyles: {
        width: width / 1.3,
        height: height / 2.5,
        resizeMode:'cover',       

    },
    bookButtonStyle: {
        width: '65%',
        height: '15%',
        backgroundColor: '#ff6e59',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginTop: '30%',
        alignSelf:'center'

    },
    textStyle: {
        fontWeight: '700',
        textAlign: 'left',
        fontSize: 18
        
    }
})

const mapStateToProps = (state) => {
    return {
        reducerFromDate: state.reducerFromDate,
        reducerFromTime: state.reducerFromTime,
        reducerToDate:state.reducerToDate,
        reducerToTime: state.reducerToTime,
        reducerTripSelectedID: state.reducerTripSelectedID,
        reducerTripSelected: state.reducerTripSelected,
        reduceSourceCityArray: state.reduceSourceCityArray,
        reduceDestinationCityArray: state.reduceDestinationCityArray,
        

        //  SearchedToken: state.SearchedToken
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         setFromDate: (reducerFromDate) => { dispatch({ type: 'GET_FROMEDATE', payload: reducerFromDate }) },
//         //  onEnterTokenNo: (SearchedToken) => { dispatch({ type: 'GET_SEARCHED_TOKEN', payload: SearchedToken }) }
//     }
// }
export default connect(mapStateToProps)(AllDetails)