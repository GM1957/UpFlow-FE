import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Aux from "../Aux";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar"
import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <Aux>
      <NavBar />
      <div className={classes.Layout}>
        <div className={classes.LeftBox}>
          <LeftSideBar/>
        </div>
        <div className={classes.RightBox}>{props.children}</div>
      </div>
    </Aux>
  );
};

export default Layout;
