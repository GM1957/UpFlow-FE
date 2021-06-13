import React from "react";

import classes from "./Loader.module.css";

const Loader = (props) => {
  return (
    <div className={classes.container}>
      <div className={[classes.dash, classes.uno].join(" ")}></div>
      <div className={[classes.dash, classes.dos].join(" ")}></div>
      <div className={[classes.dash, classes.tres].join(" ")}></div>
      <div className={[classes.dash, classes.cuatro].join(" ")}></div>
    </div>
  );
};

export default Loader;
