import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { routes } from "./constant";

export const Routes: React.FC = () => {
  return (
    <div>
      <Router>
        <Switch>
          {routes.map((route) => (
            <Route path={route.path} exact>
              <route.component />
            </Route>
          ))}
        </Switch>
      </Router>
    </div>
  );
};
