import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import useSession from "@/hooks/useSession";

const Sidebar = ({ isActive }) => {
  const { user } = useSession();

  if (user === null) {
    return <></>;
  }

  return (
    <aside className={`sidebar ${isActive ? `active` : ``}`}>
      <nav className="menu ">
        <NavLink to="/" className="menu-item">
          <i className="fas fa-fw fa-tachometer-alt"></i>{" "}
          <span className="">Dashboard</span>
        </NavLink>
        <hr className="c-sidebar-divider" />
        <div className="heading">
          <p>MENU</p>
        </div>
        <NavLink to="/alumns" className="menu-item">
          <i className="fas fa-users"></i> <span>Alumnos</span>
        </NavLink>
        <NavLink to="/alumns-grades" className="menu-item">
          <i className="fas fa-user-graduate"></i> <span>Grados de alumno</span>
        </NavLink>
        <NavLink to="/professor" className="menu-item">
          <i className="fas fa-chalkboard-teacher"></i> <span>Profesores</span>
        </NavLink>
        <NavLink to="/grades" className="menu-item">
          <i className="fas fa-list-ol"></i> <span>Grados</span>
        </NavLink>
        <hr className="c-sidebar-divider" />
      </nav>
    </aside>
  );
};

export default Sidebar;
