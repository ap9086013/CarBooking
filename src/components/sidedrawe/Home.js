import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-datepicker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseUrl from '../baseurl/BaseURL';
import appStyles from '../styles/AppStyles';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { connect } from "react-redux";
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width, height } = Dimensions.get("screen");
const data = [];
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      tripSelected: 'One Way Trip',
      tripSelectedID: 1,
      sourceCityName: '',
      fromDate: '',
      toData: '',
      data: data,
      loading: false,
      destinationCity: '',
      cityArray: [],
      sourceTime:" __ / __",
      sourceTimeFlag: false,
      zIndexFlag: 0,

    };
  }
  componentDidMount = () => {

    this.getCity();
    this.getData();
  }

  getCity = () => {
    this.setState({ loading: true })
    fetch(BaseUrl + 'api/Authentication/DropDownList', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ loading: false })
        if (json.successcode === 1) {
          this.setState({
            cityArray: json.data.City,
          })


          this.state.cityArray.map((item) => {
            if (item.CityDesc === null) {

            } else {
              this.state.data.push(item)
            }

            //console.log("------amap-->", item)
          })

          console.log("------amap-->", this.state.data.length)
          console.log("------amap-->", this.state.cityArray.length)

        }
        else {
          alert("Please Try agane")
        }
      })
      .catch((error) => {
        this.setState({ loading: false })
        console.error(error);
      });


  }

  serchButton = () => {
    console.log("------------------")
    this.setState({
      loading: true
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
            data: json.data
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

  sourceCitySearch(sourceCityName) {
    // console.log("-sourceCityName-->", sourceCityName)
    if (sourceCityName === '') {
      return [];
    }


    const { data } = this.state;
    return data.filter(film => film.CityDesc.toLowerCase().startsWith(sourceCityName.toLowerCase())
    ).map(citysData => citysData);

    // return data.filter(film => film.CityDesc.search(regex) >= 0);
  }
  sourceTimeGet = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.sourceTime;
    console.log("----ev-->", event)
  };

  hideDatePicker = () => {
    this.setState({ sourceTimeFlag: false })
  };

  handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    this.hideDatePicker();
  };



  render() {
    const { sourceCityName } = this.state;
    var sourceCityData = this.sourceCitySearch(sourceCityName);
    var destinationCirtData = this.sourceCitySearch(this.state.destinationCity);
    const sourceCityComp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <LinearGradient colors={['#f99050', '#f94c5d']} style={styles.linearMainView}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: width / 1, marginTop: '2%' }}>
          <TouchableOpacity style={styles.wayTab}
            onPress={() => {
              this.setState({ tripSelected: 'One Way Trip' })
              this.props.setTripSelectedID(1)
              this.props.setTripSelected('One Way Trip')
            }}>
            <Text style={[styles.textStyle, { fontWeight: '500' }]}>
              One Way Trip
            </Text>

          </TouchableOpacity>
          <TouchableOpacity style={styles.wayTab}
            onPress={() => {
              this.setState({ tripSelected: 'Two Way Trip' })
              this.props.setTripSelectedID(2)
              this.props.setTripSelected('Two Way Trip')

            }}>
            <Text style={[styles.textStyle, { fontWeight: '500' }]}>
              Two Way Trip
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', marginTop: '5%' }}>
          <ScrollView>
            {
              this.state.tripSelected ?
                <View style={styles.selectedView}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
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
                      listStyle={{ flex: 1 }}
                      data={sourceCityData.length === 1 && sourceCityComp(sourceCityName, sourceCityData[0].CityDesc) ? [] : sourceCityData}
                      defaultValue={sourceCityName}
                      onChangeText={text => this.setState({ sourceCityName: text })}
                      placeholder="Enter your city name"
                      renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {
                          sourceCityData = null
                          this.props.setSourceCity(item)
                          this.setState({ sourceCityName: item.CityDesc })
                        }}>
                          <Text style={styles.itemText}>
                            {item.CityDesc}
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
                      // inputContainerStyle={{ marginLeft: '10%' }}
                      autoCapitalize="none"
                      autoCorrect={false}
                      containerStyle={{
                        flex: 1,
                        left: 0,
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        zIndex: this.state.zIndexFlag,
                        marginLeft: '32%'
                      }}
                      listStyle={{ flex: 1 }}
                      data={destinationCirtData.length === 1 && sourceCityComp(this.state.destinationCity, destinationCirtData[0].CityDesc) ? [] : destinationCirtData}
                      placeholder="Enter city name whare you go"
                      defaultValue={this.state.destinationCity}
                      onChangeText={text => { this.setState({ destinationCity: text, zIndexFlag: 1 }) }}
                      renderItem={({ item, i }) => (
                        <TouchableOpacity onPress={() => {
                          sourceCityData = null
                          this.props.setDestinationCity(item)

                          this.setState({ destinationCity: item.CityDesc })
                        }}>
                          <Text style={styles.itemText}>{item.CityDesc}</Text>
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
                        console.log("---date-->", date)
                        this.setState({ fromDate: date })
                        this.props.setFromDate(date)
                      }}
                    />


                  </View>
                  <View style={[styles.inputView]}>
                    <Text >
                      Source Time :-
                  </Text>
                    <TouchableOpacity style={{ alignItems: 'flex-end', marginLeft: "15%", }}
                      onPress={() => { this.setState({ sourceTimeFlag: true }) }}
                    >
                      <MaterialIcons
                        name="access-time"
                        size={height / 25} />
                    </TouchableOpacity>
                    <Text style={{}}>{this.state.sourceTime }</Text>
                    {this.state.sourceTimeFlag && (
                      <DateTimePicker
                      //  testID="dateTimePicker"
                        firstDayOfWeek={true}
                        value={new Date()}
                        mode="time"
                        is24Hour={false}
                        showIcon={true}
                        display="default"
                        onChange={(time, e) => {

                          console.log("--time-->", time, "---=time-->", e, "----", e.toLocaleTimeString())
                          this.setState({
                            sourceTime: e.toLocaleTimeString(),
                            sourceTimeFlag:false})
                           
                          }}
                          />
                      // <RNDateTimePicker
                      //   value={this.state.sourceTime}
                      //   mode="time"
                      //   onChange={(time, e) => { console.log("--time-->", time, "----", e) }}/>

                    )}


                  </View>

                  {this.state.tripSelected === 'Two Way Trip' ?
                    <View style={[styles.inputView]}>
                      <Text >
                        Destination Date  :-
                  </Text>
                      <DatePicker
                        style={{ width: 200, marginLeft: "5.5%", alignItems: 'flex-end' }}
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
                    onPress={() => { this.serchButton() }}>
                    <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>
                      Search
                    </Text>
                  </TouchableOpacity>
                </View> : null
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
    alignItems: 'center'
  },
  wayTab: {
    backgroundColor: '#fff',
    height: height / 16,
    width: width / 2.7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50

  },
  textStyle: {
    fontSize: 17,

  },
  selectedView: {
    width: width / 1.05,
    height: height / 1.4,
    backgroundColor: "#fff",
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'

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
    width: width / 2,
    height: height / 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
    alignSelf: 'center'

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
  itemText: {
    margin: '2%',
    fontSize: 16
  },
  autocomplete: {
    alignSelf: "stretch",
    height: 50,
    margin: 10,
    marginTop: 50,
    backgroundColor: "#FFF",
    borderColor: "lightblue",
    borderWidth: 1
  },
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }

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
    setTripSelectedID: (reducerTripSelectedID) => { dispatch({ type: 'Trip_SelectedID', payload: reducerTripSelectedID }) },
    setTripSelected: (reducerTripSelected) => { dispatch({ type: 'Trip_Selected', payload: reducerTripSelected }) },
    setSourceCity: (reduceSourceCityArray) => { dispatch({ type: 'reduceSourceCityArray', payload: reduceSourceCityArray }) },
    setDestinationCity: (reduceDestinationCityArray) => { dispatch({ type: 'reduceDestinationCityArray', payload: reduceDestinationCityArray }) },

    //  onEnterTokenNo: (SearchedToken) => { dispatch({ type: 'GET_SEARCHED_TOKEN', payload: SearchedToken }) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)