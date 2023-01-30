import "./ViewAllQueensHeader.css";
import React from "react";

export default function ViewAllQueensHeader() {
  return (
    <div className="ViewAllQueensHeaderContainer">
      <div className="nameTitle">Name</div>
      <div className="winnerTitle">Main Season</div>
      <div className="congenialTitle">Placement</div>
      <div className="addQueenTitle">Maxi Challenge Wins</div>
    </div>
  );
}
