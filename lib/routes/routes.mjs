import express from 'express';
import { getParcialAbsences } from '../usecases/webscrapper.mjs';

const routes = express.Router();

routes.post('/faltas-parciais', getParcialAbsences);

routes.post('/', (req, res) => res.send('Bem vindo ao raspador de faltas do SIGA!'));

export { routes };