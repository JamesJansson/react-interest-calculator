import MainNavbar from "./MainNavbar";
import Footer from "./Footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import piggyBank from "./assets/piggy-bank.jpg";

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
                Examples of mobile-responsive of Fintech-related React
                components. Built with Vite using Typescript.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer></Footer>
    </>
  );
}

export default HomePage;
