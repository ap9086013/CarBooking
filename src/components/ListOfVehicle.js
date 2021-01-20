import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import appStyles from './styles/AppStyles';

const { width, height } = Dimensions.get("screen");
export default class ListOfVehicle extends Component {
  constructor(props) {
    super(props);
      this.state = {
          listAllData: this.props.route.params.data
    };
    }
    componentDidMount = () => {
        console.log("-------------------------------------")
        console.log("------userDta-->",this.state.listAllData)
    }

  render() {
      return (
          <LinearGradient colors={['#f99050', '#f94c5d']} style={styles.linearMainView}>
              <ScrollView>
                  {this.state.listAllData.map((item)=>
              <View style={styles.vehicleListView}>
                  <View style={{ flexDirection: 'row' }}>
                      <View style={{marginLeft:'2%'}}>  
                  <Image
                      style={styles.imageStyles}
                      source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                          />
                      </View>
                      <View style={{width:'60%',alignItems:'center',marginTop:'2%'}}>
                                  <Text style={{ textAlign: 'left',fontSize:16 }}> Rate/Per KM :- {item.RoutePerKM} RS</Text>
                                  <Text style={{ textAlign: 'left',fontSize:16  }}> Number of Seet :- {item.NoOfSeet}</Text>
                                  <TouchableOpacity style={styles.bookButtonStyle}
                                      onPress={() => {
                                          console.log("--------", item)
                                          this.props.navigation.navigate('AllDetails', {
                                              item: item
                                          })
                                    
                                  }}>
                          <Text style={[appStyles.textColor,{fontWeight:'bold',fontSize:18}]}>
                               All Details 
                          </Text>
                          </TouchableOpacity>
                      </View>
                  </View>
                      </View>
                  )}
              </ScrollView>
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
        height: height / 5,
        borderRadius: 30,
        justifyContent: 'center',
        marginTop:'2%'
     //   alignItems:'center'
    },
    imageStyles: {
        width: width/3,
        height: height / 6, 
        
    },
    bookButtonStyle: {
        width: '50%',
        height: '20%',
        backgroundColor: '#ff6e59',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginTop: '30%',
      
    }

})