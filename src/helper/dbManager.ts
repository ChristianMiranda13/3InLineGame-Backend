// Libraries
import mongoose from 'mongoose';

// const
import constants from '../config';

mongoose.connection.on('connected', () => {
  // tslint:disable-next-line: no-console
  return console.log('Successfully connected to ' + constants.DB_URL);
});

const disconnect = async () => {
  return mongoose.connection.close(() => {
    // End connection;
  });
};

const connectToDatabase = () => {
  return mongoose.connect(constants.DB_URL)
    .then().catch((err) => {
      // tslint:disable-next-line: no-console
      console.log('Mongo Connection Failed.');
      throw err;
    });
};

export default { disconnect, connectToDatabase };
