// Libraries
import mongoose from 'mongoose';

// Schema MongoDB
const Schema = mongoose.Schema;

const game = new Schema({
  currentTurn: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'started',
    required: true,
  },
  board: {
    type: [String],
    required: true,
  },
});

game.set('toJSON', { getters: true, virtuals: false });

game.methods.sanitize = function sanitize() {
  const gameObj = this.toJSON();
  gameObj.id = gameObj._id.toString();
  delete gameObj._id;
  delete gameObj.__v;
  return gameObj;
};

// Export the model and return your interface
export default mongoose.model<IGameModel>('games', game);
