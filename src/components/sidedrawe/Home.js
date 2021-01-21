import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-datepicker'
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseUrl from '../baseurl/BaseURL';
import appStyles from '../styles/AppStyles';
import { connect } from "react-redux";

const { width, height } = Dimensions.get("screen");
const data = [{ city: "sagar" }, { city: "indore" }, { city: "bhopal" }, { city: "sagfdf" }, { city: "dgdhjghoifgr" }]
const API = 'https://swapi.co/api';
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

 class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData:[],
      tripSelected: 'One Way Trip',
      query: '',
      fromDate: '',
      toData: '',
      data: data,
      time: new Date(1598051730000),
      loading: false,
      destinationCity:''
      
    };
  }
  componentDidMount = () => {
    this.getData();
    }

  serchButton = () => {
    console.log("------------------")
    this.setState({
      loading:true
    })
    fetch(BaseUrl + "api/UserBooking/UserVehicleShow", {
      method: 'POST',
      headers: {
        "Authorization": 'Bearer ' + this.state.userData.access_token,
        "Accept": 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "BookingFromDate": this.state.fromDate.toString()
      })
    })
        .then((response) => response.json())
      .then((json) => {
        this.setState({
          loading: false
        })
          if (json.successcode === 1) {
            this.props.navigation.navigate('ListOfVehicle', {
              data:json.data
            })
          //   alert(json.msg)
          //   this.setState({
          //     lodding: false
          //   })
          //   //   this.getProfileData();
           }
          else {
             alert(json.msg)
           }
        console.log("---responce json-->", json.data)
        })
      .catch((error) => {
        this.setState({
          loading: false
        })
          console.log("error-->", error)
        })


      
    

    
  // this.props.navigation.navigate('ListOfVehicle')
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

  findFilm(query) {
    console.log("-query-->",query)
    if (query === '') {
      return [];
    }

    const { data } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return data.filter(film => film.city.search(regex) >= 0);
  }
  render() {
    const { query } = this.state;
    const data = this.findFilm(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    
    return (
      
      <LinearGradient colors={['#f99050', '#f94c5d']} style={styles.linearMainView}>
        <View style={{ flexDirection: 'row',justifyContent:'space-around',width:width/1,marginTop:'2%' }}>
          <TouchableOpacity style={styles.wayTab}
            onPress={() => {
            this.setState({tripSelected:'One Way Trip'})
          }}>
            <Text style={[styles.textStyle, { fontWeight: '500' }]}>
              One Way Trip
            </Text>

          </TouchableOpacity>
          <TouchableOpacity style={styles.wayTab}
            onPress={() => {
              this.setState({ tripSelected: 'Two Way Trip' })
            }}>
            <Text style={[styles.textStyle, { fontWeight:'500'}]}>
              Two Way Trip
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', marginTop: '5%' }}>        
          <ScrollView>
        {
          this.state.tripSelected ?
            <View style={styles.selectedView}>
              <Text style={{fontSize:20,fontWeight:'bold'}}>
                {this.state.tripSelected}
              </Text>
                <View style={[styles.inputView]}>
                  <Text>
                      Source :-
                  </Text>
                    <Autocomplete
                   //   inputContainerStyle={{ marginLeft: '19%' }}
                      autoCapitalize="none"
                      autoCorrect={false}
containerStyle={styles.autocompleteContainer}
                      listStyle={{flex:1}}
                      data={data.length === 1 && comp(query, data[0].city) ? [] : data}
                      defaultValue={query}
                      onChangeText={text => this.setState({ query: text })}
                      placeholder="Enter your city name"
                      renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => this.setState({ query: item.city })}>
                          <Text style={styles.itemText}>
                            {item.city}
              </Text>
                        </TouchableOpacity>
                      )}
                    />
                  
                </View>
                <View style={[styles.inputView]}>
                  <Text >
                      Destination  :-  
                  </Text>
                  <Autocomplete
                    inputContainerStyle={{marginLeft:'10%'}}
                    //data={data}
                      placeholder="Enter city name whare you go"
                      defaultValue={this.state.destinationCity}
                      onChangeText={text => this.setState({ destinationCity: text })}
                    renderItem={({ item, i }) => (
                      <TouchableOpacity onPress={() => this.setState({ destinationCity: item.city })}>
                        <Text>{item.city}</Text>
                      </TouchableOpacity>
                    )}
                  />
                  </View>
                  <View style={[styles.inputView]}>
                    <Text >
                      Source Date :-
                  </Text>
                   
                    <DatePicker
                      style={{ width: 200, alignItems: 'flex-end', marginLeft: "15%", }}
                      date={this.state.fromDate}
                      mode="date"
                      placeholder="select date"
                      format="YYYY-MM-DD"
                      minDate="2021-01-17"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: 'absolute',
                          left: 0,
                          top: 4,
                          marginLeft: 0
                        },
                        dateInput: {
                          marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={(date) => {
                        console.log("---date-->",date)
                        this.setState({ fromDate: date })
                        this.props.setFromDate(date)
                      }}
                    />

                  </View>
              
                  {this.state.tripSelected === 'Two Way Trip' ?
                    <View style={[styles.inputView]}>
                      <Text >
                        Destination Date  :-
                  </Text>
                      <DatePicker
                        style={{ width: 200,marginLeft:"5.5%",alignItems:'flex-end'}}
                        date={this.state.toData}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="2021-01-17"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                          },
                          dateInput: {
                            marginLeft: 36
                          }
                          // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {
                          
                          this.setState({ toData: date })
                          this.props.setTODate(date)
                        }}
                      />
                    </View>
                    : null}
                  
                  <TouchableOpacity style={styles.searchButton}
                    onPress={() => { this.serchButton()}}>
                    <Text style={{color:'#fff',fontSize:17,fontWeight:'bold'}}>
                      Search
                    </Text>
                  </TouchableOpacity>
            </View>:null
            }
          </ScrollView>
        </View>
        {
          this.state.loading ?

            <View style={appStyles.lodingView}>
              <ActivityIndicator size="large" color="#fff" />
            </View> : null
        }
    </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  linearMainView: {
    flex: 1,
    alignItems:'center'
  },
  wayTab: {
    backgroundColor: '#fff',
    height: height / 16,
    width: width / 2.7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:50
    
  },
  textStyle: {
    fontSize: 17,
   
  },
  selectedView: {
    width: width / 1.05,
    height:height/1.4,
    backgroundColor: "#fff",
    borderRadius: 30,
    alignItems: 'center',
    justifyContent:'center'
    
  },
  inputView: {
    flexDirection: 'row',
   //justifyContent: 'space-between',
    width: '90%',
    height: '8%',
    marginTop: '3%',
    alignItems: 'center',
  //  backgroundColor:'red'
  
  },
  searchButton: {
    backgroundColor: "#ff6e59",
    width: '60%',
    height: '8%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'5%'

  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    marginLeft: '32%' 
  },

})

const mapStateToProps = (state) => {
  return {
    reducerFromDate: state.reducerFromDate,
  //  SearchedToken: state.SearchedToken
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFromDate: (reducerFromDate) => { dispatch({ type: 'GET_FROMEDATE', payload: reducerFromDate }) },
    setTODate: (reducerToDate) => { dispatch({ type: 'GET_TODATE', payload: reducerToDate }) },
    //  onEnterTokenNo: (SearchedToken) => { dispatch({ type: 'GET_SEARCHED_TOKEN', payload: SearchedToken }) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)