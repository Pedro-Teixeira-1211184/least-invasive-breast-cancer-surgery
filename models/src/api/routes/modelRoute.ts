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
      cb(null, 'Files');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

  const upload = multer({storage: storage});

  // Route for uploading a single .obj file
  route.post('/', upload.single('file'), (req, res) => {
    // Handle file processing/storage here
    // @ts-ignore
    console.log(req.file);
    res.status(200).json({message: 'File uploaded successfully'});
  });

  // download model by its id
  route.get('/:id',
    celebrate({
      params: Joi.object({
        id: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.downloadModel(req, res, next));
};
