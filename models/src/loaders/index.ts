import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({expressApp}) => {
    const mongoConnection = await mongooseLoader();
    Logger.info('✌️ DB loaded and connected!');

    const modelSchema = {
        // compare with the approach followed in repos and services
        name: 'modelSchema',
        schema: '../persistence/schemas/modelSchema',
    }

    const patientSchema = {
        name: 'patientSchema',
        schema: '../persistence/schemas/patientSchema',
    }

    const modelController = {
        name: config.controllers.model.name,
        path: config.controllers.model.path
    }

    const modelRepo = {
        name: config.repos.model.name,
        path: config.repos.model.path
    }

    const userRepo = {
        name: config.repos.user.name,
        path: config.repos.user.path
    }

    const modelService = {
        name: config.services.model.name,
        path: config.services.model.path
    }

    const userService = {
        name: config.services.user.name,
        path: config.services.user.path
    }

    await dependencyInjectorLoader({
        mongoConnection,
        schemas: [
            modelSchema,
            patientSchema
        ],
        controllers: [
            modelController
        ],
        repos: [
            modelRepo,
            userRepo
        ],
        services: [
            modelService,
            userService
        ]
    });
    Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

    await expressLoader({app: expressApp});
    Logger.info('✌️ Express loaded');
};
