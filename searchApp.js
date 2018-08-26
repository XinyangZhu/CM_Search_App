import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider, connect } from 'react-redux'
import rootReducer from './reducers'
import AppPages from './appPages'

const store = createStore(rootReducer, applyMiddleware(thunk));

class SearchApp extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<AppPages />
			</Provider>
		);
	}
}


export default SearchApp;