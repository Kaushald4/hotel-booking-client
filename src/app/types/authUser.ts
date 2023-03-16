export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  token: string;
}

export interface IAuthData {
  data: IUser;
  success: Boolean;
}

export interface IAuthUsers {
  data: IUser[];
  success: Boolean;
}
