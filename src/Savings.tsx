import { ChangeEvent, useState } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import MainNavbar from "./MainNavbar";
import Footer from "./Footer";

function Savings() {
  const [state, setState] = useState({
    deposit: 100,
    interestRate: 4.5,
    period: 30,
    total: 0,
    totalInterest: 0,
  });

  function setDeposit(event: ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);

    setState((prev) => ({ ...prev, deposit: value }));
  }

  function setInterest(event: ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);

    setState((prev) => ({ ...prev, interestRate: value }));
  }

  function setPeriod(event: ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);

    setState((prev) => ({ ...prev, period: value }));
  }

  return (
    <>
      <MainNavbar />
      <div className="main-section">
        <Container>
          <Row className="justify-content-center">
            <Col xs="12" sm="6">
              <InputGroup className="mb-3" size="lg">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  aria-label="Weekly deposit amount"
                  onChange={setDeposit}
                />
                <InputGroup.Text>.00 per week</InputGroup.Text>
              </InputGroup>

              <InputGroup className="mb-3" size="lg">
                <Form.Control
                  aria-label="Interest rate"
                  onChange={setInterest}
                />
                <InputGroup.Text>%</InputGroup.Text>
              </InputGroup>

              <InputGroup className="mb-3" size="lg">
                <Form.Control
                  aria-label="Savings period"
                  onChange={setPeriod}
                />
                <InputGroup.Text>years</InputGroup.Text>
              </InputGroup>
            </Col>
            <Col xs="12" sm="6" className="align-self-center">
              Graph
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Savings;
