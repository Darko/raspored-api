import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import boom from 'express-boom';
import config from './environment';

const app = express();

if (config.env !== 'production') {
  app.use(morgan('dev'));
}

app.use(cors());
app.enable('trust proxy');
app.use(boom());

export default app;