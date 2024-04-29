import {Router} from 'express';
import model from './routes/modelRoute';

export default () => {
    const app = Router();

    model(app)

    return app
}