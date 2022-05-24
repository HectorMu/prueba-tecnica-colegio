const connection = require("../database");

const helpers = require("../helpers/helpers");

const controller = {};

controller.ListAll = async (req, res) => {
  try {
    const alumns = await connection.query("select * from alumn");
    res.json(alumns);
  } catch (error) {
    console.log(error);
    res.json(helpers.errorResponse(error));
  }
};
controller.ListOne = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await connection.query("select * from alumn where id = ?", [
      id,
    ]);

    if (!data.length > 0) return res.json({});

    const alumn = data[0];

    res.json(alumn);
  } catch (error) {
    console.log(error);
    res.json(helpers.errorResponse(error));
  }
};

controller.Save = async (req, res) => {
  const { name, lastname, gender, birthday } = req.body;

  const newAlumn = {
    name,
    lastname,
    gender,
    birthday,
  };

  try {
    const alumnAlreadyExists = await connection.query(
      "select * from alumn where name = ? && lastname = ?",
      [name, lastname]
    );
    if (alumnAlreadyExists.length > 0)
      return res.json(helpers.errorResponse("El alumno ya esta registrado"));

    const results = await connection.query("insert into alumn set ?", [
      newAlumn,
    ]);

    if (results.insertId > 0) {
      res.json(helpers.successResponse("Alumno guardado satisfactoriamente"));
    }
  } catch (error) {
    console.log(error);
    res.json(helpers.errorResponse(error));
  }
};

controller.Update = async (req, res) => {
  const { id } = req.params;

  const { name, lastname, gender, birthday } = req.body;

  const newAlumn = {
    name,
    lastname,
    gender,
    birthday,
  };

  try {
    const alumnAlreadyExists = await connection.query(
      "select * from alumn where name = ? && lastname = ? &&  id != ?",
      [name, lastname, id]
    );
    if (alumnAlreadyExists.length > 0)
      return res.json(helpers.errorResponse("El alumno ya esta registrado"));

    const results = await connection.query("update alumn set ? where id = ?", [
      newAlumn,
      id,
    ]);

    if (!results.affectedRows > 0)
      return res.json(helpers.errorResponse("Este alumno no existe"));

    res.json(helpers.successResponse("Alumno editado satisfactoriamente"));
  } catch (error) {
    console.log(error);
    res.json(helpers.errorResponse(error));
  }
};

controller.Delete = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await connection.query("delete from alumn  where id = ?", [
      id,
    ]);

    if (!results.affectedRows > 0)
      return res.json(helpers.errorResponse("Este alumno no existe"));

    res.json(helpers.successResponse("Alumno eliminado satisfactoriamente"));
  } catch (error) {
    console.log(error);
    res.json(helpers.errorResponse(error));
  }
};

module.exports = controller;
