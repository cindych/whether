import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';

import Home from './pages/Home';
import PlaylistPage from './pages/PlaylistPage';
import IndivSongPage from './pages/IndivSongPage';
import ExploreSongsPage from './pages/ExploreSongsPage';
import IndivSong from './pages/IndivSong';

ReactDOM.render(
  <div>
    <Router>
      <Switch>
		<Route exact
								path="/"
								render={() => (
									<IndivSong />
								)}/>
        <Route exact
							path="/homepage"
							render={() => (
								<HomePage />
							)}/>
		<Route exact
							path="/playlist"
							render={() => (
								<PlaylistPage />
							)}/>

		<Route exact
							path="/indivSong"
							render={() => (
								<IndivSongPage />
							)}/>

		<Route exact
							path="/explore"
							render={() => (
								<ExploreSongsPage />
							)}/>
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

