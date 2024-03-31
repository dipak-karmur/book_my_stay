import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../styles/Navbar.css";
import { NavLink } from "react-router-dom";

function OffcanvasExample() {
  return (
    <>
      {[false].map((expand) => (
        <div className="col-12 navbrand">
          <Navbar
            key={expand}
            expand={expand}
            className=" mb-3 navbar-expand-lg "
          >
            <Container fluid className="me-auto ">
              <Navbar.Brand href="#" className="nav">Navbar</Navbar.Brand>
              <Navbar.Toggle className="toggler"
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
            </Container>

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              className="justify-content-center "
            >
              <Offcanvas.Body>
                <Nav className="justify-content-center  flex-grow-1 pe-3 links">
                <NavLink to="/" className="nav-link"> Home </NavLink>
                <NavLink to="/cart" className="nav-link"> Cart </NavLink>
                <NavLink to="/about" className="nav-link"> About </NavLink>
                </Nav>

                <Nav className="justify-content-center  flex-grow-1 pe-3 ">
                  <button className="login-button  ">Login</button>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            
          </Navbar>
        </div>
      ))}
    </>
  );
}

export default OffcanvasExample;
