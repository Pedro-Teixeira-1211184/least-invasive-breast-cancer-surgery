import { Request, Response, NextFunction } from 'express';
import {IUserDTO} from "../../dto/IUserDTO";

export default interface IUserControllerOnion  {
  getAllUsers(req: Request, res: Response, next: NextFunction);
  getAllPatients(req: Request, res: Response, next: NextFunction);
  signUpRequest(req: Request, res: Response, next: NextFunction);
  signUpPatientRequest(req: Request, res: Response, next: NextFunction);
  getAllUserRequests(req: Request, res: Response, next: NextFunction);
  getAllPatientRequests(req: Request, res: Response, next: NextFunction);
  deleteUserRequest(req: Request, res: Response, next: NextFunction);
  deletePatientRequest(req: Request, res: Response, next: NextFunction);
}
