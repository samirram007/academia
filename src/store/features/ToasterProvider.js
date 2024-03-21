import {  combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
const toastrReducers = {
    // ... other reducers ...
    toastr: toastrReducer // <- Mounted at toastr.
}
const toastrReducer = combineReducers(toastrReducers)
// const store = createStore(toastrReducer)
