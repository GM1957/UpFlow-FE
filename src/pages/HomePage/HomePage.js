import React from "react";
import { connect } from "react-redux";
import WelcomePage from "../WelcomePage/WelcomePage";
import Layout from "../../hoc/Layout/Layout"

import classes from "./HomePage.module.css";

const HomePage = (props) => {
  return props.Auth.isLoggedIn ? <Layout>hii</Layout>: <WelcomePage />;
};

const mapStateToProps = (state) => {
  return { Auth: state.Auth };
};

export default connect(mapStateToProps, {})(HomePage);
