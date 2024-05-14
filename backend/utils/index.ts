import { NextFunction, Request, Response } from "express";
import Jwt, { JwtPayload, Secret } from "jsonwebtoken";

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
      (req as CustomRequest).user = data?.user;
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
    const user = (req as CustomRequest).user as JwtPayload;
    console.log({ user });

    if (user.type !== "MANAGER") {
      return res.status(403).send("Unauthorised access");
    }
    next();
  } catch (error) {
    return res.status(403).send("Unauthorised access");
  }
};
