import React from 'react';
import ReactDOM from 'react-dom';
import Styled from 'styled-components';
import { setGender } from '../actions/genderActions';
import { connect } from 'react-redux';

const Button = Styled.button`
	border-radius: 3px;
	padding: 0.25em 1em;
	margin: 0.5em;
	background: ${props => props.primary ? 'palevioletred' : 'transparent'};
	color: ${props => props.primary ? 'white' : 'palevioletred'};
	border: 2px solid palevioletred;
	font-size: ${props => props.primary ? '1em' : '1.2em'};
`;

class Authorization extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const authorize = (gender) => {
			this.props.setGender(gender);
			this.forceUpdate();
		};

		return (this.props.gender === 0 || this.props.gender === 1)
			? (
				<h2>Welcome. </h2>	
			) 
			: (
				<div>
					<p className='lead' id='auth_text'>Please choose your gender in order to proceed. </p>
					<Button onClick={() => authorize(0)}>Male</Button>
					<Button onClick={() => authorize(1)}>Female</Button>
				</div>
				);
	}
}

const mapStateToProps = state => ({
	gender: state.gender.gender
});

const mapDispatchToProps = dispatch => ({
	setGender: choice => dispatch(setGender(choice))
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorization);


