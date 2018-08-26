import React from 'react';
import ReactDOM from 'react-dom';
import Styled from 'styled-components';
import { fetchOccupations } from '../actions/occupationsActions';
import { addFavorate, removeFavorate } from '../actions/favoratesActions'
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

const Input = Styled.input`
	color: palevioletred;
	font-size: 1.2em;
	border: 2px solid palevioletred;
	border-radius: 3px;
	background: transparent;
	padding: 0.25em 0.5em;
	margin: 0.5em;
`;

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {input: ""};
		this.showSearchedOccupation = this.showSearchedOccupation.bind(this);
	}

	showSearchedOccupation(event) {
		if (this.props.occupations.length === 0) {
			this.props.fetchOccupations();
		}
		this.setState({input: event.target.value});
	}

	render() {
		return (
			<div>
				<h1 className="cover-heading" id='search_title'>Search for Occupations</h1>
				<p className="lead">
					Enter the occupation name in the input box below. <br/> 
					(Case insensitive)
				</p>
				<Input id='search_box' placeholder='Occupation Name' onChange={this.showSearchedOccupation}/>
				<br/>
				<Button primary>Search</Button>
				<br/>
				<Search_result id='search_result_container' query={this.state.input} list={this.props.occupations} 
					addFavorate={this.props.addFavorate} removeFavorate={this.props.removeFavorate} favorates={this.props.favorates}/>
			</div>
		);
	}
}

class Search_result extends React.Component {
	constructor(props) {
		super(props);
		this.state = {possibleResults: [], detailOC: {}};
		this.updatePossibleResults = this.updatePossibleResults.bind(this);
		this.showDetail = this.showDetail.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (this.props.query !== prevProps.query || this.props.list !== prevProps.list) {
			this.setState({detailOC: {}});
			this.updatePossibleResults();
		}
	}

	updatePossibleResults() {
		if (this.props.query.length === 0) {
			this.setState({possibleResults: []});
		} else {
			var pos = this.props.list.filter(oc => oc.name.toLowerCase().includes(this.props.query.toLowerCase()));
			this.setState({possibleResults: pos});
		}
	}

	showDetail(choice) {
		this.setState({detailOC: choice});
	}

	render() {
		if (JSON.stringify(this.state.detailOC) === "{}") {
			if (this.props.query.length === 0) {
				return (<div></div>);
			}
			if (this.state.possibleResults.length > 0) {
				return (
					<div>
						<h2>Possible Result(s)</h2>
						<p>Please choose the occupation that you want to search for. </p>
						<div style={{borderRadius: "3px", border: "2px solid palevioletred", paddingTop: "1em"}}>
							<ul>
								{this.state.possibleResults.map((choice) => {
									return (<li key={choice.id} style={{fontSize: "1.8em"}} onClick={() => {this.showDetail(choice)}}>{choice.name}</li>);
								})}
							</ul>
						</div>
						<br/>
					</div>
				);
			} else {
				if (this.props.list.length === 0) {
					return (<p className='lead'>Loading...</p>);
				} else {
					return (<p style={{color: "palevioletred", fontSize: "1.8em"}}>No result!</p>);
				}
			}
		} else {
			return (<OccupationDetail basics={this.state.detailOC} addFavorate={this.props.addFavorate} removeFavorate={this.props.removeFavorate} favorates={this.props.favorates}/>);
		}
	}
}

const OccupationName = Styled.h3`
	font-size: 2em;
	color: white;
	text-align: center; 
	margin-bottom: 0.5em;
`;
const OccupationDetailWrapper = Styled.section`
	margin: 1em;
	padding: 1.5em;
	border: 2px solid palevioletred;
	border-radius: 3px;
`;
const Grid = Styled.div`
	display: grid; 
	grid-gap: 10px;
	grid-template-columns: 100%;
	grid-template-rows: auto auto auto auto;
	margin-top: 10px;
	margin-bottom: 10px;
`;
const Detail = Styled.div`
	grid-column: 1; 
	grid-row: ${props => props.row};
	text-align: left;
	font-size: 1.5em;
`;
const Title = Styled.h5`
	color: ${props => props.color};
	
`;
const Value = Styled.h6`
	color: #BDBDBD;
	display: block;
	float: right;
`;
const Bar = Styled.div`
	width: 100%; 
	height: 1em;
	background-color: white;
	border-radius: 0.2em;
	margin-top: 1.6em;
`;
const Count = Styled.div`
	width: ${props => {
		return converter(props.count);
	}};
	border-radius: 0.2em;
	background-color: ${props => props.color};
	height: 100%;
`;
const converter = (count) => {
	var num = count * 1.0 / 5 * 100;
	return num.toString() + "%";
}

class OccupationDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {details: {}};
	}

	componentWillMount() {
		var data = {};
		var init = {
			method: 'post',
			mode: 'cors', 
			credentials: 'include'
		};
		var url = 'https://mapakarier.org/backend/www/api/v1/occupation/getJobStatistics/' + this.props.basics.id;
		var request = new Request(url);

		fetch(request, init).then(res => res.json())
			.then(data => this.setState({details: data}));
	}

	render() {
		const basics = this.props.basics;
		const details = this.state.details;
		if (JSON.stringify(details) === "{}") {
			return (<p>loading...</p>);
		} else {
			return (
				<div>
					<OccupationDetailWrapper>
						<OccupationName>{basics.name}</OccupationName>
						<img src={"https://mapakarier.org/app/assets/" + basics.photo} 
						style={{maxHeight: "100%", maxWidth: "100%"}}/>
						<Grid>
							<Detail row="1">
								<Title color='#FF6859'>Salary</Title>
								<Value>&middot; &middot; &middot; {details.salary.value}</Value>
								<Bar>
									<Count count={parseInt(details.salary.count)} color='#FF6859'/>
								</Bar>
							</Detail>
							<Detail row="2">
								<Title color='#FFCF44'>Market</Title>
								<Value>&middot; &middot; &middot; {details.market.value}</Value>
								<Bar>
									<Count count={parseInt(details.market.count)} color='#FFCF44'/>
								</Bar>
							</Detail>
							<Detail row="3">
								<Title color='#B15DFF'>Demand</Title>
								<Value>&middot; &middot; &middot; {details.demand.value}</Value>
								<Bar>
									<Count count={parseInt(details.demand.count)} color='#B15DFF'/>
								</Bar>
							</Detail>
							<Detail row="4">
								<Title color='#72DEFF'>Duration</Title>
								<Value>&middot; &middot; &middot; {details.duration.value}</Value>
								<Bar>
									<Count count={parseInt(details.duration.count)} color='#72DEFF'/>
								</Bar>
							</Detail>
						</Grid>
						<FavorateButton ocID={basics.id} ocName={basics.name} addFavorate={this.props.addFavorate} removeFavorate={this.props.removeFavorate} favorates={this.props.favorates}/>
					</OccupationDetailWrapper>
					<br/>
				</div>
			);
		}
	}
}

class FavorateButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isFaved: false};
		this.addOrRemove = this.addOrRemove.bind(this);
	}

	componentWillMount() {
		if (this.props.favorates.some(ele => {return ele.id === this.props.ocID.toString();})) {
			this.setState({isFaved: true});
		}
	}

	addOrRemove(occupationIdName) {
		if (this.state.isFaved) {
			this.props.removeFavorate(occupationIdName);
			this.setState({isFaved: false});
		} else {
			this.props.addFavorate(occupationIdName);
			this.setState({isFaved: true});
		}
	}

	render() {
		if (this.props.favorates.some(ele => {ele.id === this.props.ocID.toString()})) {
			this.setState({isFaved: true});
		}
		var occupationIdName = {id: this.props.ocID, name: this.props.ocName};
		if (this.state.isFaved) {
			return (
				<Button onClick={() => {this.addOrRemove(occupationIdName)}}>
					Remove from favorates
				</Button>
			);
		} else {
			return (
				<Button primary onClick={() => {this.addOrRemove(occupationIdName)}}>
					Add to favorates
				</Button>
			);
		}
	}
}



const mapStateToProps = state => ({
	occupations: state.occupations.occupations, 
	favorates: state.favorates.favorates
});

const mapDispatchToProps = dispatch => ({
	fetchOccupations: () => dispatch(fetchOccupations()), 
	addFavorate: occupationIdName => dispatch(addFavorate(occupationIdName)), 
	removeFavorate: occupationIdName => dispatch(removeFavorate(occupationIdName))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);


