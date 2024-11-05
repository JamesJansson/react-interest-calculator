import MainNavbar from "./MainNavbar";
import Footer from "./Footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import piggyBank from "./assets/piggy-bank.jpg";
import reactLogo from "./assets/react.svg";
import "./HomePage.css";

function HomePage() {
  return (
    <>
      <MainNavbar />
      <div className="main-section">
        <Container>
          <Row>
            <Col xs="12" sm={{ span: 6, order: "last" }}>
              <img src={piggyBank} className="img-fluid" alt="Piggy bank" />
            </Col>
            <Col xs="12" sm={{ span: 6, order: "first" }}>
              <h1 className="display-2">FinancialEG</h1>
              <p className="lead">
                Examples of mobile-responsive, FinTech-related React components.
                Built with Vite using Typescript and Bootstrap.
              </p>
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
          </Row>
        </Container>
      </div>
      <Footer></Footer>
    </>
  );
}

export default HomePage;
