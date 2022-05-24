const helpers = require("../helpers/helpers");

const hasEmpty = (req, res, next) => {
  const bodyData = req.bodyData;

  const foundedEmpty = helpers.hasEmptyPropierty(bodyData);
  if (foundedEmpty.result) {
    return res.json({ status: false, statusText: foundedEmpty.expected });
  }

  next();
};

module.exports = hasEmpty;
