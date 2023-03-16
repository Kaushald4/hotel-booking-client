import { IUser } from './authUser';

export interface IRoom {
  title: string;
  description: string;
  price: number;
  offeredPrice: number;
  manager: IUser;
  createdBy: IUser;
  _id: string;
  isBooked: boolean;
  isPending: boolean;
  photo: [
    {
      id: string;
      url: string;
    }
  ];
}

export interface IRoomData {
  title: string;
  description: string;
  price: number;
  offeredPrice: number;
  manager: IUser;
  createdBy: IUser;
  _id: string;
  photo: any[];
}

export interface IRoomDataResponse {
  data: IRoomData;
  success: Boolean;
}

export interface IRoomResponse {
  data: IRoom;
  success: Boolean;
}

export interface IRoomsResponse {
  data: IRoom[];
  success: Boolean;
}
