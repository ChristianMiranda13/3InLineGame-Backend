// Framework
import { Router } from 'express';

// Functions
import { getGame, getGames, postGame, updateGame } from './controller/process';
import end from './helper/finisher';

// Router
const router = Router();

// Endpoints
router.get('/game/:id', [getGame, end.returnResponse]);
router.get('/games', [getGames, end.returnResponse]);
router.post('/game', [postGame, end.returnResponse]);
router.put('/game/:id', [updateGame, end.returnResponse]);

export default router;
