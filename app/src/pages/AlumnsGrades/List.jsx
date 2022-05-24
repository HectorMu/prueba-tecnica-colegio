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
import { getAlumnGrades, deleteAlumnGrade } from "@/services/alumns-grades";
import { alertConfig } from "@/helpers/sweetAlert";
import toast from "react-hot-toast";

const List = () => {
  const { navigate } = useRouter();
  const { hookData, isLoading, refreshData } = useServiceFetch(
    getAlumnGrades,
    [],
    []
  );

  const goToEdit = (grade) => navigate(`/alumns-grades/edit/${grade.id}`);

  const handleDelete = async (grade) => {
    Swal.fire({
      text: `¿Desea eliminar el grado '${grade.grade_name}' del sistema?`,
      icon: "info",
      ...alertConfig,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteResults = await deleteAlumnGrade(grade.id);
        if (!deleteResults.status) {
          return toast.error(deleteResults.statusText);
        }
        toast.success("Grado eliminado correctamente");
        await refreshData();
      }
    });
  };

  return (
    <Container fluid className="mt-4">
      <div className="d-flex justify-content-between h-100 align-items-center mb-3">
        <h3>Grados</h3>
        <Link to={"/alumns-grades/add"} className="btn btn-primary">
          Agregar
        </Link>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <DataTable
          title="Grados"
          refreshCallback={refreshData}
          renameHeaders={{
            fk_alumn: "ID alumno",

            grade_name: "Grado",
            name: "Nombre (s)",
            lastname: "Apellido (s)",
          }}
          hideColumns={["fk_grade"]}
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
