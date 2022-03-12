import express from 'express';
import { routes } from '../routes/routes.mjs';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

let port = process.env.PORT || 3000;

app.listen(
  port, () => console.log(`Running on port ${ port }`)
);
