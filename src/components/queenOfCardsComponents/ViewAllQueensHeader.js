import "./ViewAllQueensHeader.css";
import React from "react";

export default function ViewAllQueensHeader() {
  return (
    <div className="ViewAllQueensHeaderContainer">
      <div className="nameTitle">Name</div>
      <div className="mainSeasonTitle">Main Season</div>
      <div className="congenialTitle">Placement</div>
      <div className="maxiChallengeWinsTitle">Maxi Challenge Wins</div>
      <div className="WinsTitle">Wins</div>
    </div>
  );
}
