import { combineReducers } from 'redux';
import genderReducer from './genderReducer';
import occupationsReducer from './occupationsReducer';
import favoratesReducer from './favoratesReducer';

export default combineReducers({
	gender: genderReducer, 
	occupations: occupationsReducer, 
	favorates: favoratesReducer
});