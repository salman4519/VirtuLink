import { Types } from "mongoose";

export interface IUser {
  _id: string;
  username: string;
  name: string;
  email: string;
  password: string;
  status: "active" | "blocked";
  role: "attendee" | "host" | "admin";
  bio: string;
  gid?:string;
  wallet?:string;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
}