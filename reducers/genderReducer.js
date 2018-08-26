import { SET_GENDER } from '../actions/types';

const initial_state = {
	gender: -1
};

export default function(state = initial_state, action) {
	switch (action.type) {
		case SET_GENDER: 
			return {gender: action.choice};
		default: 
			return state;
	}
}