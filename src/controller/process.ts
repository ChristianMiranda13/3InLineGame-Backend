import to from 'await-to-js';
import store from '../helper/store';

const getGame = async (req, res, next) => {
  if (!req.params.id) {
    return res.boom.badRequest('Missing game id to get it.');
  }

  const id = req.params.id;
  const [err, record] = await to(store.getGame(id));
  if (err) {
    return res.boom.badImplementation(err, { message: 'Error getting game with id.' });
  }

  res.locals.data = record;
  next();
  return;
};

const getGames = async (_req, res, next) => {
  const [err, record] = await to(store.getGames());
  if (err) {
    return res.boom.badImplementation(err, { message: 'Error getting games.' });
  }

  res.locals.data = record;
  next();
  return;
};

const postGame = async (req, res, next) => {
  const body = req.body;
  if (!body || !body.currentTurn || !body.status || !body.board) {
    return res.boom.badRequest('Missing Game data to create it.');
  }

  const [err, record] = await to(store.saveGame(body));
  if (err) {
    return res.boom.badImplementation(err, { message: 'Error saving game.' });
  }

  res.locals.data = record;
  next();
  return;
};

const updateGame = async (req, res, next) => {
  const body = req.body;
  if (!req.params.id || !body || !body.currentTurn || !body.board) {
    return res.boom.badRequest('Missing game id to register movement.');
  }

  if (body.status !== 'started') {
    return res.boom.badRequest('This game is over.');
  }

  const [err, record] = await to(store.updateGame(req.params.id, body));
  if (err) {
    return res.boom.badImplementation(err, { message: 'Error updating game.' });
  }

  res.locals.data = record;
  next();
  return;
};

export { getGame, getGames, postGame, updateGame };
