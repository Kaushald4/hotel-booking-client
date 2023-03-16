import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';
import { IUser } from 'src/app/types/authUser';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css'],
})
export class EditRoomComponent implements OnInit {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() price: number = 0;
  @Input() offeredPrice: number = 0;
  @Input() manager: string = '';
  @Input() files: any[] = [];

  hotelRoomId = '';
  users: IUser[] = [];
  isLoading = false;

  constructor(
    private authService: AuthService,
    private roomService: RoomService,
    private router: ActivatedRoute,
    private navigateRouter: Router
  ) {}

  ngOnInit(): void {
    let user: any = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      this.authService.getAllUsers(user.token).subscribe((users: any) => {
        this.users.push(...users.data);
      });

      this.router.params.subscribe((val: any) => {
        this.hotelRoomId = val.roomId;
        this.roomService
          .getRoomByID(val.roomId, user.token)
          .subscribe((room: any) => {
            this.title = room.data[0].title;
            this.description = room.data[0].description;
            this.price = room.data[0].price;
            this.offeredPrice = room.data[0].offeredPrice;
            this.manager = room.data[0].manager;
          });
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
        .updateRoom(this.hotelRoomId, formData, user.token)
        .subscribe((room: any) => {
          // fetch rooms
          this.navigateRouter.navigate(['/']);
          this.roomService.getRooms(user.token).subscribe((rooms: any) => {
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
