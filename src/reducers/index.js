import { combineReducers } from 'redux'
import jsonReducer from './jsonReducer';

export default combineReducers({
    jsonFile: jsonReducer
}); 