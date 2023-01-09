import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link as RouteLink
} from "react-router-dom";

import {
    CreateSession,
    PokerHome,
} from './routes';

const App = () => {

  return (
      <Router>
            <Switch>
                <Route exact path="/">
                    <CreateSession />
                </Route>
                <Route path="/:sessionId">
                    <PokerHome />
                </Route>
          </Switch>
      </Router>
  );
}

export default App;
