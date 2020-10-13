import { Application } from 'express';

import game from '../gameRouter';

const routes = (app: Application) => {
  app.use(game);

  // To validate that backend is running correctly.
  app.get('/healthcheck', (_, res) => res.status(200).send('OK'));
};

export default routes;
