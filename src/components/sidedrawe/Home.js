import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-datepicker'
const { width, height } = Dimensions.get("screen");
const data = [{ city: "sagar" }, { city: "indore" }, { city: "bhopal" }, { city: "sagfdf" }, { city: "dgdhjghoifgr" }]
const API = 'https://swapi.co/api';
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripSelected: 'One Way Trip',
      query: '',
      fromDate: '',
      toData: '',
      data: data,
      
    };
  }

  serchButton = () => {
   this.props.navigation.navigate('ListOfVehicle')
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
                      From :-
                  </Text>
                    <Autocomplete
                      autoCapitalize="none"
                      autoCorrect={false}
                  
                      containerStyle={styles.autocompleteContainer}
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
                    {/* <Autocomplete
                      autoCapitalize="none"
                      autoCorrect={false}
                    inputContainerStyle={{ marginLeft: '4.5%' }}
                    //data={data}
                    defaultValue={this.state.query}
                    onChangeText={text => this.setState({ query: text })}
                    renderItem={({ item, i }) => (
                      <TouchableOpacity onPress={() => this.setState({ query: item.city })}>
                        <Text>{item.city}</Text>
                      </TouchableOpacity>
                    )}
                  /> */}
                </View>
                <View style={[styles.inputView]}>
                  <Text >
                    To :-  
                  </Text>
                  <Autocomplete
                    inputContainerStyle={{marginLeft:'10%'}}
                    //data={data}
                    defaultValue={this.state.query}
                    onChangeText={text => this.setState({ query: text })}
                    renderItem={({ item, i }) => (
                      <TouchableOpacity onPress={() => this.setState({ query: item.city })}>
                        <Text>{item.city}</Text>
                      </TouchableOpacity>
                    )}
                  />
                  </View>
                  <View style={[styles.inputView]}>
                    <Text >
                      From Date and Time :-
                  </Text>
                   
                    <DatePicker
                      style={{ width: 200 }}
                      date={this.state.fromDate}
                      mode="date"
                      placeholder="select date"
                      format="DD-MM-YYYY "
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
                      onDateChange={(date) => { this.setState({ fromDate: date }) }}
                    />

                  </View>
              
                  {this.state.tripSelected === 'Two Way Trip' ?
                    <View style={[styles.inputView]}>
                      <Text >
                        To Date and Time :-
                  </Text>
                      <DatePicker
                        style={{ width: 200 }}
                        date={this.state.toData}
                        mode="date"
                        placeholder="select date"
                        format="DD-MM-YYYY " //YYYY-MM-DD
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
                        onDateChange={(date) => { this.setState({ toData: date }) }}
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
    marginLeft: '17%',
  },

})
