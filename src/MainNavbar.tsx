import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function MainNavbar() {
  return (
    <Navbar className="bg-primary-subtle">
      <Container>
        <Navbar.Brand as={Link} to="/">
          FinEG
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="/app">
              Savings
            </Nav.Link>
            <Nav.Link as={Link} to="/app">
              Loans
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
