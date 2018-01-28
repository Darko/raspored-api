const config = {
  env: 'development',

  api: 'http://localhost:5000',
  frontEnd: 'http://localhost:19000',

  cors: {
    origin: ['http://localhost:19000']
  },

  mongo: {
    name: 'UniSchedule',
    uri: 'mongodb://localhost/UniSchedule',
    options: {
      autoIndex: true,
      bufferCommands: true,
      bufferMaxEntries: Infinity
    }
  },

  public: {
    base: '/public',
    version: 1
  }
}

export default config;