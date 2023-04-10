import "../queenOfCardsComponents/CardDisplay.css";
import { render } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";
import { isReactNative } from "@firebase/util";

export default function CardDisplays(props) {

  const cardContainerRef = useRef(null)
  const [isInRemoveTransition, setIsInRemoveTransition] = useState(false);
  const [stuu, setStuu] = useState([]);


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


    const useToRemove  = ({uid, stuu: false})

    // setStuu(prevState => {
    //   const updatedState = prevState.map(item => {
    //     if(item.uid === uid) {
    //       return {...item, stuu: false}
    //     }
    //   })
    // })

    console.log(stuu);
      const item = useToRemove;
      if (!item.stuu) {
        const cardRef = document.getElementById(item.uid)
        console.log(cardRef)
        if(cardRef !== null) {
          cardRef.classList.add("cardDisplayContainerExitAnimation");
          cardRef.addEventListener("animationend", () => {
            props.handleClick(item.uid);
            // handleAnimationEnd(item.uid);
            if(cardRef.classList.contains("cardDisplayContainerExitAnimation")) {
              cardRef.classList.remove("cardDisplayContainerExitAnimation")
            }
          }, { once: true }); // Use { once: true } to ensure the event listener is removed after it's triggered
        }
      }
  };

//code with my variation and testing below --------------------
  // const handleCardClick = (uid) => {
  //   setStuu(stuu.map(["clicked"]))
  //   console.log(stuu);

  //   setStuu(prevState => {
  //     prevState.map(item => {
  //       if(item.uid === uid) {
  //         return {...item, stuu: true};
  //       }
  //       return item
  //     })
      
  //   })
    
  // }

  // useEffect(() => {
  //   // const handleAnimationEnd = (uid) => {
  //   //   setStuu(prevState => prevState.filter(item => item.uid !== uid));
  //   // }
  
  //   for (let i = 0; i < stuu.length; i++) {
  //     const item = stuu[i];
  //     if (!item.stuu) {
  //       const cardRef = document.getElementById(item.uid)
  //       if(cardRef !== null) {
  //         cardRef.classList.add("cardDisplayContainerExitAnimation");
  //         cardRef.addEventListener("animationend", () => {
  //           props.handleClick(item.uid);
  //           // handleAnimationEnd(item.uid);
  //         }, { once: true }); // Use { once: true } to ensure the event listener is removed after it's triggered
  //       }
  //     }
  //   }
  // }, []);


  // ------------ half works code , not perfect but save ------------------------------------------------
  // useEffect(() => {
  //   // const handleAnimationEnd = (uid) => {
  //   //   setStuu(prevState => prevState.filter(item => item.uid !== uid));
  //   // }
  //   stuu.forEach(item => {
  //     console.log(item.stuu);
  //     if (!item.stuu) {
  //       console.log(item.uid);
  //       const cardRef = document.getElementById(item.uid)
  //       if(cardRef !== null) {
  //         cardRef.classList.add("cardDisplayContainerExitAnimation");
  //         console.log(cardRef);
  //         cardRef.addEventListener("animationend", () => {
  //           props.handleClick(props.certainItem.uid);
  //           // handleAnimationEnd(props.item.uid);
            
  //         })
  //       }

  //     }
  //   })
  // }, [stuu])
  // ------------------------------------------------------------------------

  // useEffect(() => {
  //   if(isInRemoveTransition) {

  //     cardContainerRef.current.classList.add('cardDisplayContainerExitAnimation')
  //     cardContainerRef.current.addEventListener('animationend', () => {
  //       props.handleClick(props.certainItem.uid);
  //       console.log(props.certainItem.uid);
  //       console.log('i tried to delete it');
  //       console.log(isInRemoveTransition);
  //     })

  //   }
  // }, [isInRemoveTransition])

  // useEffect(() => {
  //   setIsInRemoveTransition(false);
  // })

  return (
    // <div className="cardDisplayContainer">
    <div
      id={`${props.certainItem.uid}`}
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
