import "../queenOfCardsComponents/CardDisplay.css";
import { render } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";

export default function CardDisplays(props) {
  // window.addEventListener("scroll", function (event) {
  //   let scroll = this.scrollY;
  //   let minimizedCardDisplays = false;
  //   if (scroll > 200) {
  //     minimizedCardDisplays = true;
  //     console.log(minimizedCardDisplays);
  //   } else {
  //     minimizedCardDisplays = false;
  //   }
  // });
  return (
    // <div className="cardDisplayContainer">
    <div
      className={
        props.minimizedCardDisplays
          ? "cardDisplayContainer minimizedCardDisplayContainer"
          : "cardDisplayContainer"
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
        <div className="cardQueenNameProp">
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
            props.handleClick(props.certainItem.uid);
            props.entranceAnimation = false;
          }}
        >
          Sashay Away
        </button>
      </div>
    </div>
  );
}
