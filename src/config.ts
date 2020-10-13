const constants: IConstants = {
  BACKEND_PORT: process.env.BACKEND_PORT || `3000`,
  DB_URL: process.env.DB_URL || 'mongodb://localhost/3inline',
  WINNING_COMBOS: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
};

export default constants;
