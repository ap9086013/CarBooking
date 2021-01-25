const iState= {
    reducerFromDate:"0",
    reducerFromTime: "0",
    reducerToDate: "0",
    reducerToTime: "0",
    reducerTripSelected: "One Way Trip",
    reducerTripSelectedID: 1,
    reduceSourceCityArray: [],
    reduceDestinationCityArray:[]
    
}

const reducer =(state=iState,action)=>{
   
    if (action.type == 'GET_FROMEDATE') {
        return{
            ...state,
            reducerFromDate:action.payload 
        }
    }
    if (action.type == 'GET_TODATE') {
        return {
            ...state,
            reducerToDate: action.payload
        }
    }
    if (action.type == 'GET_FROMTIME') {
        return {
            ...state,
            reducerFromTime: action.payload
        }
    }
    if (action.type == 'GET_TOTIME') {
        return {
            ...state,
            reducerToTime: action.payload
        }
    }
        if (action.type == 'Trip_Selected') {
            return {
                ...state,
                reducerTripSelected: action.payload
        }
    }
    if (action.type == 'reduceSourceCityArray') {
        return {
            ...state,
            reduceSourceCityArray: action.payload
        }
    }
    if (action.type == 'Trip_SelectedID') {
        return {
            ...state,
            reducerTripSelectedID: action.payload
        }
    }
    if (action.type == 'reduceDestinationCityArray') {
        return {
            ...state,
            reduceDestinationCityArray: action.payload
        }
    }
    return state;

}
export default reducer;