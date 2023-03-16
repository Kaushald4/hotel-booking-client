import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BookingComponent } from './components/booking/booking.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { EditRoomComponent } from './components/edit-room/edit-room.component';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: HomeComponent },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
  },
  {
    path: 'bookings/:userId',
    canActivate: [AuthGuard],
    component: BookingComponent,
  },
  {
    path: 'add/room',
    canActivate: [AuthGuard],
    component: AddRoomComponent,
  },

  {
    path: 'edit/room/:roomId',
    canActivate: [AuthGuard],
    component: EditRoomComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
