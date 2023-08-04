
import * as path from 'path';
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ExpressJoiError } from 'express-joi-validation'

import AuthRouter from "~/routers/auth.router";
import UsersRouter from "~/routers/users.router";
import FoodsRouter from "~/routers/foods.router";
import CategoriesRouter from "~/routers/categories.router";
import ChildrenRouter from "~/routers/children.router";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', AuthRouter);
app.use('/users', UsersRouter);
app.use('/foods', FoodsRouter);
app.use('/categories', CategoriesRouter);
app.use('/children', ChildrenRouter);

app.use((err: any|ExpressJoiError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err) {
    res.status(400).json({
      type: err.type,
      message: err.error.toString()
    });
  } else {
    res.status(500).json({
      message: "Internal server error"
    });
  }
})

export default app;