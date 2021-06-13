import React from "react";
import { logout } from "../../redux/actions";
import { connect } from "react-redux";
import Logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import classes from "./NavBar.module.css";

const NavBar = (props) => {
  return (
    <div className={classes.NavBar}>
      <div className={classes.NavLogo}>
        <img src={Logo} alt="mainLogo" />
        <p>UpFlow</p>
      </div>
      <div className={classes.ButtonSection}>
        {props?.Auth?.isLoggedIn ? (
          <div className={classes.UserTooltip}>
            <div className={classes.UserIconSection}>
              <i className="user circle icon"></i>
            </div>
            <span className={classes.UserTooltipActive}>
              <div className={classes.TooltipButtons}>
                <div className={classes.Buttons} onClick={() => props.logout()}>
                  Logout
                </div>
              </div>
            </span>
          </div>
        ) : (
          <>
            <NavLink className={classes.LoginButton} to="/login" exact>
              Login
            </NavLink>
            <NavLink className={classes.SignupButton} to="/signup" exact>
              Join
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { Auth: state.Auth };
};

export default connect(mapStateToProps, { logout })(NavBar);
