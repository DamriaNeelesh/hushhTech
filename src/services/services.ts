import authentication from "./authentication/authentication";
import * as reportService from "./reportService";

const services = {
  authentication: authentication,
  reports: reportService
};

export default services;
