import express from 'express';
import {routes} from './routes.mjs';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

const port = 3000;

app.listen(port, () => console.log(`Example app listening on port ${ port }!`));
