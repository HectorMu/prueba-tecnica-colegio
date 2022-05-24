import { useState, useEffect } from "react";
import { FormControl, FormSelect, Button } from "react-bootstrap";
import useForm from "@/hooks/useForm";
import { Link } from "react-router-dom";
import useRouter from "@/hooks/useRouter";
import {
  getOneProfessor,
  saveProfessor,
  editProfessor,
} from "@/services/professors";
import toast from "react-hot-toast";

const Form = () => {
  const [onEditing, setOnEditing] = useState(false);
  const { location, params, navigate } = useRouter();

  const { form, setForm, handleChange } = useForm({
    name: "",
    lastname: "",
    gender: "",
  });

  const getProfHandler = async () => {
    const prof = await getOneProfessor(params.id);
    if (!prof.id) {
      toast.error("Este profesor no existe");
      navigate("/professor");
      return;
    }
    setForm(prof);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (onEditing) {
      const results = await editProfessor(form, params.id);
      if (!results.status) return toast.error(results.statusText);

      toast.success(results.statusText);
      navigate(-1);
    } else {
      const results = await saveProfessor(form);
      if (!results.status) return toast.error(results.statusText);

      toast.success(results.statusText);
      navigate(-1);
    }
  };

  useEffect(() => {
    if (location.pathname.includes("edit")) {
      setOnEditing(true);
      getProfHandler();
    }
  }, [location.pathname]);

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="text-center">
        {onEditing ? "Editar profesor" : " Registrar profesor"}
      </h4>
      <div className="mb-3">
        <FormControl
          placeholder="Nombres"
          name="name"
          onChange={handleChange}
          value={form.name}
          required
        />
      </div>
      <div className="mb-3">
        <FormControl
          placeholder="Apellidos"
          name="lastname"
          onChange={handleChange}
          value={form.lastname}
          required
        />
      </div>
      <div className="mb-3">
        <FormSelect name="gender" onChange={handleChange} value={form.gender}>
          <option value={""}>Genero (Seleccione una opcion)</option>
          <option value={"H"}>Hombre</option>
          <option value={"M"}>Mujer</option>
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
