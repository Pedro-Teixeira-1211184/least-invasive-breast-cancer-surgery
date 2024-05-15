import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({expressApp}) => {
    const mongoConnection = await mongooseLoader();
    Logger.info('✌️ DB loaded and connected!');

    const userSchema = {
        // compare with the approach followed in repos and services
        name: 'userSchema',
        schema: '../persistence/schemas/userSchema',
    };

    const roleSchema = {
        // compare with the approach followed in repos and services
        name: 'roleSchema',
        schema: '../persistence/schemas/roleSchema',
    };

    const signUpRequestSchema = {
        // compare with the approach followed in repos and services
        name: 'signUpRequestSchema',
        schema: '../persistence/schemas/signUpRequestSchema',
    }

    const signUpRequestPatientSchema = {
        // compare with the approach followed in repos and services
        name: 'signUpRequestPatientSchema',
        schema: '../persistence/schemas/signUpRequestPatientSchema',
    }

    const patientSchema = {
        // compare with the approach followed in repos and services
        name: 'patientSchema',
        schema: '../persistence/schemas/patientSchema',
    }

    const roleController = {
        name: config.controllers.role.name,
        path: config.controllers.role.path
    }

    const userControllerOnion = {
        name: config.controllers.user.name,
        path: config.controllers.user.path
    }

    const roleRepo = {
        name: config.repos.role.name,
        path: config.repos.role.path
    }

    const userRepo = {
        name: config.repos.user.name,
        path: config.repos.user.path
    }

    const signUpRequestRepo = {
        name: config.repos.signUpRequest.name,
        path: config.repos.signUpRequest.path
    }

    const roleService = {
        name: config.services.role.name,
        path: config.services.role.path
    }

    const userServiceOnion = {
        name: config.services.user.name,
        path: config.services.user.path
    }

    await dependencyInjectorLoader({
        mongoConnection,
        schemas: [
            userSchema,
            roleSchema,
            signUpRequestSchema,
            patientSchema,
            signUpRequestPatientSchema
        ],
        controllers: [
            roleController,
            userControllerOnion
        ],
        repos: [
            roleRepo,
            userRepo,
            signUpRequestRepo
        ],
        services: [
            roleService,
            userServiceOnion
        ]
    });
    Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

    await expressLoader({app: expressApp});
    Logger.info('✌️ Express loaded');
};
