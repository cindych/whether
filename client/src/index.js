import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import NavBar from './components/NavBar';
import IndivSong from './pages/IndivSong';
import Playlist from './pages/Playlist';
import Cities from './pages/Cities';

import HomePage from './pages/HomePage';
import PlaylistPage from './pages/PlaylistPage';
import IndivSongPage from './pages/IndivSongPage';

import ExplorePage from './pages/explore/ExplorePage'

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
				<Route exact
					path="/homepage"
					render={() => (
						<HomePage />
					)} />

// below are old pages with react components TODO: delete when done
				<Route exact
					path="/playlistPage"
					render={() => (
						<PlaylistPage />
					)} />
				<Route exact
					path="/indivSongPage"
					render={() => (
						<IndivSongPage />
					)} />
			</Switch>
		</Router>
	</div>,
	document.getElementById('root')
);

