import { ADD_FAVORATE } from './types';
import { REMOVE_FAVORATE } from './types';

export const addFavorate = occupationIdName => dispatch => {
	dispatch({
		type: ADD_FAVORATE, 
		newFav: occupationIdName
	});
};

export const removeFavorate = occupationIdName => dispatch => {
	dispatch({
		type: REMOVE_FAVORATE, 
		removeFav: occupationIdName
	});
};