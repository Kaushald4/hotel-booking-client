import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';
import { IUser } from 'src/app/types/authUser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: IUser | null = null;
  bookings: any[] = [];
  tableHeaders = ['Title', 'booked by', 'Offered Price', 'Status', 'Action'];
  constructor(
    private router: Router,
    private authService: AuthService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    let user: any = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      this.user = user;
      this.roomService.getBookings(user.token).subscribe((rooms: any) => {
        this.bookings.push(...rooms.data);
      });
    }
  }

  onBookApproveClick(id: string) {
    this.roomService
      .approveBooking(id, this.user!.token)
      .subscribe((res: any) => {
        const updatedBooking = this.bookings.map((booking) => {
          if (booking._id === id) {
            booking.isBooked = true;
            booking.isConfirmed = true;
          }
          return booking;
        });
        this.bookings = updatedBooking;
      });
  }

  onRjectClick(id: string, hotelId: string) {
    this.roomService
      .rejectBooking(id, hotelId, this.user!.token)
      .subscribe((res: any) => {
        this.roomService
          .getBookings(this.user!.token)
          .subscribe((rooms: any) => {
            this.bookings = [];
            this.bookings.push(...rooms.data);
          });
      });
  }
}
