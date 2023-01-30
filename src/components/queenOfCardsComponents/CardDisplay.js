import "../queenOfCardsComponents/CardDisplay.css";
import React from "react";

export default function CardDisplays(props) {
  return (
    <div className="cardDisplayContainer">
      <div className="card">
        <img
          className="cardQueenImageProp"
          src={props.certainItem.selectedQueenImage}
        ></img>
        <div className="cardQueenNameProp">
          <strong>{props.certainItem.selectedQueenDragName}</strong>
        </div>
        <div className="cardQueenWinnerProp">
          <strong>Season:</strong>{" "}
          {props.certainItem.selectedQueenSeasonAppearedOn}
        </div>
        <div className="cardQueenHomepageProp">
          <strong>Placement:</strong>
          {props.certainItem.selectedQueenMainSeasonPlacement}
        </div>
        <div className="cardQueenCongenialProp">
          <strong>Challenge Wins: </strong>
          {props.certainItem.selectedQueenMainSeasonChallengeWins}
        </div>
        <a
          className="cardQueenQuoteProp"
          href={props.certainItem.selectedQueenHomepage}
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
        </div>
      </div>
    </div>
  );
}
