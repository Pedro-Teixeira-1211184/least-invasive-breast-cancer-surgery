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

  const upload = multer({dest: 'uploads/'}); // Configuração do multer para lidar com arquivos multipartes

  // Route for uploading a single .obj file
  route.post('/upload', upload.single('objFile'), async (req, res) => {
    try {
      // Check if req.file is defined
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      // File details
      console.log('Uploaded file:', req.file);

      // Handle file processing/storage here
      res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
      console.error('Failed to upload .obj file', error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  });


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
