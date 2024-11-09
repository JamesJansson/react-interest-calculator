import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Github from "./assets/github.svg";

const buttonStyle = {
  width: 28,
  height: 28,
};

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
            <Nav.Link href="https://github.com/JamesJansson/react-interest-calculator">
              <img src={Github} style={buttonStyle} />
            </Nav.Link>
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
