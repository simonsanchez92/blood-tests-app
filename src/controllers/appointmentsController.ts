import { Request, Response, NextFunction } from "express";
import { Appointment, IAppointment } from "../models/Appointment";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generator } from "../utils/timeGenerator";

class AppointmentsController {
  public async generateOne(req: Request, res: Response, next: NextFunction) {
    const { day } = req.body;
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
      Appointment.insertMany(dayAppointments, {}, function (error, docs) {
        return res.status(200).json({
          msg: "Success",
          appointment: docs,
        });
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
}

export const appointmentsController = new AppointmentsController();
