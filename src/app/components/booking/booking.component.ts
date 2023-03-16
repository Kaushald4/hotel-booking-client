import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';
import { IUser } from 'src/app/types/authUser';
import { IRoom } from 'src/app/types/room';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  user: IUser | null = null;
  myBookings: any[] = [];
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
      this.roomService.getUserBookings(user.token).subscribe((res) => {
        this.myBookings = res.data;
        console.log(res.data);
      });
    }
  }

  onCancelBooking(bookingId: string, hotelId: string) {
    this.roomService
      .cancelMyBooking(bookingId, hotelId, this.user!.token)
      .subscribe((res: any) => {
        this.roomService
          .getBookings(this.user!.token)
          .subscribe((rooms: any) => {
            this.myBookings = [];
            this.myBookings.push(...rooms.data);
          });
      });
  }
}
