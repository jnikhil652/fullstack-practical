import { Request, Response } from "express";
import jwt, { Jwt } from "jsonwebtoken";
import LocalDB from "../utils/db";
import { isEmpty } from "lodash";
import md5 from "md5";
import prisma from "../utils/db";

export default class EmployeeController {
  static async get(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findFirst({
        where: { id: parseInt(id), is_delete: 0 },
      });

      return res.send({ msg: "data retrieved successfully", data: user });
    } catch (error) {
      console.log("ERROR : ", req.originalUrl, " => ", error);
      return res.status(500).send({ msg: "SOMETHING WENT WRONG!" });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const {
        limit = "0",
        to = "100",
        sortBy = "name",
        order = "asc",
      } = req.query as {
        limit?: string;
        to?: string;
        sortBy?: string;
        order?: string;
      };

      const users = await prisma.user.findMany({
        where: { is_delete: 0, type: "EMPLOYEE" },
        skip: parseInt(limit),
        take: parseInt(to),
        orderBy: {
          [sortBy]: order,
        },
      });

      return res.send({
        msg: "all employees retrieved successfully",
        data: users,
      });
    } catch (error) {
      console.log("ERROR : ", req.originalUrl, " => ", error);
      return res.status(500).send({ msg: "SOMETHING WENT WRONG!" });
    }
  }
  static async assign(req: Request, res: Response) {
    try {
      const { departmentId, id } = req.body;

      await prisma.user.update({
        where: { id },
        data: {
          departmentId: parseInt(departmentId),
        },
      });
      return res.send({
        msg: "department assigned successfully",
      });
    } catch (error) {
      console.log("ERROR : ", req.originalUrl, " => ", error);
      return res.status(500).send({ msg: "SOMETHING WENT WRONG!" });
    }
  }
}
