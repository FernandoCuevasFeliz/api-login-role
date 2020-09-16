import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { config } from 'dotenv';

import routes from './routes';

import handleNotFound from './middlewares/notFound.middleware';
import handleError from './middlewares/error.middleware';

config();
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
const corsOptions = {
  // options cors
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api', routes);

// errors
app.use(handleNotFound);
app.use(handleError);

export default app;
