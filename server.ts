import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import boom from 'express-boom';

// Utils
import db from './src/helper/dbManager';
import router from './src/helper/routes';

// Config
import config from './src/config';

// Consts
const port = config.BACKEND_PORT;

// Express connection
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(boom());
app.use(cors());

// Db Connection
db.connectToDatabase();

// Routing Manage
router(app);

app.listen(port, () => {
  // tslint:disable-next-line
  console.log(`This app is listening in ${port}.`);
});
