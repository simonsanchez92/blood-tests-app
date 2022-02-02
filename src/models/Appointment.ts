import { ObjectId } from "mongodb";
import { Schema, model, Mongoose } from "mongoose";

export interface IAppointment {
  _id: ObjectId;
  date: Date;
  userId?: ObjectId;
}

const AppointmentSchema = new Schema<IAppointment>({
  date: {
    type: Date,
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: "user",
    required: false,
  },
});

export const Appointment = model<IAppointment>(
  "Appointment",
  AppointmentSchema
);
