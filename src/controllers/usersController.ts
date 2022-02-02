import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UsersController {
  public async register(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      //Check if user already exists in DB
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ success: false, msg: "User already exists" });
      }

      user = new User({ email, password });
      //Password encryption
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      //Save user in DB
      await user.save();

      //JWT
      const payload = {
        user: {
          id: user._id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWTSECRET!,
        { expiresIn: 3600000 },
        (err, encoded) => {
          if (err) {
            return res.status(400).json({ success: false, msg: "JWT error" });
          }

          return res.header("auth-token", encoded).json({ encoded });
        }
      );
    } catch (e) {
      console.log(e as Error);
    }
  }
}

export const usersController = new UsersController();
