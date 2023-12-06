import React from "react";
import "../styles/main-card.css";

const MainCards = ({ data={}, handleClick }) => {
  return (
    <div className="card" onClick={() => handleClick(data?.id)}>
      <h2 className="card-title">{data?.username}</h2>
    </div>
  );
};

export default MainCards;
