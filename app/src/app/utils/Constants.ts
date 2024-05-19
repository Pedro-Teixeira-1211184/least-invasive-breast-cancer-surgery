export default class Constants {
  // user authentication
  //public static readonly API_BASE_URL_USERS = 'https://least-invasive-breast-cancer-surgery.onrender.com/';
  //public static readonly API_BASE_URL_MODELS = 'https://least-invasive-breast-cancer-surgery-2kt9.onrender.com/';
  public static readonly API_BASE_URL_USERS = 'http://localhost:3000/';
  public static readonly API_BASE_URL_MODELS = 'http://localhost:4000/';

  //user authentication
  public static readonly API_AUTH_LOGIN_URL = Constants.API_BASE_URL_USERS + 'api/auth/signin';
  public static readonly API_AUTH_LOGIN_URL_PATIENT = Constants.API_BASE_URL_USERS + 'api/auth/signin/patient';

  // user signup request
  public static readonly API_AUTH_SIGNUP_REQUEST_URL = Constants.API_BASE_URL_USERS + 'api/auth/request/';
  public static readonly API_AUTH_SIGNUP_REQUEST_DELETE_URL = Constants.API_BASE_URL_USERS + 'api/auth/request/';
  public static readonly API_AUTH_SIGNUP_REQUEST_URL_PATIENT = Constants.API_BASE_URL_USERS + 'api/auth/request/patient/';
  public static readonly API_AUTH_SIGNUP_REQUEST_DELETE_URL_PATIENT = Constants.API_BASE_URL_USERS + 'api/auth/request/patient/';
  public static readonly API_GET_REQUESTS = Constants.API_BASE_URL_USERS + 'api/auth/request';
  public static readonly API_GET_REQUESTS_PATIENTS = Constants.API_BASE_URL_USERS + 'api/auth/request/patient/';

  // patient
  public static readonly API_GET_PATIENTS = Constants.API_BASE_URL_USERS + 'api/patients';

  // Sign Up
  public static readonly API_AUTH_SIGNUP_STAFF_URL = Constants.API_BASE_URL_USERS + 'api/auth/signup';
  public static readonly API_AUTH_SIGNUP_PATIENT_URL = Constants.API_BASE_URL_USERS + 'api/auth/signup/patient';

  // roles
  public static readonly ROLE_ADMIN = 'admin';
  public static readonly ROLE_DOCTOR = 'doctor';
  public static readonly ROLE_PATIENT = 'patient';
  public static readonly ROLE_IMAGIOLOGIST = 'imagiologist';
  public static readonly API_GET_ROLES = Constants.API_BASE_URL_USERS + 'api/roles';

  // models
  public static readonly API_GET_MODELS_PATIENTID = Constants.API_BASE_URL_MODELS + 'api/models/patient/';
  public static readonly API_GET_MODELS_MODELID = Constants.API_BASE_URL_MODELS + 'api/models/';
  public static readonly API_GET_MODELS_DOCTORID = Constants.API_BASE_URL_MODELS + 'api/models/doctor/';
  public static readonly API_DELETE_MODELS_MODELID = Constants.API_BASE_URL_MODELS + 'api/models/';
  public static readonly API_DELETE_MODELS_PERMISSIONS_MODELID = Constants.API_BASE_URL_MODELS + 'api/models/permission/';
  public static readonly API_UPLOAD_MODELS = Constants.API_BASE_URL_MODELS + 'api/models';
  public static readonly API_UPLOAD_MODELS_PERMISSIONS = Constants.API_BASE_URL_MODELS + 'api/models/permission';
}
