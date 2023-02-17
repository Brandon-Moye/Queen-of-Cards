import "../queenOfCardsComponents/CardDisplay.css";
import { render } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";

export default function CardDisplays(props) {
  const [removingQueenFramerState, setRemovingQueenFramerState] =
    useState(false);
  return (
    <div className="cardDisplayContainer">
      {/* <motion.div
        key="card"
        className="card"
        animate={{ scale: 1 }}
        initial={{ scale: 0 }}
        exit={{ scale: 0 }}
      > */}
      <div className="queenCardImageContainer">
        <img
          className="cardQueenImageProp"
          src={props.certainItem.queenImage}
        ></img>
      </div>
      <div className="cardQuenInfoTextContainer">
        <div className="cardQueenNameProp">
          <div className="cardQueenNameContrastForCheckerProp">
            <strong>{props.certainItem.dragName}</strong>
          </div>
        </div>
        <div className="queenStatsWithoutNameContainer">
          <div className="cardQueenWinnerProp">
            <strong>Season:</strong> {props.certainItem.mainSeasonAppearedOn}
          </div>
          <div className="cardQueenHomepageProp">
            <strong>Placement: </strong>
            {props.certainItem.mainSeasonPlacement}
          </div>
          <div className="cardQueenCongenialProp">
            <strong>Challenge Wins: </strong>
            {props.certainItem.mainSeasonChallengeWins}
          </div>
          <a
            className="cardQueenLinkProp"
            href={props.certainItem.queenHomepage}
            target="_blank"
          >
            Go to Page
          </a>
        </div>
      </div>

      <div className="buttonContainer">
        {/* <button
            className="btn2 test-completed2"
            onClick={() => {
              props.handleClick(props.certainItem.selectedQueenId);
            }}
          ></button> */}
        <button
          className="btn2"
          onClick={() => {
            props.handleClick(props.certainItem.uid);
          }}
        >
          Sashay Away
        </button>
      </div>
      {/* </motion.div> */}
    </div>
  );
}
