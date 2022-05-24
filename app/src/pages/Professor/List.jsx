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
import { getProfessors, deleteProfessor } from "@/services/professors";
import { alertConfig } from "@/helpers/sweetAlert";
import toast from "react-hot-toast";

const List = () => {
  const { navigate } = useRouter();
  const { hookData, isLoading, refreshData } = useServiceFetch(
    getProfessors,
    [],
    []
  );

  const goToEdit = (prof) => navigate(`/professor/edit/${prof.id}`);

  const handleDelete = async (prof) => {
    Swal.fire({
      text: `¿Desea eliminar al profesor '${prof.name} ${prof.lastname}' del sistema?`,
      icon: "info",
      ...alertConfig,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteResults = await deleteProfessor(prof.id);
        if (!deleteResults.status) {
          return toast.error(deleteResults.statusText);
        }
        toast.success("Profesor eliminado correctamente");
        await refreshData();
      }
    });
  };

  return (
    <Container fluid className="mt-4">
      <div className="d-flex justify-content-between h-100 align-items-center mb-3">
        <h3>Profesores</h3>
        <Link to={"/professor/add"} className="btn btn-primary">
          Agregar
        </Link>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <DataTable
          title="Profesores"
          refreshCallback={refreshData}
          renameHeaders={{
            name: "Nombre",
            lastname: "Apellidos",
            gender: "Genero",
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
