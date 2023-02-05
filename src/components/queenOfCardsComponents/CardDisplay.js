import "../queenOfCardsComponents/CardDisplay.css";
import React from "react";

export default function CardDisplays(props) {
  return (
    <div className="cardDisplayContainer">
      <div className="card">
        <img
          className="cardQueenImageProp"
          src={props.certainItem.queenImage}
        ></img>
        <div className="cardQueenNameProp">
          <strong>{props.certainItem.dragName}</strong>
        </div>
        <div className="cardQueenWinnerProp">
          <strong>Season:</strong> {props.certainItem.mainSeasonAppearedOn}
        </div>
        <div className="cardQueenHomepageProp">
          <strong>Placement:</strong>
          {props.certainItem.mainSeasonPlacement}
        </div>
        <div className="cardQueenCongenialProp">
          <strong>Challenge Wins: </strong>
          {props.certainItem.mainSeasonChallengeWins}
        </div>
        <a
          className="cardQueenQuoteProp"
          href={props.certainItem.queenHomepage}
          target="_blank"
        >
          Link to Page
        </a>
        <div className="buttonContainer">
          {/* <button
            className="btn2 test-completed2"
            onClick={() => {
              props.handleClick(props.certainItem.selectedQueenId);
            }}
          ></button> */}
          <button
            className="btn test-completed"
            onClick={() => {
              props.handleClick(props.certainItem.dragName);
            }}
          ></button>
        </div>
      </div>
    </div>
  );
}
