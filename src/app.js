import server from './config/server';
import mongo from './config/mongo';

import './config/express';
import './routes';

server.listen(5000, () => console.log('Running at http://localhost:5000/'));

export default server;