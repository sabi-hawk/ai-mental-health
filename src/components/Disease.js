import { Button, Progress, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Tiny } from "@ant-design/plots";
import Consultants from "./Consultants";

function Disease() {
  const { disease } = useParams();
  const [step, setStep] = useState(1);
  const [currentTest, setCurrentTest] = useState(undefined);
  const [currentScore, setCurrentScore] = useState(0);
  const [result, setResult] = useState(undefined);
  const config = {
    percent: currentScore / currentTest?.mobile_test_score_denominator,
    width: 140,
    height: 120,
    color: ["rgb(0, 0, 0, 0.5)", "#66AFF4"],
    annotations: [
      {
        type: "text",
        style: {
          text: `${currentScore} \n out of ${currentTest?.mobile_test_score_denominator}`,
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 16,
          fontStyle: "bold",
          // fontColor: "#fff",
        },
      },
    ],
  };

  const getTest = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/questions/${disease}`
      );
      setCurrentTest(data?.test);
    } catch (error) {
      console.log("Error Fetching Diseases");
    }
  };
  const [currentQuestion, setCurrentQuestion] = useState(1);
  useEffect(() => {
    getTest();
  }, []);

  const handleResult = () => {
    setStep(step + 1);
    const result = currentTest.results.find(
      (result) => currentScore >= result.lower && currentScore <= result.upper
    );
    setResult(result);
  };
  const handleOptionClick = (option) => {
    setCurrentScore(currentScore + option.score);
    if (currentQuestion < currentTest?.questions?.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep(step + 1);
    }
  };
  if (step === 1) {
    if (currentTest) {
      return (
        <div className="container-step-1 container">
          <h1 className="heading-1">FIND OUT IF YOU HAVE</h1>
          <h1 className="heading-2">{currentTest?.display_name}</h1>
          <p>
            Take this mental health test. It’s quick, free, and you’ll get your
            confidential results instantly.
          </p>
          <div className="btn-wrap">
            <Button onClick={() => setStep(step + 1)}>START TEST</Button>
          </div>
        </div>
      );
    } else {
      return <Spin tip="Loading" size="large"></Spin>;
    }
  } else if (step === 2) {
    return (
      <div className="container-step-2 container">
        <h1>{currentTest?.display_name} Test</h1>
        <div className="form-content">
          <div className="description">
            Thinking about the past 2 weeks, to what extent have you found the
            following things a problem? Tap “Continue” to start.
          </div>
          <div className="btn-wrap">
            <Button onClick={() => setStep(step + 1)}>CONTINUE</Button>
          </div>
        </div>
      </div>
    );
  } else if (step === 3) {
    return (
      <div className="container-step-3 container">
        <h1>{currentTest?.display_name} Test</h1>
        <div className="form-wrapper">
          <div className="header-form">
            <div className="info">
              {" "}
              STEP {currentQuestion} OF {currentTest?.questions?.length}
            </div>
            <div className="progress">
              <Progress
                percent={
                  (currentQuestion / currentTest?.questions?.length) * 100
                }
                showInfo={false}
              />
            </div>
          </div>
          <div className="body">
            <div
              className="question"
              dangerouslySetInnerHTML={{
                __html: currentTest.questions[currentQuestion - 1].text,
              }}
            />
            <div className="options">
              {currentTest.questions[currentQuestion - 1].responses.map(
                (response) => (
                  <Button
                    className="option"
                    onClick={() => handleOptionClick(response)}
                  >
                    {response.text}
                  </Button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (step === 4) {
    return (
      <div className="container-step-4 container">
        <h1>{currentTest?.display_name} Test</h1>
        <div className="form-content">
          <div className="description">
            Congratulations, you've completed the assessment
          </div>

          <div>
            <p>Tap below to get your results</p>
          </div>
          <div className="btn-wrap">
            <Button onClick={handleResult}>GET RESULTS</Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="container-step-5">
          <h5>YOUR RESULT IS</h5>
          <h2>{result?.web_result_title}</h2>
          <div className="container-step-5-inner">
            {/* Result: {currentScore} */}
            <div>
              {currentTest.results.map((result) => (
                <>
                  <h4>
                    {result.lower} - {result.upper}
                  </h4>
                  <h3>{result.web_result_title}</h3>
                </>
              ))}
            </div>
            <div className="ring">
              <Tiny.Ring {...config} />
            </div>
            <div>
              <p>{result?.mobile_result_copy}</p>
            </div>
          </div>
        </div>
        <Consultants />
      </>
    );
  }
}

export default Disease;
