import "./viewAllQueens.css";
import React from "react";

export default function ViewAllQueens(props) {
  return (
    <div className="queenContainer">
      <div className="ViewAllQueensContainer">
        <a
          href={props.item.queenHomepage}
          className="queenNameInGrid gridCell"
          target="_blank"
        >
          <strong>{props.item.dragName}</strong>
        </a>
        <div className="gridCell mainSeasonAppearedOnProp">
          {props.item.mainSeasonAppearedOn}
        </div>
        <div className="gridCell mainSeasonPlacement">
          {props.item.mainSeasonPlacement}
        </div>
        <div className="gridCell mainSeasonChallengeWins">
          {props.item.mainSeasonChallengeWins}
        </div>
        <div className="buttonContainerForShante">
          <button
            className="btn test-completed"
            onClick={() => {
              props.handleClick(props.item.uid);
            }}
          >
            <div className="buttonTextContainer">
              {/* <span className="shantayButtonText">Shantay</span>
            <span className="youStayButtonText">You Stay</span> */}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
