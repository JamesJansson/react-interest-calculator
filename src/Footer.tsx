import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Container fluid className="bg-black">
      <Container>
        <Row>
          <Col className="col-3 text-red">
            <Link to="/">
              <h3>FinEG</h3>
            </Link>
          </Col>
          <Col className="col-3 text-right">
            <Nav>
              <Nav.Link as={Link} to="/app">
                Savings
              </Nav.Link>
              <Nav.Link as={Link} to="/app">
                Loans
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Footer;
