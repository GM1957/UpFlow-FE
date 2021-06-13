import React from "react";
import Layout from "../../hoc/Layout/Layout";
import classes from "./WelcomePage.module.css";

const WelcomePage = (props) => {
  return <Layout>
      <div className={classes.WelcomePage}>
            <div className={classes.LeftBox}>
                <p className={classes.Header}>
                Work on big ideas, <br/> without the busywork.
                </p>
            </div>
            <div className={classes.RightBox}>
           
            </div>
      </div>
  </Layout>;
};

export default WelcomePage;
