import {Router, Request, Response, NextFunction} from 'express';
import {Container} from 'typedi';

import AuthService from '../../services/userService';
import {IUserDTO} from '../../dto/IUserDTO';

import middlewares from '../middlewares';
import {celebrate, Joi} from 'celebrate';
import winston = require('winston');
import config from "../../../config";
import IRoleController from "../../controllers/IControllers/IRoleController";
import IUserControllerOnion from "../../controllers/IControllers/IUserControllerOnion";
import {IPatientDTO} from "../../dto/IPatientDTO";

var user_controller = require('../../controllers/userController');

const route = Router();

export default (app: Router) => {

    // AUTH PATH

    const ctrl = Container.get(config.controllers.user.name) as IUserControllerOnion;

    app.use('/auth', route);

    route.post(
        '/signup',
        celebrate({
            body: Joi.object({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
                role: Joi.string().required()
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            const logger = Container.get('logger') as winston.Logger;
            logger.debug('Calling Sign-Up endpoint with body: %o', req.body)
            console.log("Creating a User!");

            try {
                const authServiceInstance = Container.get(AuthService);
                const userOrError = await authServiceInstance.SignUp(req.body as IUserDTO);

                if (userOrError.isFailure) {
                    logger.debug(userOrError.errorValue())
                    return res.status(401).send(userOrError.errorValue());
                }

                const {userDTO, token} = userOrError.getValue();

                return res.status(201).json({userDTO, token});
            } catch (e) {
                //logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );

    route.post(
        '/signup/patient',
        celebrate({
            body: Joi.object({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
                role: Joi.string().required(),
                //must be 9 numbers
                sns: Joi.number().min(100000000).max(999999999).required(),
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            const logger = Container.get('logger') as winston.Logger;
            logger.debug('Calling Sign-Up endpoint with body: %o', req.body)
            console.log("Creating a Patient!");

            try {
                const authServiceInstance = Container.get(AuthService);
                const userOrError = await authServiceInstance.SignUpPatient(req.body as IPatientDTO);

                if (userOrError.isFailure) {
                    logger.debug(userOrError.errorValue())
                    return res.status(401).send(userOrError.errorValue());
                }

                const {userDTO, token} = userOrError.getValue();

                return res.status(201).json({userDTO, token});
            } catch (e) {
                //logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );

    route.post(
        '/signin',
        celebrate({
            body: Joi.object({
                email: Joi.string().required(),
                password: Joi.string().required(),
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            const logger = Container.get('logger') as winston.Logger;
            logger.debug('Calling Sign-In endpoint with body: %o', req.body)
            try {
                const {email, password} = req.body;
                const authServiceInstance = Container.get(AuthService);
                const result = await authServiceInstance.SignIn(email, password);

                if (result.isFailure)
                    return res.json().status(403);

                const {userDTO, token} = result.getValue();
                return res.json({userDTO, token}).status(200);

            } catch (e) {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );

    route.post(
        '/signin/patient',
        celebrate({
            body: Joi.object({
                email: Joi.string().required(),
                password: Joi.string().required(),
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            const logger = Container.get('logger') as winston.Logger;
            logger.debug('Calling Sign-In endpoint with body: %o', req.body)
            try {
                const {email, password} = req.body;
                const authServiceInstance = Container.get(AuthService);
                const result = await authServiceInstance.SignInPatient(email, password);

                if (result.isFailure)
                    return res.json().status(403);

                const {userDTO, token} = result.getValue();
                return res.json({userDTO, token}).status(200);

            } catch (e) {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );

    /**
     * @TODO Let's leave this as a place holder for now
     * The reason for a logout route could be deleting a 'push notification token'
     * so the device stops receiving push notifications after logout.
     *
     * Another use case for advance/enterprise apps, you can store a record of the jwt token
     * emitted for the session and add it to a black list.
     * It's really annoying to develop that but if you had to, please use Redis as your data store
     */
    route.post('/logout', middlewares.isAuth, (req: Request, res: Response, next: NextFunction) => {
        const logger = Container.get('logger') as winston.Logger;
        logger.debug('Calling Sign-Out endpoint with body: %o', req.body)
        try {
            //@TODO AuthService.Logout(req.user) do some clever stuff
            return res.status(200).end();
        } catch (e) {
            logger.error('🔥 error %o', e);
            return next(e);
        }
    });

    route.post('/request', celebrate({
            body: Joi.object({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required()
            }),
        }), async (req: Request, res: Response, next: NextFunction) => {
            console.log("Creating a User Request!");
            ctrl.signUpRequest(req, res, next);
        }
    );

    route.post('/request/patient', celebrate({
            body: Joi.object({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
                sns: Joi.number().min(100000000).max(999999999).required(),
            }),
        }), async (req: Request, res: Response, next: NextFunction) => {
            console.log("Creating a Patient Request!");
            ctrl.signUpPatientRequest(req, res, next);
        }
    );

    route.get('/request', async (req: Request, res: Response, next: NextFunction) => {
            console.log("Getting all User Requests!");
            ctrl.getAllUserRequests(req, res, next);
        }
    );

    route.get('/request/patient', async (req: Request, res: Response, next: NextFunction) => {
            console.log("Getting all Patient Requests!");
            ctrl.getAllPatientRequests(req, res, next);
        }
    );

    route.delete('/request/:email', async (req: Request, res: Response, next: NextFunction) => {
            console.log("Deleting a User Request!");
            ctrl.deleteUserRequest(req, res, next);
        }
    );

    route.delete('/request/patient/:email', async (req: Request, res: Response, next: NextFunction) => {
            console.log("Deleting a Patient Request!");
            ctrl.deletePatientRequest(req, res, next);
        }
    );

    // PATIENTS PATH

    route.get('/patient', (req: Request, res: Response, next: NextFunction) => ctrl.getAllPatients(req, res, next));

    route.get('/patient/:id', (req: Request, res: Response, next: NextFunction) => ctrl.getPatientById(req, res, next));

    // USERS PATH

    route.get('/user', (req: Request, res: Response, next: NextFunction) => ctrl.getAllUsers(req, res, next));

    route.get('/user/role/:id', (req: Request, res: Response, next: NextFunction) => ctrl.getUsersByRoleId(req, res, next));

    route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, user_controller.getMe);
};
