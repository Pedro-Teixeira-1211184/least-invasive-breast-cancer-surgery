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
  public static readonly API_AUTH_SIGNUP_URL = Constants.API_BASE_URL_USERS + 'api/auth/request';
  public static readonly API_AUTH_SIGNUP_URL_PATIENT = Constants.API_BASE_URL_USERS + 'api/auth/request/patient';

}
