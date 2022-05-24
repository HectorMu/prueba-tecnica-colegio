import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import useSession from "@/hooks/useSession";
import { Logout } from "@/services/auth";

const NavbarLayout = ({ setIsActive, isActive }) => {
  const { user, setUser } = useSession();
  const handleLogout = () => {
    Logout();
    setUser(null);
  };
  return (
    <>
      <Navbar fixed="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Colegio</Navbar.Brand>
          <Nav className="ms-auto">
            {user && (
              <>
                {" "}
                <NavDropdown
                  title={
                    <span>
                      <i className="fas fa-user"></i> {user.username}
                    </span>
                  }
                  id="navbarScrollingDropdown"
                  align={"end"}
                >
                  <NavDropdown.Item onClick={handleLogout}>
                    Cerrar sesion
                  </NavDropdown.Item>
                </NavDropdown>
                <div className="d-flex align-items-center">
                  <Button size="sm" onClick={() => setIsActive(!isActive)}>
                    <i className="fas fa-bars"></i>
                  </Button>
                </div>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarLayout;
