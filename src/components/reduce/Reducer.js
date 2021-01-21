const iState= {
    reducerFromDate:"0",
    reducerFromTime: "0",
    reducerToDate: "0",
    reducerToTime:"0"
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
        return{
          ...state,
            reducerToTime:action.payload 
        }
}
    return state;

}
export default reducer;