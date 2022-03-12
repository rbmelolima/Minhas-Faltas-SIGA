import express from 'express';
import { getParcialAbsences } from '../usecases/webscrapper.mjs';

const routes = express.Router();

routes.post('/faltas-parciais', getParcialAbsences);

export { routes };