import { Request, Response, NextFunction } from "express";
import { Appointment, IAppointment } from "../models/Appointment";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generator } from "../utils/timeGenerator";
import { User } from "../models/User";

class AppointmentsController {
  public async generateOne(req: Request, res: Response, next: NextFunction) {
    const { day } = req.body;

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (new Date(day) < now) {
      return res.status(200).json({
        success: false,
        msg: "Date cannot be in the past",
      });
    }

    const timeSlots = generator(10);
    let dayAppointments: IAppointment[] = [];

    for (let i = 0; i < timeSlots.length; i++) {
      let theDate = new Date(day);
      theDate.setHours(timeSlots[i].h);
      theDate.setMinutes(timeSlots[i].m);

      dayAppointments.push(
        new Appointment({
          date: theDate,
          userId: null,
        })
      );
    }

    try {
      const insertedDocs = await Appointment.insertMany(dayAppointments);

      return res.status(200).json({
        msg: "Success",
        appointment: insertedDocs,
      });
    } catch (e) {
      console.error(e as Error);
    }
  }

  public async getAppointments(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const appointments: IAppointment[] = await Appointment.find();
      res.json({
        msg: "Success",
        appointments,
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async makeAppointment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const userId = req.body.userId;
    const appointmentId = req.params.appointmentId;

    const user = await User.findById(userId);
    const appointment = await Appointment.findById(appointmentId);

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User does not exist",
      });
    }

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, msg: "Appointment does not exist" });
    }

    if (appointment?.userId !== null) {
      return res.status(400).json({
        success: false,
        msg: "Appointment already taken",
      });
    }

    try {
      const updatedAppointment = await Appointment.findOneAndUpdate(
        { _id: appointment._id },
        { userId: user._id },
        { new: true }
      );

      res.status(200).json({
        success: true,
        updatedAppointment,
      });
    } catch (e) {
      console.error(e);
    }
  }
}

export const appointmentsController = new AppointmentsController();
