import http from 'http';
import app from './express';

const server = http.createServer(app);

export default server;
