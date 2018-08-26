import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class Favorates extends React.Component {
	constructor(props) {
		super(props);
	}

	showFavs(favs) {
		if (favs.length === 0) {
			return (<p className='lead' style={{color: "palevioletred"}}>No occupation has been added here. </p>);
		} else {
			return (
				<div>
					{favs.map((fav) => {
						return (<p key={fav.id} style={{fontSize: "1.8em"}}>{fav.name}</p>);
					})}
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				<h1 className="cover-heading" id='fav_title'>Your Favorates</h1>
				<p className="lead">
					All your favorate occupations are shown below. 
				</p>
				<h3>
					💕
				</h3>
				<br/>
				<div id='fav_inner' style={{border: "2px solid palevioletred", padding: "1em"}}>
					{this.showFavs(this.props.favorates)}
				</div>
			</div>
		);
	}	
}


const mapStateToProps = state => ({
	favorates: state.favorates.favorates
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Favorates);


