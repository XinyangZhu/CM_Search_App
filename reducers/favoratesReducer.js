import { ADD_FAVORATE, REMOVE_FAVORATE } from '../actions/types';

const initial_state = {
	favorates: []
};

export default function(state = initial_state, action) {
	switch (action.type) {
		case ADD_FAVORATE: 
			return {
				favorates: state.favorates.concat([action.newFav])
			};
		case REMOVE_FAVORATE: 
			var oldFavs = state.favorates;
			var newFavs = oldFavs.filter(fav => ! (fav.id === action.removeFav.id))
			return {
				favorates: newFavs
			};
		default: 
			return state;
	}
}