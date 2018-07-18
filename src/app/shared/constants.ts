import {HttpHeaders} from '@angular/common/http';

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user'
};
export const SESSION_STORAGE = {
  USER_ROLE: 'userRole',
  TOKEN_KEY: 'tokenKey',
  LOGIN_DATA: 'loginData'
};
export const baseUrl = 'http://localhost:52651';

export function getToken() {
  const token = sessionStorage.getItem(SESSION_STORAGE.TOKEN_KEY);
  return {headers: token ? new HttpHeaders({'Authorization': 'Bearer ' + token}) : new HttpHeaders({})};
}
