import "../queenOfCardsComponents/CardDisplay.css";
import { render } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";

export default function CardDisplays(props) {

  const cardContainerRef = useRef(null)
  const [isInRemoveTransition, setIsInRemoveTransition] = useState(false);

  useEffect(() => {
    if(isInRemoveTransition) {
      setIsInRemoveTransition(false);
      cardContainerRef.current.classList.add('cardDisplayContainerExitAnimation')
      cardContainerRef.current.addEventListener('animationend', () => {
        props.handleClick(props.certainItem.uid);
        console.log(props.certainItem.uid);
        console.log('i tried to delete it');
        console.log(isInRemoveTransition);

      })
    }
  }, [isInRemoveTransition])

  return (
    // <div className="cardDisplayContainer">
    <div
      className={
        props.minimizedCardDisplays
          ? "cardDisplayContainer minimizedCardDisplayContainer cardDisplayContainerEntranceAnimation"
          : "cardDisplayContainer cardDisplayContainerEntranceAnimation"
      }
      ref={cardContainerRef}
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
        <button
          className="btn2"
          onClick={() => {
            // props.handleClick(props.certainItem.uid);
            setIsInRemoveTransition(true);
          }}
        >
          Sashay Away
        </button>
      </div>
    </div>
  );
}
