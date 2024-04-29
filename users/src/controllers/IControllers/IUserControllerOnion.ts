import { Request, Response, NextFunction } from 'express';
import {IUserDTO} from "../../dto/IUserDTO";

export default interface IUserControllerOnion  {
  getAllUsers(req: Request, res: Response, next: NextFunction);
  signUpRequest(req: Request, res: Response, next: NextFunction);
  getAllUserRequests(req: Request, res: Response, next: NextFunction);
  deleteUserRequest(req: Request, res: Response, next: NextFunction);
}
