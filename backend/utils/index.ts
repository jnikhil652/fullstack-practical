import { NextFunction, Request, Response } from "express";
import Jwt, { JwtPayload, Secret } from "jsonwebtoken";
import prisma from "./db";
import { isEmpty } from "lodash";

export interface CustomRequest extends Request {
  user: string | JwtPayload;
}
export const middleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string | undefined = req.headers.authorization?.split(" ")[1];
    if (token) {
      const data: any = await Jwt.verify(
        token,
        process.env.JWT_SECRET as Secret
      );
      (req as CustomRequest).user = data?.id;
      next();
    } else {
      return res.status(401).send("Unauthorised access");
    }
  } catch (error) {
    return res.status(401).send("Unauthorised access");
  }
};

export const managerMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userPayload = (req as CustomRequest).user as JwtPayload;

    const user = await prisma.user.findFirst({
      where: {
        id: userPayload.id,
      },
    });

    if (isEmpty(user) || user.type !== "MANAGER") {
      return res.status(403).send("Unauthorised access");
    }
    next();
  } catch (error) {
    return res.status(403).send("Unauthorised access");
  }
};
