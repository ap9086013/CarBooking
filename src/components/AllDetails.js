import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import appStyles from './styles/AppStyles';
import { connect } from "react-redux";

const { width, height } = Dimensions.get("screen");
 class AllDetails extends Component {
  constructor(props) {
    super(props);
      this.state = {
          data: this.props.route.params.item
    };
    }
    componentDidMount = () => {
        console.log("---------------props----------------------", this.props.reducerFromDate)
        console.log("------userDta-->", this.props.reducerFromTime)
        console.log("===todate==>", this.props.reducerToDate)
 console.log("-----------gggjj-->",this.props.reducerToTime)
    }
    bookSubmit = () => {
        
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
        reducerToTime: state.reducerToTime

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