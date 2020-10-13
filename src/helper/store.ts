import to from 'await-to-js';
import moment from 'moment';
import Game from '../models/game';

const saveGame = (game: IGame) => {
  return new Promise(async (resolve, reject) => {
    if (!game || !game.currentTurn || !game.status || !game.board) {
      return reject('Missing game data');
    }

    game.createdAt = moment(Date.now()).format('YYYY/MM/DD hh:mm:ss');
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

    bodyGame.updateAt = moment(Date.now()).format('YYYY/MM/DD hh:mm:ss');

    const [err, res] = await to<IGameModel>(Game.findByIdAndUpdate(gameId, bodyGame, { new: true }).then());
    if (err) {
      return reject(err);
    }

    return resolve(res ? res.sanitize() : res);
  });
};

const sanitizeResponse = (data: IGameModel[]) => {
  return data.map((game) => game.sanitize());
};

const getGames = (): Promise<IGame[] | IGame> => {
  return new Promise(async (resolve, reject) => {

    const [err, res] = await to<IGameModel[]>(Game.find().then());
    if (err) {
      return reject(err);
    }

    if (res.length) {
      const response = sanitizeResponse(res);
      return resolve(response);
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
