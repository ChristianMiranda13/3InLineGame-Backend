
const returnResponse = async (_req, res) => {
  return res.json(res.locals.data);
};

export default { returnResponse };
