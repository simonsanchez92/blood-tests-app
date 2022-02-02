import { Schema, model } from "mongoose";

interface IUser {
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "You must enter a valid email",
    ],
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = model<IUser>("User", UserSchema);
