import app from '../config/express';
import config from '../config/environment';
import publicRouter from './public';

const publicRoutes = config.public;
const publicBase = `${publicRoutes.base}/v${publicRoutes.version}`;

// Status
app.get('/', (req, res) => res.json({
  statusCode: 200,
  message: '👋'
}));

app.get('/status', (req, res) => res.sendStatus(200));

// Endpoints
app.use(publicBase, publicRouter);

// 404
app.route('/*').get((req, res) => res.boom.notFound());

export default app;
