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
import { Line } from "react-chartjs-2";
import "chart.js/auto";

dayjs.extend(isSameOrBefore);
dayjs.extend(isLeapYear);

type GraphData = {
  labels: string[];
  datasets: { label: string; data: number[] }[];
};

function Savings() {
  function emptyData(): GraphData {
    return {
      labels: [],
      datasets: [
        {
          label: "Balance",
          data: [],
        },
        {
          label: "Interest",
          data: [],
        },
      ],
    };
  }

  const [state, setState] = useState<{
    deposit: number;
    interestRate: number;
    period: number;
    total: number;
    totalInterest: number;
    graphData: GraphData;
  }>({
    deposit: 100,
    interestRate: 4.5,
    period: 30,
    total: 0,
    totalInterest: 0,
    graphData: emptyData(),
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
    const graphData = emptyData();

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

        graphData.labels.push(currentDay.format("MMM-YY"));
        graphData.datasets[0].data.push(balance);
        graphData.datasets[1].data.push(interest);

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
            <Col sm="12" md="4">
              <h2>Savings calculator</h2>
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
            <Col sm="12" md="8" className="align-self-center">
              <Line data={state.graphData}></Line>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Savings;
