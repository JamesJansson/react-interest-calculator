import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Navbar className="bg-black">
      <Container>
        <Navbar.Brand as={Link} to="/">
          FinancialEG
          <div className="text-body-tertiary fs-6">© James Jansson 2024</div>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="/savings">
              Savings
            </Nav.Link>
            <Nav.Link as={Link} to="/loans">
              Loans
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Footer;
