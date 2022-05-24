const connection = require("../database");

const helpers = require("../helpers/helpers");

const controller = {};

controller.ListAll = async (req, res) => {
  try {
    const grades = await connection.query(
      "SELECT g.id, g.name AS grade_name, g.fk_professor, p.name, p.lastname from grade g, professor p WHERE g.fk_professor = p.id;"
    );
    res.json(grades);
  } catch (error) {
    console.log(error);
    res.json(helpers.errorResponse(error));
  }
};
controller.ListOne = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await connection.query(
      "SELECT g.id, g.name AS grade_name, g.fk_professor, p.name, p.lastname from grade g, professor p WHERE g.fk_professor = p.id && g.id = ?",
      [id]
    );

    if (!data.length > 0) return res.json({});

    const grade = data[0];

    res.json(grade);
  } catch (error) {
    console.log(error);
    res.json(helpers.errorResponse(error));
  }
};

controller.Save = async (req, res) => {
  const { name, fk_professor } = req.body;

  const newGrade = {
    name,
    fk_professor,
  };
  try {
    const gradeAlreadyExists = await connection.query(
      `select * from grade where name = ?;`,
      [name]
    );

    if (gradeAlreadyExists.length > 0)
      return res.json(helpers.errorResponse("Este grado ya esta registrado"));

    const results = await connection.query("insert into grade set ?", [
      newGrade,
    ]);

    if (results.insertId > 0) {
      res.json(helpers.successResponse("Grado guardado satisfactoriamente"));
    }
  } catch (error) {
    console.log(error);
    res.json(helpers.errorResponse(error));
  }
};

controller.Update = async (req, res) => {
  const { id } = req.params;

  const { name, fk_professor } = req.body;

  const newGrade = {
    name,
    fk_professor,
  };

  try {
    const results = await connection.query("update grade set ? where id = ?", [
      newGrade,
      id,
    ]);

    if (!results.affectedRows > 0)
      return res.json(helpers.errorResponse("Este grado no existe"));

    res.json(helpers.successResponse("Grado editado satisfactoriamente"));
  } catch (error) {
    console.log(error);
    res.json(helpers.errorResponse(error));
  }
};

controller.Delete = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await connection.query("delete from grade where id = ?", [
      id,
    ]);

    if (!results.affectedRows > 0)
      return res.json(helpers.errorResponse("Este grado no existe"));

    res.json(helpers.successResponse("Grado eliminado satisfactoriamente"));
  } catch (error) {
    console.log(error);
    res.json(helpers.errorResponse(error));
  }
};

module.exports = controller;
