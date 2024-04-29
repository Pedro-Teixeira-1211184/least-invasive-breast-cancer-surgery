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

    const modelController = {
        name: config.controllers.model.name,
        path: config.controllers.model.path
    }

    const modelRepo = {
        name: config.repos.model.name,
        path: config.repos.model.path
    }

    const modelService = {
        name: config.services.model.name,
        path: config.services.model.path
    }

    await dependencyInjectorLoader({
        mongoConnection,
        schemas: [
            modelSchema
        ],
        controllers: [
            modelController
        ],
        repos: [
            modelRepo
        ],
        services: [
            modelService
        ]
    });
    Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

    await expressLoader({app: expressApp});
    Logger.info('✌️ Express loaded');
};
