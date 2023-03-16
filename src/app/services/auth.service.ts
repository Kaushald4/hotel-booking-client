import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthData, IAuthUsers, IUser } from '../types/authUser';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://hotel-booking-backend-production.up.railway.app/api/v1';

  constructor(private http: HttpClient) {}

  handleSignup(signupData: any): Observable<IAuthData> {
    return this.http.post<IAuthData>(
      `${this.apiUrl}/auth/signup`,
      signupData,
      httpOptions
    );
  }

  handleLogin(loginData: any): Observable<IAuthData> {
    return this.http.post<IAuthData>(
      `${this.apiUrl}/auth/login`,
      loginData,
      httpOptions
    );
  }

  getLoggedInUser(token: string): Observable<IAuthData> {
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get<IAuthData>(`${this.apiUrl}/auth/me`, headerOptions);
  }

  getAllUsers(token: string): Observable<IAuthUsers[]> {
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get<IAuthUsers[]>(`${this.apiUrl}/users`, headerOptions);
  }

  logout(cb: Function) {
    localStorage.removeItem('user');
    cb();
  }
}
