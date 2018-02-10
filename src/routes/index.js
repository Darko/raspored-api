import app from '../config/express';
import config from '../config/environment';
import publicRouter from './public';
import adminRouter from './admin';
import authRouter from '../modules/auth/index';

const publicRoutes = config.public;
const publicBase = `${publicRoutes.base}/v${publicRoutes.version}`;

const adminRoutes = config.admin;
const adminBase = `${adminRoutes.base}/v${adminRoutes.version}`;

// Status
app.get('/', (req, res) => res.send({
  statusCode: 200,
  message: '👋'
}));

app.get('/status', (req, res) => res.sendStatus(200));

// Endpoints
app.use(publicBase, publicRouter);
app.use(adminBase, adminRouter);

app.use('/auth', authRouter);

// 404
app.route('/*').get((req, res) => res.boom.notFound());

export default app;
