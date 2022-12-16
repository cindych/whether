import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import NavBar from './components/NavBar';

import Playlist from './pages/Playlist';
import IndivSong from './pages/IndivSong';
import ExplorePage from './pages/explore/ExplorePage'
import Cities from './pages/Cities';

ReactDOM.render(
	<div>
		<Router>
			<NavBar />
			<Switch>
				<Route exact
					path="/"
					render={() => (
						<Playlist />
					)} />
				<Route exact
					path="/song"
					render={() => (
						<IndivSong />
					)} />
				<Route exact
					path="/explore"
					render={() => (
						<ExplorePage />
					)} />
				<Route exact
					path="/city"
					render={() => (
						<Cities />
					)} />
			</Switch>
		</Router>
	</div>,
	document.getElementById('root')
);

