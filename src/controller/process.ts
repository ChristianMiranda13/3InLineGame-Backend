import to from 'await-to-js';
import constants from '../config';
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

  const winner = checkForWinner(req.body) as any;

  if (winner) {
    body.winner = body.currentTurn;
    body.status = 'Won';
  } else if (checkForDraw(body)) {
    body.status = 'Draw';
    body.winner = 'none';
  }

  const [err, record] = await to(store.updateGame(req.params.id, body));
  if (err) {
    return res.boom.badImplementation(err, { message: 'Error updating game.' });
  }

  res.locals.data = record;
  next();
  return;
};

const checkForDraw = (game: IGame) => {
  const board = game.board;
  let isDraw = true;
  for (const movement of board) {
    // tslint:disable-next-line: no-unused-expression
    !movement ? isDraw = false : 'none';
  }

  return isDraw;
};

const checkForWinner = (game: IGame) => {
  const currentTurn = game.currentTurn;
  const board = game.board;
  return constants.WINNING_COMBOS.find((combo) => {
    if (board[combo[0]] !== '' &&
      board[combo[1]] !== '' &&
      board[combo[2]] !== '' &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[1]] === board[combo[2]]) {
      return currentTurn;
    } else {
      return false;
    }
  });
};

export { getGame, getGames, postGame, updateGame };
