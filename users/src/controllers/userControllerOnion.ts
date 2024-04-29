import {Request, Response, NextFunction} from 'express';
import {Inject, Service} from 'typedi';
import config from "../../config";

import IUserControllerOnion from "./IControllers/IUserControllerOnion";
import {IUserDTO} from "../dto/IUserDTO";
import IUserServiceOnion from "../services/IServices/IUserServiceOnion";
import {Result} from "../core/logic/Result";
import {ISignUpRequestDTO} from "../dto/ISignUpRequestDTO";

@Service()
export default class UserControllerOnion implements IUserControllerOnion /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.user.name) private userServiceInstance: IUserServiceOnion
  ) {
  }

  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Getting users");

      const users = await this.userServiceInstance.getAllUsers() as Result<Array<IUserDTO>>;
      if (users.isFailure) {
        return res.status(404).json(users.errorValue());
      }
      return res.status(200).json(users.getValue());
    } catch (e) {
      return next(e);
    }
  }

  public async deleteUserRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.params.email;
      const sucOrError = await this.userServiceInstance.deleteUserRequest(email);
      if (sucOrError.isFailure) {
        return res.status(403).json(sucOrError.errorValue());
      }
      const deleted = sucOrError.getValue();
      return res.status(200).json({deleted, message: "Request deleted"});
    } catch (e) {
      return next(e);
    }
  }

  public async getAllUserRequests(req: Request, res: Response, next: NextFunction) {
    try {
      const userRequestsOrError = await this.userServiceInstance.getAllUserRequests() as Result<ISignUpRequestDTO[]>;
      if (userRequestsOrError.isFailure) {
        return res.status(403).json(userRequestsOrError.errorValue());
      }
      return res.status(200).json(userRequestsOrError.getValue());
    } catch (e) {
      return next(e);
    }
  }

  public async signUpRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const userOrError = await this.userServiceInstance.signUpRequest(req.body as ISignUpRequestDTO) as Result<ISignUpRequestDTO>;
      if (userOrError.isFailure) {
        console.log(userOrError.errorValue());
        return res.status(403).json(userOrError.errorValue());
      }

      const userDTO = userOrError.getValue();
      return res.status(201).json(userDTO);
    } catch (e) {
      return next(e);
    }
  }

}
