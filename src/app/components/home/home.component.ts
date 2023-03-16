import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';
import { IUser } from 'src/app/types/authUser';
import { IRoom } from 'src/app/types/room';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allRooms: IRoom[] = [];
  user: IUser | null = null;

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
      this.roomService.getRooms(user.token).subscribe((rooms: any) => {
        this.allRooms.push(...rooms.data);
        console.log(this.allRooms);
      });
    }
  }

  onDeleteRoom(roomId: string) {
    let user: any = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);

      this.roomService.deleteRoom(roomId, user.token).subscribe((room: any) => {
        this.allRooms = this.allRooms.filter((room) => room._id !== roomId);
      });
    }
  }

  onBookRoom(roomData: any) {
    const date = {
      ...roomData,
      fromDate: new Date(),
      toDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day,
    };
    this.roomService
      .createBooking(date, this.user!.token)
      .subscribe((booking: any) => {
        let udpaetdRooms = this.allRooms.map((room) => {
          if (room._id === roomData.hotelRoomId) {
            room.isPending = true;
          }
          return room;
        });
        this.allRooms = udpaetdRooms;
      });
  }
}
