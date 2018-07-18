import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import * as Constants from './shared/constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    })
  };

  token = Constants.getToken();

  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    return this.http.get(Constants.baseUrl + '/api/account/user-info', this.token);
  }

  login(loginData): Observable<any> {
    const data = 'grant_type=password&username=' + encodeURIComponent(loginData.username) +
      '&password=' + encodeURIComponent(loginData.password);
    return this.http.post(Constants.baseUrl + '/token', data, this.httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post(Constants.baseUrl + '/api/account/logout', {}, this.token);
  }
}
