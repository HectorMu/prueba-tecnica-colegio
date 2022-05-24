const connection = require("../database");

const helpers = require("../helpers/helpers");

const controller = {};

controller.ListAll = async (req, res) => {
  try {
    const alumnGrades = await connection.query(
      "select ag.id, ag.fk_alumn, ag.fk_grade, g.name AS grade_name, a.name, a.lastname from alumn_grade ag, grade g, alumn a WHERE ag.fk_alumn = a.id && g.id = ag.fk_grade;"
    );
    res.json(alumnGrades);
  } catch (error) {
    console.log(error);
    res.json(helpers.errorResponse(error));
  }
};
controller.ListOne = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await connection.query(
      "select * from alumn_grade where id = ?",
      [id]
    );

    if (!data.length > 0) return res.json({});

    const alumnGrade = data[0];

    res.json(alumnGrade);
  } catch (error) {
    console.log(error);
    res.json(helpers.errorResponse(error));
  }
};

controller.Save = async (req, res) => {
  const { fk_alumn, fk_grade } = req.body;

  const newAlumnGrade = {
    fk_alumn,
    fk_grade,
  };
  try {
    const gradeExists = await connection.query(
      `select * from grade where id = ?;`,
      [fk_grade]
    );

    if (!gradeExists.length > 0)
      return res.json(
        helpers.errorResponse("El grado que intentas registrar no existe")
      );

    const gradeAlreadyExists = await connection.query(
      `select * from alumn_grade where fk_alumn = ? && fk_grade = ?;`,
      [fk_alumn, fk_grade]
    );

    if (gradeAlreadyExists.length > 0)
      return res.json(
        helpers.errorResponse("El alumno ya esta registrado a este grado")
      );

    const results = await connection.query("insert into alumn_grade set ?", [
      newAlumnGrade,
    ]);

    if (results.insertId > 0) {
      res.json(
        helpers.successResponse("Grado de alumno guardado satisfactoriamente")
      );
    }
  } catch (error) {
    console.log(error);
    res.json(helpers.errorResponse(error));
  }
};

controller.Update = async (req, res) => {
  const { id } = req.params;

  const { fk_alumn, fk_grade } = req.body;

  const newAlumnGrade = {
    fk_alumn,
    fk_grade,
  };

  try {
    const results = await connection.query(
      "update alumn_grade set ? where id = ?",
      [newAlumnGrade, id]
    );

    if (!results.affectedRows > 0)
      return res.json(helpers.errorResponse("Este grado del alumno no existe"));

    res.json(
      helpers.successResponse("Grado del alumno editado satisfactoriamente")
    );
  } catch (error) {
    console.log(error);
    res.json(helpers.errorResponse(error));
  }
};

controller.Delete = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await connection.query(
      "delete from alumn_grade where id = ?",
      [id]
    );

    if (!results.affectedRows > 0)
      return res.json(helpers.errorResponse("Este grado del alumno no existe"));

    res.json(
      helpers.successResponse("Grado del alumno eliminado satisfactoriamente")
    );
  } catch (error) {
    console.log(error);
    res.json(helpers.errorResponse(error));
  }
};

module.exports = controller;
