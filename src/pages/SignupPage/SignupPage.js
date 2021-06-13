import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SignupModal from "../../components/SignupModal/SignupModal";
import Layout from "../../hoc/Layout/Layout";
import classes from "./SignupPage.module.css";

const SignupPage = (props) => {
  const [open, setOpen] = useState(true);
  const history = useHistory();

  const closeHandler = () => {
    setOpen(false);
    history.goBack();
  };

  return (
    <Layout>
      <div className={classes.SignupModal}>
        <SignupModal open={open} closed={closeHandler} />
      </div>
    </Layout>
  );
};

export default SignupPage;
