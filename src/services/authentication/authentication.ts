import getUserDetails from "./getUserDetails";
import googleSignIn from "./googleSignIn";
import signOut from "./signOut";
import getAccessToken from "./getAccessToken";
import isLoggedIn from "./isLoggedIn";
import getFullName from "./getFullName";
import getSession from "./getSession";
import emailLogin from "./emailLogin";
import checkRegistrationStatus from "./checkRegistrationStatus";

const authentication = {
  googleSignIn: googleSignIn,
  getUserDetails: getUserDetails,
  signOut: signOut,
  getAccessToken: getAccessToken,
  isLoggedIn: isLoggedIn,
  getFullName: getFullName,
  getSession: getSession,
  emailLogin: emailLogin,
  checkRegistrationStatus: checkRegistrationStatus
};
export default authentication;
