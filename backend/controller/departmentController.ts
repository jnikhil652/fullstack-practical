import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { isEmpty } from "lodash";
import md5 from "md5";
import prisma from "../utils/db";

export default class DepartmentController {
  static async add(req: Request, res: Response) {
    try {
      const { name } = req.body;
      await prisma.department.create({ data: { name } });
      return res.send({ msg: "department added successfully" });
    } catch (error) {
      console.log("ERROR : ", req.originalUrl, " => ", error);
      return res.status(500).send({ msg: "SOMETHING WENT WRONG!" });
    }
  }
  static async edit(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.department.update({
        where: {
          id: parseInt(id),
        },
        data: req.body,
      });
      return res.send({ msg: "department updated successfully" });
    } catch (error) {
      console.log("ERROR : ", req.originalUrl, " => ", error);
      return res.status(500).send({ msg: "SOMETHING WENT WRONG!" });
    }
  }
  static async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.department.update({
        where: {
          id: parseInt(id),
        },
        data: { is_delete: 1 },
      });
      return res.send({ msg: "department updated successfully" });
    } catch (error) {
      console.log("ERROR : ", req.originalUrl, " => ", error);
      return res.status(500).send({ msg: "SOMETHING WENT WRONG!" });
    }
  }
  static async get(req: Request, res: Response) {
    try {
      const { id } = req.params;
      let data = prisma.department.findFirst({
        where: { id: parseInt(id), is_delete: 0 },
      });
      return res.send({ msg: "department fetched successfully", data });
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

      let data = await prisma.department.findMany({
        where: {
          is_delete: 0,
        },
        skip: parseInt(limit),
        take: parseInt(to),
        orderBy: {
          [sortBy]: order,
        },
      });
      return res.send({ msg: "department updated successfully", data });
    } catch (error) {
      console.log("ERROR : ", req.originalUrl, " => ", error);
      return res.status(500).send({ msg: "SOMETHING WENT WRONG!" });
    }
  }
}
