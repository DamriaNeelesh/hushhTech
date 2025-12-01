import authentication from "./authentication/authentication";
import * as reportService from "./reportService";
import preferencesService from "./preferences";

const services = {
  authentication: authentication,
  reports: reportService,
  preferences: preferencesService,
};

export default services;
