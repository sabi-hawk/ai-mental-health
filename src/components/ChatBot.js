import React, { useEffect, useState } from "react";
import { Button, Col, Row, Skeleton } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChatBot = () => {
  const [diseases, setDiseases] = useState([]);
  const [showMore, setShowMore] = useState(true);
  // const displayedList = showMore ? diseases.slice(0, 4) : diseases;
  const columns = Array.from({ length: 5 });
  const navigate = useNavigate();

  const getDiseases = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/disease");
      setDiseases(data?.diseaseList);
    } catch (error) {
      console.log("Error Fetching Diseases");
    }
  };

  useEffect(() => {
    getDiseases();
  }, []);

  return (
    <div className="chatbot-wrap container">
      <div className="text-content">
        <h1 className="headingstyle fullhead">
          MAKE SENSE OF YOUR MENTAL HEALTH SYMPTOMS
        </h1>
        <p>
          Taking a self-administered mental health test is one of the quickest
          and easiest ways to determine if you are experiencing symptoms of a
          mental health condition.
        </p>
      </div>
      {diseases.length > 0 ? (
        <Row gutter={16} className="row-diseases">
          {diseases?.map((dis, index) => (
            <Col
              className="col-diseases"
              key={index}
              span={6}
              onClick={() => navigate(`/chatbot/${dis?.name}`)}
            >
              <div className="img-container">
                <img src={dis.imageUrl} className="image" />
                <h2>{dis.displayName}</h2>
              </div>
            </Col>
          ))}
          {/* <Col className="col-show-more" span={8}>
            <Button onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show More" : "Show Less"}
            </Button>
          </Col> */}
        </Row>
      ) : (
        <Row gutter={16} className="row-diseases">
          {columns.map((_, index) => (
            <Col key={index} className="skeleton-column" span={8}>
              <Skeleton.Image active />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ChatBot;
