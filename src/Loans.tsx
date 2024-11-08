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

function Loans() {
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

  const initialLoanAmount = 100;
  const initialInterestRate = 5.5;
  const initialPeriod = 30;

  const [loanAmount, setLoanAmount] = useState(initialLoanAmount);
  const [interestRate, setInterestRate] = useState(initialInterestRate);
  const [period, setPeriod] = useState(initialPeriod);
  const [monthlyPayments, setMonthlyPayments] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalInterest, setTotalInterest] = useState(25);
  const [graphData, setGraphData] = useState(emptyGraphData());

  function loanAmountEvent(event: ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    setLoanAmount(value);
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
    calculateAndGraphLoan();
  }, [loanAmount, interestRate, period]);

  function calculateAndGraphLoan() {
    let currentDay = dayjs();
    const endDay = currentDay.add(period, "year");

    let balance = 0;
    let interest = 0;
    const gData = emptyGraphData();

    let accumulatedMonthlyInterest = 0;
    let count = 0;
    while (currentDay.isSameOrBefore(endDay) && count < 100 * 365) {
      if (currentDay.day() === 0) balance += loanAmount;
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

    setTotalPayments(balance);
    setTotalInterest(interest);
    setGraphData(gData);
  }

  function calculateLoan({
    loanAmount,
    interestRate,
    period,
    repayment,
  }: {
    loanAmount: number;
    interestRate: number;
    period: number;
    repayment: number;
  }) {
    const monthlyInterestRate = interestRate / 12 / 100;

    let balance = loanAmount;
    let totalPayment = 0;
    let totalInterest = 0;
    let month = 0;
    let year = 0;
    while (year <= period && year < 100 && balance > 0) {
      const interest = balance * monthlyInterestRate;

      balance += interest;
      totalInterest += interest;

      if (balance > repayment) {
        totalPayment += repayment;
        balance -= repayment;
      } else {
        totalPayment += balance;
        balance = 0;
      }

      balance = month++;
      if (month === 12) {
        year++;
        month = 0;
      }
    }

    return { totalInterest, totalPayment };
  }

  return (
    <>
      <MainNavbar />
      <div className="main-section">
        <Container>
          <Row className="justify-content-center">
            <Col sm="12" md="4">
              <h2>Loan calculator</h2>

              <Form.Label>Loan amount</Form.Label>
              <InputGroup className="mb-3" size="lg">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  aria-label="Loan amount"
                  onChange={loanAmountEvent}
                  defaultValue={initialLoanAmount}
                />
              </InputGroup>

              <Form.Label>Interest rate</Form.Label>
              <InputGroup className="mb-3" size="lg">
                <Form.Control
                  aria-label="Interest rate"
                  onChange={interestRateEvent}
                  defaultValue={initialInterestRate}
                />
                <InputGroup.Text>%</InputGroup.Text>
              </InputGroup>

              <Form.Label>Loan period</Form.Label>
              <InputGroup className="mb-3" size="lg">
                <Form.Control
                  aria-label="Loan period"
                  onChange={periodEvent}
                  defaultValue={initialPeriod}
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

export default Loans;
