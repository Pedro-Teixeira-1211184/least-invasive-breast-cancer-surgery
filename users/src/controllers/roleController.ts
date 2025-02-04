import {Request, Response, NextFunction} from 'express';
import {Inject, Service} from 'typedi';
import config from "../../config";

import IRoleController from "./IControllers/IRoleController";
import IRoleService from '../services/IServices/IRoleService';
import IRoleDTO from '../dto/IRoleDTO';

import {Result} from "../core/logic/Result";
import {ParamsDictionary} from 'express-serve-static-core';
import {ParsedQs} from 'qs';

@Service()
export default class RoleController implements IRoleController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.role.name) private roleServiceInstance: IRoleService
    ) {
    }

    public async getRoleByName(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const roleName = req.params.name;
            const role = await this.roleServiceInstance.getRoleByName(roleName) as Result<IRoleDTO>;
            if (role.isFailure) {
                return res.status(404).json(role.errorValue());
            }
            return res.status(200).json(role.getValue());
        } catch (e) {
            return next(e);
        }
    }

    public async createRole(req: Request, res: Response, next: NextFunction) {
        try {

            console.log("Creating role");

            const roleOrError = await this.roleServiceInstance.createRole(req.body as IRoleDTO) as Result<IRoleDTO>;

            if (roleOrError.isFailure) {
                return res.status(402).json(roleOrError.errorValue());
            }

            const roleDTO = roleOrError.getValue();
            return res.json(roleDTO).status(201);
        } catch (e) {
            return next(e);
        }
    };

    public async updateRole(req: Request, res: Response, next: NextFunction) {
        try {
            const roleOrError = await this.roleServiceInstance.updateRole(req.body as IRoleDTO) as Result<IRoleDTO>;

            if (roleOrError.isFailure) {
                return res.status(404).send();
            }

            const roleDTO = roleOrError.getValue();
            return res.status(201).json(roleDTO);
        } catch (e) {
            return next(e);
        }
    };

    public async listRoles(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("Getting roles");
            const roles = await this.roleServiceInstance.listRoles() as Result<Array<IRoleDTO>>;
            if (roles.isFailure) {
                return res.status(404).send();
            }
            return res.status(200).json(roles.getValue());
        } catch (e) {
            return next(e);
        }
    }
}
