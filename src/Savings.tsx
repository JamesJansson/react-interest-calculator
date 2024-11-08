import { ChangeEvent, useEffect, useState } from "react";
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
  datasets: { label: string; data: string[] }[];
};

function Savings() {
  function emptyGraphData(): GraphData {
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

  const initialDeposit = 100;
  const initialInterestRate = 3.5;
  const initialPeriod = 25;

  const [deposit, setDeposit] = useState(initialDeposit);
  const [interestRate, setInterestRate] = useState(initialInterestRate);
  const [period, setPeriod] = useState(initialPeriod);
  const [, setFinalBalance] = useState(0);
  const [, setTotalInterest] = useState(25);
  const [graphData, setGraphData] = useState(emptyGraphData());

  function depositEvent(event: ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    setDeposit(value);
  }

  function interestRateEvent(event: ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    setInterestRate(value);
  }

  function periodEvent(event: ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    setPeriod(value);
  }

  useEffect(() => {
    calculateSavings();
  }, [deposit, interestRate, period]);

  function calculateSavings() {
    let currentDay = dayjs();
    const endDay = currentDay.add(period, "year");

    let balance = 0;
    let interest = 0;
    const gData = emptyGraphData();

    let accumulatedMonthlyInterest = 0;
    let count = 0;
    while (currentDay.isSameOrBefore(endDay) && count < 100 * 365) {
      if (currentDay.day() === 0) balance += deposit;
      const dailyInterestRate = currentDay.isLeapYear()
        ? interestRate / 100 / 366
        : interestRate / 100 / 365;
      accumulatedMonthlyInterest += balance * dailyInterestRate;
      if (currentDay.date() === 1) {
        balance += accumulatedMonthlyInterest;
        interest += accumulatedMonthlyInterest;

        gData.labels.push(currentDay.format("MMM-YY"));
        gData.datasets[0].data.push(balance.toFixed(2));
        gData.datasets[1].data.push(interest.toFixed(2));

        accumulatedMonthlyInterest = 0;
      }

      currentDay = currentDay.add(1, "day");
      count++;
    }

    setFinalBalance(balance);
    setTotalInterest(interest);
    setGraphData(gData);
  }

  return (
    <>
      <MainNavbar />
      <div className="main-section">
        <Container>
          <Row className="justify-content-center">
            <Col sm="12" md="4">
              <h2>Savings calculator</h2>

              <Form.Label>Deposit amount</Form.Label>
              <InputGroup className="mb-3" size="lg">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  aria-label="Weekly deposit amount"
                  onChange={depositEvent}
                  defaultValue={initialDeposit}
                  type="number"
                  min="0"
                />
                <InputGroup.Text>per week</InputGroup.Text>
              </InputGroup>

              <Form.Label>Interest rate</Form.Label>
              <InputGroup className="mb-3" size="lg">
                <Form.Control
                  aria-label="Interest rate"
                  onChange={interestRateEvent}
                  defaultValue={initialInterestRate}
                  type="number"
                  min="0"
                />
                <InputGroup.Text>%</InputGroup.Text>
              </InputGroup>

              <Form.Label>Savings period</Form.Label>
              <InputGroup className="mb-3" size="lg">
                <Form.Control
                  aria-label="Savings period"
                  onChange={periodEvent}
                  defaultValue={initialPeriod}
                  type="number"
                  min="0"
                />
                <InputGroup.Text>years</InputGroup.Text>
              </InputGroup>
            </Col>
            <Col sm="12" md="8" className="align-self-center">
              <Line data={graphData}></Line>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Savings;
