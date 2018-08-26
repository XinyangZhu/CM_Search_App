import { SET_GENDER } from './types';

export const setGender = gender => dispatch => {
	var init = {
		method: 'post',
		mode: 'cors', 
		credentials: 'include'
	};
	var url = (gender == 0) 
		? 'https://mapakarier.org/backend/www/api/v1/auth/login/User/DE2w42N!@/male'
		: 'https://mapakarier.org/backend/www/api/v1/auth/login/User/DE2w42N!@/fem'

	var request = new Request(url);

	fetch(request, init)
		.then(response => 
			 dispatch({
				type: SET_GENDER, 
				choice: gender
			})
		);
};
