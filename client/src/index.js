import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import IndivSong from './pages/IndivSong';
import ExploreSongs from './pages/ExploreSongs';
import Playlist from './pages/Playlist';

import HomePage from './pages/HomePage';
import PlaylistPage from './pages/PlaylistPage';
import IndivSongPage from './pages/IndivSongPage';
import ExploreSongsPage from './pages/ExploreSongsPage';

ReactDOM.render(
	<div>
		<Router>
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
						<ExploreSongs />
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
				<Route exact
					path="/exploreSongsPage"
					render={() => (
						<ExploreSongsPage />
					)} />
			</Switch>
		</Router>
	</div>,
	document.getElementById('root')
);

