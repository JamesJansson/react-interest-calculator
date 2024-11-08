import MainNavbar from "./MainNavbar";
import Footer from "./Footer";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import piggyBank from "./assets/piggy-bank.jpg";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import bootstrapLogo from "./assets/bootstrap.svg";
import typeScriptLogo from "./assets/typescript.svg";
import "./HomePage.css";

function HomePage() {
  return (
    <>
      <MainNavbar />
      <div className="main-section">
        <Container>
          <Row className="justify-content-center">
            <Col xs="12" sm={{ span: 6, order: "last" }}>
              <img src={piggyBank} className="img-fluid" alt="Piggy bank" />
            </Col>
            <Col
              xs="12"
              sm={{ span: 6, order: "first" }}
              className="align-self-center"
            >
              <div>
                <h1 className="display-2">FinancialEG</h1>
                <p className="lead">
                  Examples of mobile-responsive, FinTech-related React
                  components. Built with Vite using Typescript and Bootstrap.
                </p>
                <Link to="/savings">
                  <Button variant="primary">Savings</Button>{" "}
                </Link>{" "}
                <Link to="/loans">
                  <Button variant="primary">Loans</Button>{" "}
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <h2>Technologies</h2>
          <Row>
            <Col xs="12" sm="3" className="text-center">
              <div>
                <a href="https://react.dev" target="_blank">
                  <img
                    src={reactLogo}
                    className="logo react-logo img-fluid"
                    alt="React logo"
                  />
                </a>
              </div>
              <div className="lead">React</div>
            </Col>
            <Col xs="12" sm="3" className="text-center">
              <div>
                <a href="https://vite.dev" target="_blank">
                  <img
                    src={viteLogo}
                    className="logo img-fluid"
                    alt="Vite logo"
                  />
                </a>
              </div>
              <div className="lead">Vite</div>
            </Col>
            <Col xs="12" sm="3" className="text-center">
              <div>
                <a href="https://www.typescriptlang.org/" target="_blank">
                  <img
                    src={typeScriptLogo}
                    className="logo img-fluid"
                    alt="TypeScript logo"
                  />
                </a>
              </div>
              <div className="lead">TypeScript</div>
            </Col>
            <Col xs="12" sm="3" className="text-center">
              <div>
                <a href="https://getbootstrap.com/" target="_blank">
                  <img
                    src={bootstrapLogo}
                    className="logo img-fluid"
                    alt="Bootstrap logo"
                  />
                </a>
              </div>
              <div className="lead">Bootstrap</div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
