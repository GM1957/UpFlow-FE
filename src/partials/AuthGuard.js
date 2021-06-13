import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { connect } from "react-redux";
import { login, setUserDetails } from "../redux/actions";
import { apis, axios } from "../services";
import Loader from "../components/Loaders/Loader";
import RouteHandler from "./RouteHandler";

const AuthGuard = (props) => {
  const [isAuthenticating, setAuthenticating] = useState(false);

  const authenticate = async () => {
    try {
      setAuthenticating(true);
      const cognitoUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      props.login(cognitoUser);

      setAuthenticating(false);
    } catch (err) {
      console.log(err);
      setAuthenticating(false);
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      if (props?.Auth?.isLoggedIn) {
        try {
          const DBuser = await axios.get(
            apis.GET_USER +
              "/" +
              props?.Auth?.cognitoUserInfo?.attributes?.email,
          );
          console.log("DBuser", DBuser);
          console.log(DBuser.data.data[0].projectIds[0])
          props.setUserDetails(DBuser.data.data[0]);
        } catch (err) {
          console.log("failed to fetch user data", err);
        }
      }
    }
    fetchUserData();
  }, [props.Auth.isLoggedIn]);

  return isAuthenticating ? <Loader /> : <RouteHandler />;
};

const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
  };
};

export default connect(mapStateToProps, {
  login,
  setUserDetails
})(AuthGuard);
