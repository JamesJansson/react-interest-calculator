import { ChangeEvent, useState } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import MainNavbar from "./MainNavbar";
import Footer from "./Footer";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isLeapYear from "dayjs/plugin/isLeapYear";

dayjs.extend(isSameOrBefore);
dayjs.extend(isLeapYear);

function Savings() {
  const [state, setState] = useState<{
    deposit: number;
    interestRate: number;
    period: number;
    total: number;
    totalInterest: number;
    graphData: { label: string; balance: number; interest: number }[];
  }>({
    deposit: 100,
    interestRate: 4.5,
    period: 30,
    total: 0,
    totalInterest: 0,
    graphData: [],
  });

  function setDeposit(event: ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    setState((prev) => ({ ...prev, deposit: value }));
    calculateSavings();
  }

  function setInterest(event: ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    setState((prev) => ({ ...prev, interestRate: value }));
    calculateSavings();
  }

  function setPeriod(event: ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    setState((prev) => ({ ...prev, period: value }));
    calculateSavings();
  }

  function calculateSavings() {
    let currentDay = dayjs();
    const endDay = currentDay.add(state.period, "year");

    let balance = 0;
    let interest = 0;
    const graphData: { label: string; balance: number; interest: number }[] =
      [];

    let accumulatedMonthlyInterest = 0;
    let count = 0;
    while (currentDay.isSameOrBefore(endDay) && count < 1000 * 365) {
      if (currentDay.day() === 0) balance += state.deposit;
      const interestRate = currentDay.isLeapYear()
        ? state.interestRate / 100 / 366
        : state.interestRate / 100 / 365;
      accumulatedMonthlyInterest += balance * interestRate;
      if (currentDay.date() === 1) {
        balance += accumulatedMonthlyInterest;
        interest += accumulatedMonthlyInterest;

        graphData.push({
          label: currentDay.format("MMM-YY"),
          balance,
          interest,
        });

        accumulatedMonthlyInterest = 0;
      }

      currentDay = currentDay.add(1, "day");
      count++;
    }
    console.log({ state });

    setState((prev) => ({
      ...prev,
      total: balance,
      totalInterest: interest,
      graphData,
    }));
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
                <InputGroup.Text>per week</InputGroup.Text>
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
