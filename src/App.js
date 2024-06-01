import { Routes, Route, Navigate } from "react-router-dom";
import { Row } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./scss/index.scss";
import Consultants from "./components/Consultants";
import ChatBot from "./components/ChatBot";
import Disease from "./components/Disease";
import LandingPage from "./components/LandingPage";

const App = () => {
  return (
    <>
      <Row className="un-auth-wrapper">
        <Row className="header">
          <i className="icon-main" />
          <h3>AI MENTAL HEALTH</h3>
        </Row>
        <Row className="row-body">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/consultants" element={<Consultants />} />
            <Route path="/chatbot" element={<ChatBot />} />
            <Route path="/chatbot/:disease" element={<Disease />} />
            <Route path="*" element={<Navigate to="../" />} />
          </Routes>
        </Row>
      </Row>
      <ToastContainer position="top-center" />
    </>
  );
};
export default App;
