import to from 'await-to-js';
import Game from '../models/game';

const saveGame = (game: IGame) => {
  return new Promise(async (resolve, reject) => {
    if (!game || !game.currentTurn || !game.status || !game.board) {
      return reject('Missing game data');
    }
    const newGame = new Game(game);
    const [error, gameCreated] = await to(newGame.save());
    if (error) {
      return reject(error);
    }

    if (!gameCreated) {
      return reject('There was a problem, movement has not been registered!!!');
    }

    return resolve(gameCreated.sanitize());
  });
};

const updateGame = (gameId: string, bodyGame: IGame): Promise<IGame> => {
  return new Promise(async (resolve, reject) => {
    if (!gameId || !bodyGame) {
      return reject('Missing data');
    }

    const [err, res] = await to<IGameModel>(Game.findByIdAndUpdate(gameId, bodyGame, { new: true }).then());
    if (err) {
      return reject(err);
    }

    return resolve(res ? res.sanitize() : res);
  });
};

const getGames = (): Promise<IGame[] | IGame> => {
  return new Promise(async (resolve, reject) => {

    const [err, res] = await to<IGameModel[]>(Game.find().then());
    if (err) {
      return reject(err);
    }

    if (res.length) {
      return resolve(res);
    }

    return resolve(res);
  });
};

const getGame = (gameId: string): Promise<IGame> => {
  return new Promise(async (resolve, reject) => {
    if (!gameId) {
      return reject('Missing game id');
    }

    const [err, res] = await to<IGameModel>(Game.findOne({ _id: gameId }).then());
    if (err) {
      return reject(err);
    }

    return resolve(res ? res.sanitize() : res);
  });
};

export default { saveGame, getGames, updateGame, getGame };
