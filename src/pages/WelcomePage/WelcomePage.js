import React from "react";
import Layout from "../../hoc/Layout/Layout";
import classes from "./WelcomePage.module.css";

const WelcomePage = (props) => {
  return (
    <Layout isLeftBar={false}>
      <div className={classes.WelcomePage}>
        <div className={classes.LeftBox}>
          <p className={classes.Header}>
            Work on big ideas, <br /> without the busywork. <br />
            <div className={classes.Smiley}>😎🥳😻😻🤣😇😝😍😙😛</div>
            Manage your team <br />
            and project workflow <br />
            with UpFlow
          </p>
        </div>
        <div className={classes.RightBox}>
          <div className={classes.context}>
          <p>Please Login to start working 😜</p>
          </div>

          <div className={classes.area}>
            <ul className={classes.circles}>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WelcomePage;
