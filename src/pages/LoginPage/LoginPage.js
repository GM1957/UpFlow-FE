import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import LoginModal from "../../components/LoginModal/LoginModal";
import Layout from "../../hoc/Layout/Layout";
import classes from "./LoginPage.module.css";

const LoginPage = (props) => {
  const [open, setOpen] = useState(true);
  const history = useHistory();

  const closeHandler = () => {
    setOpen(false);
    history.goBack();
  };

  return (
    <Layout isLeftBar={false}>
      <div className={classes.LoginModal}>
        <LoginModal open={open} closed={closeHandler} />
      </div>
    </Layout>
  );
};

export default LoginPage;
