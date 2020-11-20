import express, { request } from 'express';

import PointController from './controllers/PointController';
import ItemController from './controllers/ItemController';
import UserController from './controllers/UserController';

const routes = express.Router();

const pointController = new PointController;
const itemController = new ItemController;
const userController = new UserController;

routes.get('/Users', userController.read);

//Request Params
routes.get('/Users/:id', userController.readById);

//Request Body
routes.post('/Users', userController.create);

routes.get('/Items', itemController.index);

routes.post('/Points', pointController.create);

routes.get('/Points', pointController.index);
routes.get('/Points/:id', pointController.show);



export default routes;