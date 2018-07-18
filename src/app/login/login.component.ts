import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login.service';
import * as Constants from '../shared/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '',
    password: ''
  };

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    if (this.isConnected()) {
      // this.loginService.getUser().subscribe(data => this.loginData.username = data.username);
      this.loginData.username = sessionStorage.getItem(Constants.SESSION_STORAGE.LOGIN_DATA);
    }
  }

  isConnected(): boolean {
    return !!sessionStorage.getItem(Constants.SESSION_STORAGE.TOKEN_KEY);
  }

  login(): void {
    this.loginService.login(this.loginData).subscribe(data => {
      sessionStorage.setItem(Constants.SESSION_STORAGE.TOKEN_KEY, data.access_token);
      sessionStorage.setItem(Constants.SESSION_STORAGE.LOGIN_DATA, this.loginData.username);
      sessionStorage.setItem(Constants.SESSION_STORAGE.USER_ROLE, data.role);
    });
  }

  logout(): void {
    this.loginService.logout().subscribe(() => sessionStorage.removeItem(Constants.SESSION_STORAGE.TOKEN_KEY));
  }

}
