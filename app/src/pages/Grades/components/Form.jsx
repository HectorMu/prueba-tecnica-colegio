import { useState, useEffect } from "react";
import { FormControl, FormSelect, Button } from "react-bootstrap";
import useForm from "@/hooks/useForm";
import { Link } from "react-router-dom";
import useRouter from "@/hooks/useRouter";
import { getOneGrade, saveGrade, editGrade } from "@/services/grades";
import { getProfessors } from "@/services/professors";

import toast from "react-hot-toast";

const Form = () => {
  const { form, setForm, handleChange } = useForm({
    name: "",
    fk_professor: "",
  });
  const [onEditing, setOnEditing] = useState(false);
  const [professors, setProfessors] = useState([]);
  const { location, params, navigate } = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (onEditing) {
      const results = await editGrade(form, params.id);
      if (!results.status) return toast.error(results.statusText);

      toast.success(results.statusText);
      navigate(-1);
    } else {
      const results = await saveGrade(form);
      if (!results.status) return toast.error(results.statusText);

      toast.success(results.statusText);
      navigate(-1);
    }
  };

  const getGradeHandler = async () => {
    const grade = await getOneGrade(params.id);
    if (!grade.id) {
      toast.error("Este grado no existe");
      navigate("/grades");
      return;
    }
    setForm(grade);
  };

  const getProfessorsHandlder = async () => {
    const fetchedProfessors = await getProfessors();
    setProfessors(fetchedProfessors);
  };

  useEffect(() => {
    if (location.pathname.includes("edit")) {
      setOnEditing(true);
      getGradeHandler();
    }
    getProfessorsHandlder();
  }, [location.pathname]);

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="text-center">
        {onEditing ? "Editar grado" : " Registrar grado"}
      </h4>
      <div className="mb-3">
        <FormControl
          placeholder="Nombre"
          name="name"
          onChange={handleChange}
          value={form.name}
          required
        />
      </div>

      <div className="mb-3">
        <FormSelect
          name="fk_professor"
          onChange={handleChange}
          value={form.fk_professor}
          required
        >
          <option value={""}>Profesor (Seleccione una opcion)</option>
          {professors.length > 0 ? (
            professors.map((prof) => (
              <option value={prof.id}>{prof.name}</option>
            ))
          ) : (
            <p>No hay profesores registrados</p>
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
