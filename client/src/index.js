import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

import Home from './pages/Home';
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
									<Home />
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

