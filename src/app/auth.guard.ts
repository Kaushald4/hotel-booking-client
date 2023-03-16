import { Injectable, OnInit } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, OnInit {
  data: any = {
    user: null,
    isLoading: false,
    isInitial: true,
    error: null,
  };

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.data.isLoading = true;
    let user: any = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      this.authService.getLoggedInUser(user.token).subscribe({
        next: (data) => {
          this.data.user = data.data;
          this.data.isInitial = false;
          this.data.isLoading = false;
        },
        error: (err) => {
          this.data.error = err.error.message;
          this.data.isInitial = false;
          this.data.isLoading = true;
        },
      });
    } else {
      this.data.user = null;
      this.data.isInitial = false;
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let user: any = localStorage.getItem('user');
    if (!user) {
      this.router.navigateByUrl('/login');
      return false;
    }

    if (!this.data.user && !this.data.isInitial) {
      this.router.navigateByUrl('/login');
      return false;
    }
    console.log(this.data);
    return true;
  }
}
