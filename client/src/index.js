import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import Home from './pages/Home';

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact
							path="/"
							render={() => (
								<Home />
							)}/>
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

