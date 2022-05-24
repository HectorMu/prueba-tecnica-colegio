const bcrypt = require("bcryptjs");
const connection = require("../database");

const helpers = {};

helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (e) {
    console.log(e);
  }
};

helpers.initialState = async () => {
  try {
    const anUserExists = await connection.query("select * from users");

    if (anUserExists.length > 0) return;

    const newUser = {
      username: "Admin",
      email: "admin@gmail.com",
      password: process.env.FIRST_USER_PASS,
    };

    newUser.password = await helpers.encryptPassword(newUser.password);

    const results = await connection.query("insert into users set  ?", [
      newUser,
    ]);

    if (results.insertId > 0) {
      console.log("First user created");
    }
  } catch (error) {
    console.log(error);
  }
};

helpers.successResponse = (message) => {
  return {
    status: true,
    statusText: message ? message : "Operación realizada con éxito",
  };
};

helpers.errorResponse = (error) => {
  return {
    status: false,
    statusText: error.message ? error.message : error,
  };
};

helpers.hasEmptyPropierty = (object) => {
  for (var key in object) {
    if (object[key] === "" || object[key] === null || object[key] === undefined)
      return {
        result: true,
        expected: `El parametro ${key} es requerido`,
      };
  }
  return {
    result: false,
  };
};

module.exports = helpers;
