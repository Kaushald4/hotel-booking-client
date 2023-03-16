import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css'],
})
export class AddRoomComponent implements OnInit {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() price: number = 0;
  @Input() offeredPrice: number = 0;
  @Input() manager: string = '';
  @Input() files: any[] = [];

  isLoading: boolean = false;
  users: any[] = [];
  rooms: any[] = [];

  constructor(
    private authService: AuthService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    let user: any = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);

      this.authService.getAllUsers(user.token).subscribe((users: any) => {
        this.users.push(...users.data);
      });
    }
  }

  onFileSelected(event: any) {
    this.files.push(...event.target.files);
  }

  onClick() {
    let user: any = localStorage.getItem('user');
    if (user) {
      this.isLoading = true;
      user = JSON.parse(user);
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('price', this.price.toString());
      formData.append('offeredPrice', this.offeredPrice.toString());
      formData.append('manager', this.manager);
      this.files.forEach((file) => {
        formData.append('room_photos', file);
      });

      this.roomService
        .createHotelRoom(formData, user.token)
        .subscribe((room: any) => {
          // fetch rooms
          this.roomService.getRooms(user.token).subscribe((rooms: any) => {
            this.rooms.push(...rooms.data);
            this.isLoading = false;
            this.description = '';
            this.title = '';
            this.price = 0;
            this.offeredPrice = 0;
            this.manager = '';
            this.files = [];
          });
        });
    }
  }
}
