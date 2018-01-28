import mongoose from 'mongoose';
import Bluebird from 'bluebird';
import config from './environment';

const { mongo } = config;

mongoose.Promise = Bluebird;
mongoose.set('debug', config.env === 'development');

const start = Date.now();

function onDisconnected() {
  logger.error('Mongoose connection disconnected');
}

console.info('Connecting to MongoDB', mongo.options);
mongoose.connect(mongo.uri, mongo.options)
.then(() => {
  console.info('Connected to MongoDB', { completed: `${Date.now() - start}ms` });
})
.catch((error) => {
  console.error(error, 'Failed to connect to MongoDB');
  process.exit(-1);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', onDisconnected);

export default mongoose;