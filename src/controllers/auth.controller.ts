import { RequestHandler, Request, Response } from 'express';
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from '~/models/user.model';
dotenv.config();

interface RequestWithUser extends Request {
  user?: any,
}

const parseJwt = (token: string) => {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

export const getLoggedInUser: RequestHandler = async (req: RequestWithUser, res: Response) => {
  try {
      const payload = parseJwt(req.headers["x-auth-token"] as string);
      const userId = payload?.user?.id;
      if (userId) {
        const user = await User.findById(userId).select({ password: 0 });
        res.json(user);
      }
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    }
};

export const authenticateUser: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log("authenticate user", email, password);
  
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const payload = {
      user: {
        id: user.id
      }
    };
    const jwtSecret = process.env.JWT_SECRET as Secret;
    jwt.sign(
      payload,
      jwtSecret,
      {
        expiresIn: 360000
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
