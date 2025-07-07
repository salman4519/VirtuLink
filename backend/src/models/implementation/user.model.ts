import { hashPassword } from "@/utils/bcrypt.util";
import { model, Schema, Document } from "mongoose";
import { IUser } from "../interface/IUser.model";



export interface IUserModel extends Document, Omit<IUser, "_id"> { }

const userSchema = new Schema<IUserModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
    role: {
      type: String,
      enum: ["attendee", "host","admin"],
      required:true,
    },
    bio: {
      type: String,
      default: '',
    },
    profilePicture: {
      type: String,
    },
    gid: {
        type: String,
    },
    wallet: {
        type: String,
    }
  },
  {
    timestamps: true,

  }
);


userSchema.pre<IUserModel>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password)
  }
  next()
})

const User = model<IUserModel>("User", userSchema);
export default User;