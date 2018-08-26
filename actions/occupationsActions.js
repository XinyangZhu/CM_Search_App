import { FETCH_OCCUPATIONS } from './types';

export const fetchOccupations = () => dispatch => {
	var data = {};
	var init = {
		method: 'post',
		mode: 'cors', 
		credentials: 'include'
	};
	var url = 'https://mapakarier.org/backend/www/api/v1/occupation/getResults/name/ascending/name'
	var request = new Request(url);

	fetch(request, init)
		.then(response => response.json())
		.then((data) => {
			dispatch({
				type: FETCH_OCCUPATIONS, 
				list: data
			})
		});
};
