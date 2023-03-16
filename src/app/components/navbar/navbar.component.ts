import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user = {
    name: '',
    email: '',
    role: '',
    error: '',
    isLoading: false,
    _id: '',
  };
  constructor(private authService: AuthService, private router: Router) {
    console.log(this.user);
  }

  ngOnInit(): void {
    let user: any = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      this.user['isLoading'] = true;

      this.authService.getLoggedInUser(user.token).subscribe({
        next: (data) => {
          this.user['email'] = data.data.email;
          this.user['name'] = data.data.name;
          this.user['role'] = data.data.role;
          this.user['_id'] = data.data._id;
          this.user['isLoading'] = false;
        },
        error: (err) => {
          console.log(err);
          this.user['error'] = err.error.message;
          this.user['isLoading'] = false;
        },
      });
    }
  }

  logout() {
    this.authService.logout(() => {
      this.router.navigate(['/login'], { replaceUrl: true });
    });
  }
}
