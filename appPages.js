import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Authorize_wrapper from './components/authorization'
import Occupations_wrapper from './components/occupations'
import Search_wrapper from './components/search'
import Favorates_wrapper from './components/favorates'


class AppPages extends React.Component {
	constructor(props) {
		super(props);
		this.state = {activePage: 0};
		this.switchPage = this.switchPage.bind(this);
	}

	switchPage(num) {
		if (this.props.gender === 0 || this.props.gender === 1) {
			this.setState({activePage: num});
		}
	}

	render() {
		return (
			<div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
				<header className="masthead mb-auto">
					<div className="inner">
						<h3 className="masthead-brand">Career Map Search Engine</h3>
						<nav className="nav nav-masthead justify-content-center">
							<a className={this.state.activePage === 1 ? "nav-link active" : "nav-link"} id="Home" onClick={() => this.switchPage(1)}>Home</a>
							<a className={this.state.activePage === 2 ? "nav-link active" : "nav-link"} id="Search" onClick={() => this.switchPage(2)}>Search</a>
							<a className={this.state.activePage === 3 ? "nav-link active" : "nav-link"} id="Favorates" onClick={() => this.switchPage(3)}>Favorates</a>
						</nav>
					</div>
				</header>

				<main role="main" className="inner cover" style={{marginTop: "10%"}}>
					
					<div style={{display: (this.state.activePage === 0) ? 'block' : 'none'}}>
						<Authorize_wrapper id='authorize_wrapper'></Authorize_wrapper>
					</div>

					<div style={{display: (this.state.activePage === 1) ? 'block' : 'none'}}>
						<Occupations_wrapper id='occupations_wrapper'></Occupations_wrapper>
					</div>

					<div style={{display: (this.state.activePage === 2) ? 'block' : 'none'}}>
						<Search_wrapper id='search_wrapper'></Search_wrapper>
					</div>

					<div style={{display: (this.state.activePage === 3) ? 'block' : 'none'}}>
						<Favorates_wrapper id='favorates_wrapper'></Favorates_wrapper>
					</div>

				</main>

				<footer className="mastfoot mt-auto">
					<div className="inner">
						<p>By Young Zhu</p>
					</div>
				</footer>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	gender: state.gender.gender
});

export default connect(mapStateToProps, null)(AppPages);