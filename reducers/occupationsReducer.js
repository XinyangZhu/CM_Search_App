import { FETCH_OCCUPATIONS } from '../actions/types';

const initial_state = {
	occupations: []
};

export default function(state = initial_state, action) {
	switch (action.type) {
		case FETCH_OCCUPATIONS: 
			return {occupations: action.list};
		default: 
			return state;
	}
}