const connection = require("../database");
const jwt = require("jsonwebtoken");
const helpers = require("../helpers/helpers");

const controller = {};

//Login controller, this returns a JWT to authenticate the user on the REST API
controller.Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const results = await connection.query(
      `select * from users where email = ? `,
      [email]
    );
    if (!results.length > 0)
      return res.status(400).json({
        status: false,
        statusText: "Wrong credentials, check it out.",
      });

    const user = results[0];
    const passwordComparationResult = await helpers.matchPassword(
      password,
      user.password
    );

    if (!passwordComparationResult)
      return res.status(400).json({
        status: false,
        statusText: "Wrong credentials, check it out.",
      });

    const serializedUser = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const AccessToken = jwt.sign(
      serializedUser,
      process.env.ACCESS_TOKEN_SECRET
    );

    const SessionData = {
      ...serializedUser,
      AccessToken,
    };

    res.status(200).json({
      status: true,
      statusText: "User logged",
      SessionData,
    });
  } catch (error) {
    console.log(error);
    res
      .status(200)
      .json({ status: false, statusText: "Something wen't wrong." });
  }
};

module.exports = controller;
