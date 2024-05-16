import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { isEmpty } from "lodash";
import md5 from "md5";
import prisma from "../utils/db";
import { CustomRequest } from "../utils";
import { User } from "@prisma/client";

interface UserWithOptionalPassword extends User {
  password: string;
}
export default class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findFirst({
        where: { email, is_delete: 0 },
      });
      if (isEmpty(user)) {
        return res.status(401).send({ msg: "User not found" });
      }
      if (user.password !== md5(password)) {
        return res.status(401).send({ msg: "Password or Username incorrect" });
      }
      const token: string = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET as string
      );
      return res.send({ msg: "login successful", token });
    } catch (error) {
      console.log("ERROR : ", req.originalUrl, " => ", error);
      return res.status(500).send({ msg: "SOMETHING WENT WRONG!" });
    }
  }

  static async signup(req: Request, res: Response) {
    try {
      console.log({ body: req.body });
      const { email, password, name } = req.body;

      let newPassword = md5(password);
      const user = await prisma.user.create({
        data: {
          email,
          password: newPassword,
          name,
        },
      });
      const token: string = jwt.sign(
        { user },
        process.env.JWT_SECRET as string
      );
      return res.send({ msg: "signup successful", token });
    } catch (error) {
      console.log("ERROR : ", req.originalUrl, " => ", error);
      return res.status(500).send({ msg: "SOMETHING WENT WRONG!" });
    }
  }

  static async me(req: CustomRequest, res: Response) {
    try {
      const user: any = req.user;
      const data = await prisma.user.findFirst({
        where: {
          id: user.id,
        },
        select: {
          id: true,
          email: true,
          name: true,
          type: true,
          departmentId: true,
          is_delete: true,
          department: true,
        },
      });

      return res.json({ msg: "request successful", data });
    } catch (error) {
      console.log("ERROR : ", req.originalUrl, " => ", error);
      return res.status(500).send({ msg: "SOMETHING WENT WRONG!" });
    }
  }
  static async manager(req: CustomRequest, res: Response) {
    try {
      const user: any = req.user;
      const data = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          type: "MANAGER",
        },
      });

      return res.json({ msg: "type changed successfully", data });
    } catch (error) {
      console.log("ERROR : ", req.originalUrl, " => ", error);
      return res.status(500).send({ msg: "SOMETHING WENT WRONG!" });
    }
  }
}
