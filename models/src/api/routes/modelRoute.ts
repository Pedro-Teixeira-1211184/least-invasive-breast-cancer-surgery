import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';

import {Container} from 'typedi';
import IModelController from '../../controllers/IControllers/IModelController';

import config from "../../../config";

const route = Router();

export default (app: Router) => {
    app.use('/models', route);

    const ctrl = Container.get(config.controllers.model.name) as IModelController;

    // upload a obj file
    route.post('', (req, res, next) => ctrl.uploadModel(req, res, next));

    // download model by its id
    route.get('/:id',
        celebrate({
            params: Joi.object({
                id: Joi.string().required()
            })
        }),
        (req, res, next) => ctrl.downloadModel(req, res, next));
};