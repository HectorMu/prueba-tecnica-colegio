import { useState, useEffect } from "react";
import { FormControl, FormSelect, Button } from "react-bootstrap";
import useForm from "@/hooks/useForm";
import { Link } from "react-router-dom";
import useRouter from "@/hooks/useRouter";
import { getOneAlumn, editAlumn, saveAlumn } from "@/services/alumns";
import toast from "react-hot-toast";

const Form = () => {
  const [onEditing, setOnEditing] = useState(false);
  const { location, params, navigate } = useRouter();

  const { form, setForm, handleChange } = useForm({
    name: "",
    lastname: "",
    gender: "",
    birthday: "",
  });

  const getAlumnHandler = async () => {
    const alumn = await getOneAlumn(params.id);
    if (!alumn.id) {
      toast.error("Este alumno no existe");
      navigate("/alumns");
      return;
    }
    setForm(alumn);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (onEditing) {
      const results = await editAlumn(form, params.id);
      if (!results.status) return toast.error(results.statusText);

      toast.success(results.statusText);
      navigate(-1);
    } else {
      const results = await saveAlumn(form);
      if (!results.status) return toast.error(results.statusText);

      toast.success(results.statusText);
      navigate(-1);
    }
  };

  useEffect(() => {
    if (location.pathname.includes("edit")) {
      setOnEditing(true);
      getAlumnHandler();
    }
  }, [location.pathname]);

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="text-center">
        {onEditing ? "Editar alumno" : " Registrar alumno"}
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
        <FormSelect
          name="gender"
          onChange={handleChange}
          value={form.gender}
          required
        >
          <option value={""}>Genero (Seleccione una opcion)</option>
          <option value={"H"}>Hombre</option>
          <option value={"M"}>Mujer</option>
        </FormSelect>
      </div>
      <div className="mb-3">
        <label htmlFor="">Fecha de nacimiento</label>
        <FormControl
          type="date"
          name="birthday"
          onChange={handleChange}
          value={form.birthday}
          required
        />
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
