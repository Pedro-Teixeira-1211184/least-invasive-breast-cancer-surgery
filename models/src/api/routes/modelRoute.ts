import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';
import multer from 'multer';

import {Container} from 'typedi';
import IModelController from '../../controllers/IControllers/IModelController';

import config from "../../../config";

const route = Router();

export default (app: Router) => {
    app.use('/models', route);

    const ctrl = Container.get(config.controllers.model.name) as IModelController;

    const path = require('path');
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads');
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    });

    // Define file filter to accept only .obj files
    const fileFilter = (req, file, cb) => {
        const filetypes = /obj/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only .obj files are allowed!'), false);
        }
    };

    // Configure multer with storage and file filter
    const upload = multer({
        storage: storage,
        fileFilter: fileFilter
    });

    // Route for uploading a single .obj file
    route.post('/', upload.single('file'), celebrate({
            body: Joi.object({
                patientId: Joi.string().required(),
                description: Joi.string().required()
            }),
        }),
        (req, res, next) =>
            ctrl.uploadModel(req, res, next));

    // download model by its id
    route.get('/:id',
        celebrate({
            params: Joi.object({
                id: Joi.string().required()
            })
        }),
        (req, res, next) =>
            ctrl.downloadModel(req, res, next));


    // get all models
    route.get('/',
        (req, res, next) =>
            ctrl.getAllModels(req, res, next));

    // get model by patient id
    route.get('/patient/:id',
        celebrate({
            params: Joi.object({
                id: Joi.string().required()
            })
        }),
        (req, res, next) =>
            ctrl.getModelByPatientId(req, res, next));

    // delete model by id
    route.delete('/:id',
        celebrate({
            params: Joi.object({
                id: Joi.string().required()
            })
        }),
        (req, res, next) =>
            ctrl.deleteModel(req, res, next));

    // get doctor's models
    route.get('/doctor/:id',
        celebrate({
            params: Joi.object({
                id: Joi.string().required()
            })
        }),
        (req, res, next) =>
            ctrl.getModelsByDoctorId(req, res, next));

    route.get('/imagiologist/:id',
        celebrate({
            params: Joi.object({
                id: Joi.string().required()
            })
        }),
        (req, res, next) =>
            ctrl.getModelsByImagiologistId(req, res, next));

    // model permission routes
    route.post('/permission',
        celebrate({
            body: Joi.object({
                doctorId: Joi.string().required(),
                imagiologistId: Joi.string(),
                modelId: Joi.string().required()
            })
        }),
        (req, res, next) =>
            ctrl.createModelPermission(req, res, next));

    route.delete('/permission/:id', celebrate({
        params: Joi.object({
            id: Joi.string().required()
        })
    }), (req, res, next) => ctrl.deleteModelPermissionByModelId(req, res, next));
};
