import { Model } from "mongoose";

export interface IUser {
    _id:string;
  username: string;
  email: string;
  password: string;
  role: 'attendee' | 'host' | 'admin';
  avatar?:string;
  bio?:string;
  phone?:string;
  dob?:string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

export type UserModel = Model<IUser, {}, IUserMethods>;