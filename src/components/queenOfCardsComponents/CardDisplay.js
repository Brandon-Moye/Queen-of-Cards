import "../queenOfCardsComponents/CardDisplay.css";
import { render } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";

export default function CardDisplays(props) {
  const grid = document.querySelector('.cardDisplayContainer');
  const deleteQueenButton = document.querySelector('.btn2');
  // grid.classList.add('cardDisplayContainerEntranceAnimation');
  
  const shmee = React.useRef();

  // shmee.current

  const [isInRemoveTransition, setIsInRemoveTransition] = React.useState(false);

  React.useEffect(() => {
    if (isInRemoveTransition) {
      shmee.current.addEventListener('transitionend', () => {
        props.handleDelete(props.uid);
        // call a callback
        // or set state
        // indiciating that the transition is over so that your other code can actually remove this queen
      });
    }
  }, [isInRemoveTransition]);
  
  return (
    // <div className="cardDisplayContainer">
    <div
      ref={shmee}
      className={
        props.minimizedCardDisplays
          ? "cardDisplayContainer minimizedCardDisplayContainer"
          : "cardDisplayContainer cardDisplayContainerEntranceAnimation"
      }
    >
      <div
        className={
          props.minimizedCardDisplays
            ? "queenCardImageContainer minimizedQueenCardImageContainer"
            : "queenCardImageContainer"
        }
      >
        <img
          className={
            props.minimizedCardDisplays
              ? "cardQueenImageProp minimizedCardQueenImageProp"
              : "cardQueenImageProp"
          }
          src={props.certainItem.queenImage}
        ></img>
      </div>
      <div className="cardQueenInfoTextContainer">
        <div
          className={
            props.minimizedCardDisplays
              ? "cardQueenNameProp minimizedCardQueenNameProp"
              : "cardQueenNameProp"
          }
        >
          <strong>{props.certainItem.dragName}</strong>
        </div>
        <div className="queenStatsWithoutNameContainer">
          <div className="cardQueenSeasonProp">
            <strong>Season:</strong> {props.certainItem.mainSeasonAppearedOn}
          </div>
          <div className="cardQueenHomepageProp cardQueenPlacementProp">
            <strong>Placement: </strong>
            {props.certainItem.mainSeasonPlacement}
          </div>
          <div className="cardQueenChallengeWinsProp">
            <strong>Challenge Wins: </strong>
            {props.certainItem.mainSeasonChallengeWins}
          </div>
          <a
            // className="cardQueenLinkProp"
            className={
              props.minimizedCardDisplays
                ? "cardQueenLinkProp minimizedCardQueenLinkProp"
                : "cardQueenLinkProp"
            }
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
            // do this first
            setIsInRemoveTransition(true);
          }}
        >
          Sashay Away
        </button>
      </div>
    </div>
  );
}
