import express from 'express';
import { getParcialAbsences } from './webscrapper.mjs';

const routes = express.Router();

routes.post('/faltas-parciais', getParcialAbsences);

export { routes };