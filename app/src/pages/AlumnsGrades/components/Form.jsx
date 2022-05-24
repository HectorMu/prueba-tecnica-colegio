import { useState, useEffect } from "react";
import { FormSelect, Button } from "react-bootstrap";
import useForm from "@/hooks/useForm";
import { Link } from "react-router-dom";
import useRouter from "@/hooks/useRouter";
import {
  getOnAlumnGrade,
  saveAlumnGrade,
  editAlumnGrade,
} from "@/services/alumns-grades";

import { getGrades } from "@/services/grades";
import { getAlumns } from "@/services/alumns";

import toast from "react-hot-toast";

const Form = () => {
  const { form, setForm, handleChange } = useForm({
    fk_alumn: "",
    fk_grade: "",
  });
  const [onEditing, setOnEditing] = useState(false);
  const { location, params, navigate } = useRouter();

  const [grades, setGrades] = useState([]);
  const [alumns, setAlumns] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (onEditing) {
      const results = await editAlumnGrade(form, params.id);
      if (!results.status) return toast.error(results.statusText);

      toast.success(results.statusText);
      navigate(-1);
    } else {
      const results = await saveAlumnGrade(form);
      if (!results.status) return toast.error(results.statusText);

      toast.success(results.statusText);
      navigate(-1);
    }
  };

  const getAlumnGradeHandler = async () => {
    const grade = await getOnAlumnGrade(params.id);
    if (!grade.id) {
      toast.error("Este grado no existe");
      navigate("/alumns-grades");
      return;
    }
    setForm(grade);
  };

  const getGradesHandler = async () => {
    const fetchedGrades = await getGrades();
    setGrades(fetchedGrades);
  };
  const getAlumnsHandler = async () => {
    const fetchedAlumns = await getAlumns();
    setAlumns(fetchedAlumns);
  };

  useEffect(() => {
    if (location.pathname.includes("edit")) {
      setOnEditing(true);
      getAlumnGradeHandler();
    }
    getAlumnsHandler();
    getGradesHandler();
  }, [location.pathname]);

  console.log(grades);

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="text-center">
        {onEditing ? "Editar grado" : " Registrar grado"}
      </h4>

      <div className="mb-3">
        <FormSelect
          name="fk_alumn"
          onChange={handleChange}
          value={form.fk_alumn}
          required
        >
          <option value={""}>Alumno (Seleccione una opcion)</option>
          {alumns.length > 0 ? (
            alumns.map((alumn) => (
              <option value={alumn.id}>{alumn.name}</option>
            ))
          ) : (
            <p>No hay alumnos registrados</p>
          )}
        </FormSelect>
      </div>

      <div className="mb-3">
        <FormSelect
          name="fk_grade"
          onChange={handleChange}
          value={form.fk_grade}
          required
        >
          <option value={""}>Grado (Seleccione una opcion)</option>
          {grades.length > 0 ? (
            grades.map((grade) => (
              <option value={grade.id}>{grade.grade_name}</option>
            ))
          ) : (
            <p>No hay grados registrados</p>
          )}
        </FormSelect>
      </div>

      <div className="d-flex justify-content-center gap-2">
        <Button variant="primary" type="submit">
          {onEditing ? "Guardar cambios" : "Guardar"}
        </Button>
        <Link to={-1} className="btn btn-secondary">
          Cancelar
        </Link>
      </div>
    </form>
  );
};

export default Form;
