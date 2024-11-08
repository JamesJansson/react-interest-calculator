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
      ],
    };
  }

  const initialLoanAmount = 750000;
  const initialInterestRate = 5.5;
  const initialPeriod = 30;

  const [loanAmount, setLoanAmount] = useState(initialLoanAmount);
  const [interestRate, setInterestRate] = useState(initialInterestRate);
  const [period, setPeriod] = useState(initialPeriod);
  const [monthlyRepayment, setMonthlyRepayment] = useState(0);
  const [totalRepayments, setTotalRepayments] = useState(0);
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
    if (loanAmount <= 0 || period <= 0 || interestRate < 0) return;

    const minimumRepayment = loanAmount / 12 / period; // No interest level
    const maximumInterest = loanAmount * (interestRate / 100 / 12);

    let repayment = minimumRepayment;
    let bestCase:
      | undefined
      | {
          graphData: GraphData;
          totalInterest: number;
          totalPayment: number;
          balance: number;
          repayment: number;
        } = undefined;
    let count = 0;
    while (repayment <= minimumRepayment + maximumInterest && !bestCase) {
      count++;

      const result = calculateLoan({
        loanAmount,
        interestRate,
        period,
        repayment,
      });

      console.log({
        count,
        repayment,
        minimumRepayment,
        maximumInterest,
        balance: result.balance,
      });

      if (result.balance === 0) bestCase = { ...result, repayment };

      repayment += maximumInterest / 100;
    }

    if (bestCase) {
      setMonthlyRepayment(repayment);
      setTotalInterest(bestCase.totalInterest);
      setTotalRepayments(bestCase.totalPayment);
      setTotalInterest(bestCase.totalInterest);
      setGraphData(bestCase.graphData);
    }
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
    const gData = emptyGraphData();
    let balance = loanAmount;
    let totalPayment = 0;
    let totalInterest = 0;
    let month = 0;
    let year = 0;
    while (year < period && year <= 100 && balance > 0) {
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

      if (month === 0 || balance === 0) {
        if (
          balance == 0 &&
          gData.labels[gData.labels.length - 1] === "Year " + year
        ) {
          gData.labels.push("Year " + (year + 1));
        } else {
          gData.labels.push("Year " + year);
        }
        gData.datasets[0].data.push(balance.toFixed(2));
      }

      month++;
      if (month === 12) {
        year++;
        month = 0;
      }
    }

    return { totalInterest, totalPayment, balance, graphData: gData };
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
                  type="number"
                  min="0"
                />
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

              <Form.Label>Loan period</Form.Label>
              <InputGroup className="mb-3" size="lg">
                <Form.Control
                  aria-label="Loan period"
                  onChange={periodEvent}
                  defaultValue={initialPeriod}
                  type="number"
                  min="0"
                />
                <InputGroup.Text>years</InputGroup.Text>
              </InputGroup>

              <Form.Label>Monthly repayment</Form.Label>
              <InputGroup className="mb-3" size="lg">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  aria-label="Monthly repayment"
                  value={new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(monthlyRepayment)}
                  readOnly
                />
              </InputGroup>

              <Form.Label>Total repayment</Form.Label>
              <InputGroup className="mb-3" size="lg">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  aria-label="Total repayment"
                  value={new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(totalRepayments)}
                  readOnly
                />
              </InputGroup>

              <Form.Label>Total interest</Form.Label>
              <InputGroup className="mb-3" size="lg">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  aria-label="Total interest"
                  value={new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(totalInterest)}
                  readOnly
                />
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
