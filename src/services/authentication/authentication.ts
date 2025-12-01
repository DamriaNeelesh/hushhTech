import getUserDetails from "./getUserDetails";
import googleSignIn from "./googleSignIn";
import signOut from "./signOut";
import getAccessToken from "./getAccessToken";
import isLoggedIn from "./isLoggedIn";
import getFullName from "./getFullName";
import getSession from "./getSession";
import emailLogin from "./emailLogin";
import appleSignIn from "./appleSignIn";

const authentication = {
  googleSignIn: googleSignIn,
  appleSignIn: appleSignIn,
  getUserDetails: getUserDetails,
  signOut: signOut,
  getAccessToken: getAccessToken,
  isLoggedIn: isLoggedIn,
  getFullName: getFullName,
  getSession: getSession,
  emailLogin: emailLogin,
};
export default authentication;
