import { Request, Response, NextFunction } from "express";

class IndexController {
  public index(req: Request, res: Response, next: NextFunction) {
    res.send("Home page!");
  }
}

export const indexController = new IndexController();
