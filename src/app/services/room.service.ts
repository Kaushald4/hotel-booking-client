import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRoomData, IRoomResponse, IRoomsResponse } from '../types/room';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  apiUrl = 'https://hotel-booking-backend-production.up.railway.app/api/v1';

  constructor(private http: HttpClient) {}

  createHotelRoom(roomData: any, token: string): Observable<any> {
    const headerOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post<any>(
      `${this.apiUrl}/room/create`,
      roomData,
      headerOptions
    );
  }

  getRooms(token: string): Observable<IRoomsResponse> {
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get<IRoomsResponse>(
      `${this.apiUrl}/room/get`,
      headerOptions
    );
  }

  getRoomByID(roomId: string, token: string): Observable<IRoomResponse> {
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get<IRoomResponse>(
      `${this.apiUrl}/room/get/${roomId}`,
      headerOptions
    );
  }

  updateRoom(roomId: string, roomData: any, token: string): Observable<any> {
    const headerOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.put<any>(
      `${this.apiUrl}/room/update/${roomId}`,
      roomData,
      headerOptions
    );
  }

  deleteRoom(roomId: string, token: string): Observable<any> {
    const headerOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.delete<any>(
      `${this.apiUrl}/room/delete/${roomId}`,
      headerOptions
    );
  }

  //----------------------------------------  USER ACTIONs --------------------------------------------
  // bookings
  createBooking(bookingData: any, token: string): Observable<any> {
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post<any>(
      `${this.apiUrl}/room/book`,
      bookingData,
      headerOptions
    );
  }

  // get bookings
  getBookings(token: string): Observable<any> {
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get(`${this.apiUrl}/room/bookings`, headerOptions);
  }

  //approve booking
  approveBooking(bookingId: string, token: string): Observable<any> {
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.patch(
      `${this.apiUrl}/room/booking/approve/${bookingId}`,
      {},
      headerOptions
    );
  }

  // reject booking
  rejectBooking(
    bookingId: string,
    hotelId: string,
    token: string
  ): Observable<any> {
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.delete(
      `${this.apiUrl}/room/booking/reject/${bookingId}/${hotelId}`,
      headerOptions
    );
  }

  // get user bookings
  getUserBookings(token: string): Observable<any> {
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get(`${this.apiUrl}/room/bookings/me`, headerOptions);
  }

  cancelMyBooking(
    bookingId: string,
    hotelId: string,
    token: string
  ): Observable<any> {
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.delete(
      `${this.apiUrl}/room/bookings/cancel/${bookingId}/${hotelId}`,
      headerOptions
    );
  }
}
