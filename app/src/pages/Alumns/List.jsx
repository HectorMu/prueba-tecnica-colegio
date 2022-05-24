import React from "react";
import { Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

//components
import DataTable from "@/components/Global/DataTable";

//hoks
import useServiceFetch from "@/hooks/useServiceFetch";
import useRouter from "@/hooks/useRouter";
//services
import { deleteAlumn, getAlumns } from "@/services/alumns";
import { alertConfig } from "@/helpers/sweetAlert";
import toast from "react-hot-toast";

const List = () => {
  const { navigate } = useRouter();
  const { hookData, isLoading, refreshData } = useServiceFetch(
    getAlumns,
    [],
    []
  );

  const goToEdit = (alumn) => navigate(`/alumns/edit/${alumn.id}`);

  const handleDelete = async (alumn) => {
    Swal.fire({
      text: `¿Desea eliminar al alumno '${alumn.name} ${alumn.lastname}' del sistema?`,
      icon: "info",
      ...alertConfig,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteResults = await deleteAlumn(alumn.id);
        if (!deleteResults.status) {
          return toast.error(deleteResults.statusText);
        }
        toast.success("Alumno eliminado correctamente");
        await refreshData();
      }
    });
  };

  return (
    <Container fluid className="mt-4">
      <div className="d-flex justify-content-between h-100 align-items-center mb-3">
        <h3>Alumnos</h3>
        <Link to={"/alumns/add"} className="btn btn-primary">
          Agregar
        </Link>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <DataTable
          title="Alumnos"
          refreshCallback={refreshData}
          renameHeaders={{
            name: "Nombre",
            lastname: "Apellidos",
            gender: "Genero",
            birthday: "Nacimiento",
          }}
          buttons={[
            {
              key: "btnEdit",
              text: "Editar",
              style: "btn btn-primary mx-1 btn-sm",
              fwicon: "fas fa-pen",
              click: (o) => goToEdit(o),
            },
            {
              key: "btnDelete",
              text: "Eliminar",
              style: "btn btn-danger mx-1 btn-sm",
              fwicon: "fas fa-times",
              click: (o) => handleDelete(o),
            },
          ]}
          actions={true}
          actionsText={"Opciones"}
          emptyDataText={"No hay registros"}
          data={hookData}
          searchText={"Buscando por"}
        />
      )}
    </Container>
  );
};

export default List;
