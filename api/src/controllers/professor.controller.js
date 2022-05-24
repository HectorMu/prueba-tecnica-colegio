const connection = require("../database");

const helpers = require("../helpers/helpers");

const controller = {};

controller.ListAll = async (req, res) => {
  try {
    const alumns = await connection.query("select * from professor");
    res.json(alumns);
  } catch (error) {
    console.log(error);
    res.json(helpers.errorResponse(error));
  }
};
controller.ListOne = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await connection.query(
      "select * from professor where id = ?",
      [id]
    );

    if (!data.length > 0) return res.json({});

    const professor = data[0];

    res.json(professor);
  } catch (error) {
    console.log(error);
    res.json(helpers.errorResponse(error));
  }
};

controller.Save = async (req, res) => {
  const { name, lastname, gender } = req.body;

  const newProfessor = {
    name,
    lastname,
    gender,
  };
  try {
    const profAlreadyExists = await connection.query(
      "select * from professor where name = ? && lastname = ?",
      [name, lastname]
    );
    if (profAlreadyExists.length > 0)
      return res.json(helpers.errorResponse("El profesor ya esta registrado"));

    const results = await connection.query("insert into professor set ?", [
      newProfessor,
    ]);

    if (results.insertId > 0) {
      res.json(helpers.successResponse("Profesor guardado satisfactoriamente"));
    }
  } catch (error) {
    console.log(error);
    res.json(helpers.errorResponse(error));
  }
};

controller.Update = async (req, res) => {
  const { id } = req.params;

  const { name, lastname, gender } = req.body;

  const newProfessor = {
    name,
    lastname,
    gender,
  };

  try {
    const profAlreadyExists = await connection.query(
      "select * from professor where name = ? && lastname = ? && id != ?",
      [name, lastname, id]
    );

    if (profAlreadyExists.length > 0)
      return res.json(helpers.errorResponse("El profesor ya esta registrado"));

    const results = await connection.query(
      "update professor set ? where id = ?",
      [newProfessor, id]
    );

    if (!results.affectedRows > 0)
      return res.json(helpers.errorResponse("Este profesor no existe"));

    res.json(helpers.successResponse("Profesor editado satisfactoriamente"));
  } catch (error) {
    console.log(error);
    res.json(helpers.errorResponse(error));
  }
};

controller.Delete = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await connection.query(
      "delete from professor where id = ?",
      [id]
    );

    if (!results.affectedRows > 0)
      return res.json(helpers.errorResponse("Este profesor no existe"));

    res.json(helpers.successResponse("Profesor eliminado satisfactoriamente"));
  } catch (error) {
    console.log(error);
    res.json(helpers.errorResponse(error));
  }
};

module.exports = controller;
