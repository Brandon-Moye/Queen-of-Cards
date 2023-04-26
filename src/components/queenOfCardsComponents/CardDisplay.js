import "../queenOfCardsComponents/CardDisplay.css";
import { render } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";
import { isReactNative } from "@firebase/util";

export default function CardDisplays(props) {

  const cardContainerRef = useRef();
  const [isInRemoveTransition, setIsInRemoveTransition] = useState(false);


  // ------------ half works code , not perfect but save ------------------------------------------------

  // const handleCardClick = (uid) => {
  //   // const index = stuu.findIndex(item => item.uid === uid);

  //     // setStuu(prevState => [...prevState, {uid, stuu: true}])
  //     stuu.push({uid, stuu: false})
  //     console.log(stuu)
  //     // console.log(stuu[0]);
  //     const index = stuu[0];
  //     console.log(index);


  //     setStuu(prevState => {
  //       const newState = [...prevState];
  //       console.log(newState);
  //       newState.stuu = !newState.stuu;
  //       console.log(newState);
  //       return newState;
  //     })
  // };


  

  //---------------------------------------------------------------

  const handleCardClick = (uid) => {  
        const cardRef = cardContainerRef.current;
          cardRef.classList.add("cardDisplayContainerExitAnimation");
          cardRef.addEventListener("animationend", function onAnimationEnd() {
            if(cardRef.classList.contains("cardDisplayContainerExitAnimation")) {
              cardRef.classList.remove("cardDisplayContainerExitAnimation")
            }
            props.handleClick(props.certainItem.uid);

          });
  };

  return (
    // <div className="cardDisplayContainer">
    <div
      id={`${props.certainItem.uid}`}
      // className={
      //   props.minimizedCardDisplays
      //     ? "cardDisplayContainer minimizedCardDisplayContainer cardDisplayContainerEntranceAnimation"
      //     : "cardDisplayContainer cardDisplayContainerEntranceAnimation"
      // }
      className="cardDisplayContainer cardDisplayContainerEntranceAnimation"
      ref={cardContainerRef}
    >
      <div
        // className={
        //   props.minimizedCardDisplays
        //     ? "queenCardImageContainer minimizedQueenCardImageContainer"
        //     : "queenCardImageContainer"
        // }
        className="queenCardImageContainer"
      >
        <img
          // className={
          //   props.minimizedCardDisplays
          //     ? "cardQueenImageProp minimizedCardQueenImageProp"
          //     : "cardQueenImageProp"
          // }
          className="cardQueenImageProp"
          src={props.certainItem.queenImage}
        ></img>
      </div>
      <div className="cardQueenInfoTextContainer">
        <div
          // className={
          //   props.minimizedCardDisplays
          //     ? "cardQueenNameProp minimizedCardQueenNameProp"
          //     : "cardQueenNameProp"
          // }
          className="cardQueenNameProp"
        >
          <strong>{props.certainItem.dragName}</strong>
        </div>
        <div 
        // className={props.minimizedCardDisplays ? "queenStatsWithoutNameContainer minimizedqueenStatsWithoutNameContainer" : "queenStatsWithoutNameContainer" }
        classNam="queenStatsWithoutNameContainer"
        >
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
            className="cardQueenLinkProp"
            // className={
            //   props.minimizedCardDisplays
            //     ? "cardQueenLinkProp minimizedCardQueenLinkProp"
            //     : "cardQueenLinkProp"
            // }
            href={props.certainItem.queenHomepage}
            target="_blank"
          >
            Go to Page
          </a>
        </div>
      </div>

      <div 
      // className={props.minimizedCardDisplays ? "buttonContainer minimizedButtonContainer" : "buttonContainer"}
      className="buttonContainer"
      >
        <button
          className="btn2"
          onClick={() => {
            // props.handleClick(props.certainItem.uid);
            // setIsInRemoveTransition(true);
            handleCardClick(props.certainItem.uid);
          }}
        >
          Sashay Away
        </button>
      </div>
    </div>
  );
}
