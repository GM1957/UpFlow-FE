import React from "react";
import { connect } from "react-redux";
import WelcomePage from "../WelcomePage/WelcomePage";
import Layout from "../../hoc/Layout/Layout";

import classes from "./HomePage.module.css";

const HomePage = (props) => {
  return props.Auth.isLoggedIn ? (
    <Layout>
      <body>
        <div className={classes.wrapper}>
          <div className={classes.box}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className={classes.Main}>
            👈🏻 Please Select A Project or Create One
          </div>
        </div>
      </body>
    </Layout>
  ) : (
    <WelcomePage />
  );
};

const mapStateToProps = (state) => {
  return { Auth: state.Auth };
};

export default connect(mapStateToProps, {})(HomePage);
