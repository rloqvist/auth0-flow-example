import React, {useState, useEffect} from "react";
import Auth from "@klira/auth0-flow";

const handleAuth = async () => {
  // prepare the auth-object with config
  const authMngr = new Auth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  });

  // perform the login
  await authMngr.getAuthManager().authorizeIfNotLoggedIn();

  // extract the payload
  return authMngr.authMgr.getToken()
}

export const App = () => {
  const [auth, setAuth] = useState();

  useEffect(() => {
    handleAuth().then(setAuth)
  }, []);

  return auth ? (
    <>Username: {auth?.idTokenPayload?.sub}</>
  ) : null;
};
