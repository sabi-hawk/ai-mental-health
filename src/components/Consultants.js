import React, { useState } from "react";

function Consultants() {
  const [consultants, setConsultants] = useState([
    {
      name: "Diane J Gores, LPC",
      picture:
        "https://d3ez4in977nymc.cloudfront.net/avatars/9ea05095e1216df435f4accad4d8603a.jpg",
    },
    {
      name: "Michal Collier",
      picture:
        "https://d3ez4in977nymc.cloudfront.net/avatars/80072eb7d37b7af514c34fa76f16a39a12484.jpg",
    },
    {
      name: "Aisha Holmes Thorn",
      picture:
        "https://d3ez4in977nymc.cloudfront.net/avatars/5591839a3488bde4d20939371a65dc8a13153.jpg",
    },
    {
      name: "Alan Swindall",
      picture:
        "https://d3ez4in977nymc.cloudfront.net/avatars/99005b7c49baba34978ff5a20ee4b30b.jpg",
    },
    {
      name: "David Thomas",
      picture:
        "https://d3ez4in977nymc.cloudfront.net/avatars/2835f397e8e67806ba31b7f733f38e33.jpg",
    },
    {
      name: "Cherie Hickey",
      picture:
        "https://d3ez4in977nymc.cloudfront.net/avatars/6c9f2ceb5f95964eebc977faece1ed9e.jpg",
    },
  ]);
  return (
    <div className="main-consultants">
      {consultants.map((consultant) => (
        <div className="card-main" key={consultant}>
          <img src={consultant.picture} className="img" />

          <span className="highlitedtext">Licensed</span>
          <span className="highlitedtext">Online Counseling</span>
          <span className="highlitedtext">Accepts International Clients</span>

          <h3>{consultant.name}</h3>

          <div className="description">
            <strong>Diane can help you with:</strong>
            <ul>
              <li>Stress</li>
              <li>Anxiety</li>
              <li>Anger management</li>
              <li>Self esteem</li>
              <li>Depression</li>
              <li>Coping with life changes</li>
              <li>Addictions</li>
              <li>LGBT</li>
              <li>Relationship issues</li>
              <li>Family conflicts</li>
              <li>Trauma and abuse</li>
              <li>Grief</li>
              <li>Intimacy-related issues</li>
              <li>Parenting issues</li>
              <li>Career difficulties</li>
              <li>Bipolar disorder</li>
              <li>Coaching</li>
              <li>Compassion fatigue</li>
              <li>ADHD</li>
            </ul>

            <a href="tel:123456789">
              <button className="btn-wrap">call now</button>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Consultants;
