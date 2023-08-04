import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface RequestWithUser extends Request {
  user?: any,
}

export default (req: RequestWithUser, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");
  const jwtSecret = process.env.JWT_SECRET as Secret;

  if (!token) {
    return res.status(401).json({ message: "No token, Authorization Denied" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload;
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};