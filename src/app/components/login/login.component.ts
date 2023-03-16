import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IAuthData } from 'src/app/types/authUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData: any = {
    email: '',
    password: '',
    error: null,
    isLoading: false,
  };

  constructor(private authService: AuthService, private router: Router) {
    let user: any = localStorage.getItem('user');
    if (user) {
      this.router.navigate(['/'], { replaceUrl: true });
    }
  }

  onInputValueChange(inpValue: string) {
    if (this.loginData.error) {
      this.loginData.error = null;
    }
    const { name, value } = JSON.parse(inpValue);
    this.loginData[name] = value;
  }

  onLoginComplete(data: IAuthData) {
    this.loginData.isLoading = false;
    if (data.success) {
      localStorage.setItem('user', JSON.stringify(data.data));
      this.router.navigate(['/'], { replaceUrl: true });
    }
  }
  onLoginError(err: HttpErrorResponse) {
    this.loginData.isLoading = false;
    this.loginData['error'] = err.error.message;
  }

  onLogin() {
    this.loginData.isLoading = true;
    this.authService
      .handleLogin(this.loginData)
      .subscribe({
        next: (data) => this.onLoginComplete(data),
        error: (err) => this.onLoginError(err),
      });
  }
}
