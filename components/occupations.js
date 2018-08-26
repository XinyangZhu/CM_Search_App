import React from 'react';
import ReactDOM from 'react-dom';
import Styled from 'styled-components';
import { fetchOccupations } from '../actions/occupationsActions';
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

class Occupations extends React.Component {
	constructor(props) {
		super(props);
		this.showOccupationsList = this.showOccupationsList.bind(this);
		this.state = {show: false};
	}

	showOccupationsList() {
		if (this.props.occupations.length === 0) {
			this.props.fetchOccupations();
		}
		this.setState({show: true});
	}

	render() {
		return (
			<div>
				<h1 className="cover-heading" id='occupation_title'>Get All Occupations</h1>
				<p className="lead">Click the button below to get information about all the occupations existing on Career Map. </p>
				<Button onClick={this.showOccupationsList}>Show</Button>
				<div style={{display: this.state.show ? 'block' : 'none'}}>
					<Occupations_list id='occupations_list' occupations={this.props.occupations}></Occupations_list>
				</div>
			</div>
		);
	}
}

class Occupations_list extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.occupations.length === 0) {
			return (<div><p className="lead">Loading...</p></div>);
		} else {
			return (
				<div>
					<h2>Occupations List</h2>
					<br/>
					<div>
						{this.props.occupations.map((occupation) => {
							return (<Single_occupation key={occupation.id} info={occupation}/>);
						})}
					</div>
				</div>
			);
		}
	}
}

const OccupationName = Styled.h3`
	font-size: 1.5em;
	color: white;
	text-align: center; 
`;
const OccupationWrapper = Styled.section`
	padding: 1.5em;
	border: 2px solid palevioletred;
	border-radius: 3px;
`;
const Grid = Styled.div`
	display: grid; 
	padding: 10px;
	grid-gap: 10px;
	grid-template-columns: 40% 60%;
	grid-template-rows: 100px 100px;
	margin-top: 10px;
`;
const Avatar = Styled.div`
	grid-column: 1; 
	grid-row: 1;
`;
const Photo = Styled.div`
	grid-column: 1; 
	grid-row: 2;
`;
const Text = Styled.div`
	grid-column: 2;
	grid-row: 1/3; 
	text-align: left;
	font-size: 1.2em;
`;

class Single_occupation extends React.Component {
	render() {	
		const info = this.props.info;
		const future_job = info.future_job ? "Yes" : "No"; 
		const text = (
			<div>
				ID: {info.id} <br/> Demand: {info.demand} <br/> Duration: {info.duration} <br/> 
				Future Job: {future_job} <br/> Level: {info.level} <br/> Salary: {info.salary} 
				<br/> Trend: {info.trend} 
			</div>
			);

		return (
			<div>
				<OccupationWrapper>
					<OccupationName>{this.props.info.name}</OccupationName>
					<Grid>
						<Avatar>
							<img src={"https://mapakarier.org/app/assets/" + info.avatar}
							style={{maxHeight: "100%", maxWidth: "100%"}}/>
						</Avatar>
						<Photo>
							<img src={"https://mapakarier.org/app/assets/" + info.photo}
							style={{maxHeight: "100%", maxWidth: "100%"}}/>	
						</Photo>
						<Text>
							{text}
						</Text>						
					</Grid>			
				</OccupationWrapper>
				<br/>
			</div>
		);
	}
}


const mapStateToProps = state => ({
	occupations: state.occupations.occupations
});

const mapDispatchToProps = dispatch => ({
	fetchOccupations: choice => dispatch(fetchOccupations())
});

export default connect(mapStateToProps, mapDispatchToProps)(Occupations);


