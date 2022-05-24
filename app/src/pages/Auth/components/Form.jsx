import React from "react";
import { Button, FormControl, FormGroup } from "react-bootstrap";
import useForm from "@/hooks/useForm";
import useSession from "@/hooks/useSession";
import { Login } from "@/services/auth";
import toast from "react-hot-toast";
import useRouter from "@/hooks/useRouter";

const Form = () => {
  const { form, handleChange } = useForm({ email: "", password: "" });
  const { navigate } = useRouter();

  const { setUser } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const results = await Login(form);
    if (!results.status) return toast.error(results.statusText);

    const { SessionData } = results;
    window.localStorage.setItem("scSession", JSON.stringify(SessionData));

    setUser(JSON.parse(window.localStorage.getItem("scSession")));
    toast.success("Bienvenido");
    navigate("/");
  };
  return (
    <form className="mt-3" onSubmit={handleSubmit}>
      <FormGroup className="mb-2">
        <FormControl
          placeholder="Correo electronico"
          name="email"
          onChange={handleChange}
          value={form.email}
          type="email"
          required
        />
      </FormGroup>

      <FormGroup>
        <FormControl
          placeholder="Contraseña"
          name="password"
          onChange={handleChange}
          type="password"
          value={form.password}
          required
        />
      </FormGroup>

      <div className="d-flex justify-content-center mt-3">
        <Button variant="primary" type="submit">
          Iniciar sesion
        </Button>
      </div>
    </form>
  );
};

export default Form;
