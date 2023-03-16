import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IAuthData } from 'src/app/types/authUser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupData: any = {
    name: '',
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
    if (this.signupData.error) {
      this.signupData.error = null;
    }
    const { name, value } = JSON.parse(inpValue);
    this.signupData[name] = value;
  }

  onSignUpComplete(data: IAuthData) {
    this.signupData.isLoading = false;
    if (data.success) {
      localStorage.setItem('user', JSON.stringify(data.data));
      this.router.navigate(['/'], { replaceUrl: true });
    }
  }
  onSignUpError(err: HttpErrorResponse) {
    this.signupData.isLoading = false;
    this.signupData['error'] = err.error.message;
  }

  onSignup() {
    this.signupData.isLoading = true;
    this.authService
      .handleSignup(this.signupData)
      .subscribe({
        next: (data) => this.onSignUpComplete(data),
        error: (err) => this.onSignUpError(err),
      });
  }
}
