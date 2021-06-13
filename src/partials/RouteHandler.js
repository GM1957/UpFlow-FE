import { Route, BrowserRouter, Switch } from "react-router-dom";

import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignupPage from "../pages/SignupPage/SignupPage";
import DashBoardPage from "../pages/DashBoardPage/DashBoardPage";

const RouteHandler = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomePage} exact />

        <Route path="/login" component={LoginPage} exact />

        <Route path="/signup" component={SignupPage} exact />

        <Route path="/project/:projectId" component={DashBoardPage} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default RouteHandler;
