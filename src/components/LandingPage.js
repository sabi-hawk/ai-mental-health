import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="brief-into">
        <h1 className="headingstyle">
          MAKE SENSE OF YOUR MENTAL HEALTH SYMPTOMS
        </h1>
        <p>
          Taking a self-administered mental health test is one of the quickest
          and easiest ways to determine if you are experiencing symptoms of a
          mental health condition.
        </p>
      </div>
      <div className="body-content">
        <div
          className="consultant-container"
          onClick={() => navigate("/consultants")}
        >
          <div className="consultant" />
          <div className="title">
            <h2>Consultant</h2>
          </div>
        </div>
        <div className="chatbot-container" onClick={() => navigate("/chatbot")}>
          <div className="chatbot" />
          <div className="title">
            <h2>ChatBot</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
