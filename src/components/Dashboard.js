import React, { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../Firebase";
import { auth } from "../Firebase";
import { uid } from "uid";
import { set, ref, onValue, remove } from "firebase/database";

import CardDisplays from "./queenOfCardsComponents/CardDisplay";
import ViewAllQueens from "./queenOfCardsComponents/ViewAllQueens";
import viewAllQueensHeader from "./queenOfCardsComponents/ViewAllQueensHeader";
import ViewAllQueensHeader from "./queenOfCardsComponents/ViewAllQueensHeader";
const queenDatabase = [
  {
    uid: 1,
    dragName: "Jade",
    mainSeasonAppearedOn: "1",
    mainSeasonPlacement: "6",
    mainSeasonChallengeWins: "0",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/e4/JadePromoHD.png/revision/latest/scale-to-width-down/333?cb=20170712132559",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Jade",
  },
  {
    uid: 2,
    dragName: "Ongina",
    mainSeasonAppearedOn: "1",
    mainSeasonPlacement: "5",
    mainSeasonChallengeWins: "2",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/0/0d/OnginaAllStars5.jpg/revision/latest/scale-to-width-down/350?cb=20200508170217",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Ongina",
  },
  {
    uid: 3,
    dragName: "Nina Flowers",
    mainSeasonAppearedOn: "1",
    mainSeasonPlacement: "2",
    mainSeasonChallengeWins: "1",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/9/92/Nina_Flowers_All_Stars.jpg/revision/latest/scale-to-width-down/333?cb=20210906195526",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Nina_Flowers",
  },
  {
    dragName: "BeBe Zahara Benet",
    mainSeasonAppearedOn: "1",
    mainSeasonPlacement: "1",
    mainSeasonChallengeWins: "2",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/ea/BeBeAS3Promo.png/revision/latest/scale-to-width-down/333?cb=20181021181328",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/BeBe_Zahara_Benet",
  },
  {
    dragName: "Rebecca Glasscock",
    mainSeasonAppearedOn: "1",
    mainSeasonPlacement: "3",
    mainSeasonChallengeWins: "1",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/c/ce/RebeccaPromoHD.png/revision/latest/scale-to-width-down/333?cb=20170712132453",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Rebecca_Glasscock",
  },
  {
    dragName: "Victoria Parker",
    mainSeasonAppearedOn: "1",
    mainSeasonPlacement: "9",
    mainSeasonChallengeWins: "0",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/4/47/VictoriaPromoHD.png/revision/latest/scale-to-width-down/333?cb=20170712132542",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Victoria_Parker",
  },
  {
    dragName: "Shannel",
    mainSeasonAppearedOn: "1",
    mainSeasonPlacement: "4",
    mainSeasonChallengeWins: "0",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/b/ba/Shannel_All_Stars.jpg/revision/latest/scale-to-width-down/333?cb=20210906195703",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Shannel",
  },
  {
    dragName: "Tammie Brown",
    mainSeasonAppearedOn: "1",
    mainSeasonPlacement: "8",
    mainSeasonChallengeWins: "0",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/a/a8/Tammie_Brown_All_Stars.jpg/revision/latest/scale-to-width-down/333?cb=20210906195713",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Tammie_Brown",
  },
  {
    dragName: "Akashia",
    mainSeasonAppearedOn: "1",
    mainSeasonPlacement: "7",
    mainSeasonChallengeWins: "0",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/8/8a/AkashiaPromoHD.png/revision/latest/scale-to-width-down/333?cb=20170712132526",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Akashia",
  },
];

export default function Dashboard() {
  const [error, setError] = useState("");
  // const [mySelectedQueen, setMySelectedQueen] = useState("");
  // const [mySelectedQueens, setMySelectedQueens] = useState([]);
  // const [mySelectedQueenTrial, setMySelectedQueenTrial] = useState([]);
  // const [mySelectedQueenTrials, setMySelectedQueenTrials] = useState([]);
  const [mySelectedQueenTrialName, setMySelectedQueenTrialName] = useState([]);
  const [mySelectedQueenTrialNames, setMySelectedQueenTrialNames] = useState(
    []
  );
  // const [
  //   mySelectedQueenTrialSeasonAppearedOn,
  //   setMySelectedQueenTrialSeasonAppearedOn,
  // ] = useState([]);
  // const [
  //   mySelectedQueenTrialMainSeasonPlacement,
  //   setMySelectedQueenTrialMainSeasonPlacement,
  // ] = useState([]);
  // const [
  //   mySelectedQueenTrialMainSeasonChallengeWins,
  //   setMySelectedQueenTrialMainSeasonChallengeWins,
  // ] = useState([]);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }
  //--------------------------------------------------------------------
  // ------------ OLD MAPPING CODE TO COMPONENTS BELOW -----------------
  //--------------------------------------------------------------------
  function addNewQueen(dragNameProp) {
    const findSelectedQueen = queenDatabase.find(function (
      theQueenThatIsCurrentlyBeingIndexed
    ) {
      return theQueenThatIsCurrentlyBeingIndexed.dragName === dragNameProp;
    });
    const newQueen = {
      // selectedQueenImage: findSelectedQueen.queenImage,
      selectedQueenDragName: findSelectedQueen.dragName,
      selectedQueenSeasonAppearedOn: findSelectedQueen.mainSeasonAppearedOn,
      selectedQueenMainSeasonPlacement: findSelectedQueen.mainSeasonPlacement,
      selectedQueenMainSeasonChallengeWins:
        findSelectedQueen.mainSeasonChallengeWins,
      selectedQueenHomepage: findSelectedQueen.queenHomepage,
    };
    // setMySelectedQueenTrial((prevQueen) => [...prevQueen, newQueen]);
  }

  // console.log(mySelectedQueenTrial);

  // const myQueenElements = mySelectedQueenTrial.map((certainItem) => {
  //   return <CardDisplays certainItem={certainItem} />;
  // });

  const gridQueenElements = queenDatabase.map((item) => {
    return <ViewAllQueens item={item} handleClick={writeToDatabase} />;
  });

  //--------------------------------------------------------------------
  // ------------ ^OLD MAPPING CODE TO COMPONENTS ABOVE^ ---------------
  //--------------------------------------------------------------------

  //--------------------------------------------------------------------
  // ------------ FIREBASE CODE BELOW ----------------------------------
  //--------------------------------------------------------------------

  //WRITE
  function writeToDatabase(dragNameProp) {
    const findSelectedQueen = queenDatabase.find(function (
      theQueenThatIsCurrentlyBeingIndexed
    ) {
      return theQueenThatIsCurrentlyBeingIndexed.dragName === dragNameProp;
    });
    const newQueen = {
      selectedQueenImage: findSelectedQueen.queenImage,
      selectedQueenDragName: findSelectedQueen.dragName,
      selectedQueenSeasonAppearedOn: findSelectedQueen.mainSeasonAppearedOn,
      selectedQueenMainSeasonPlacement: findSelectedQueen.mainSeasonPlacement,
      selectedQueenMainSeasonChallengeWins:
        findSelectedQueen.mainSeasonChallengeWins,
      selectedQueenHomepage: findSelectedQueen.queenHomepage,
    };
    // setMySelectedQueenTrial((prevQueen) => [...prevQueen, newQueen]);

    const uidVariable = findSelectedQueen.uid;
    set(ref(db, `/${auth.currentUser.uid}/${uidVariable}`), {
      // mySelectedQueenTrialName: newQueen.selectedQueenDragName,
      // mySelectedQueenTrialName: findSelectedQueen.dragName,
      // mySelectedQueenTrialSeasonAppearedOn:
      //   newQueen.selectedQueenSeasonAppearedOn,
      // mySelectedQueenTrialMainSeasonPlacement:
      //   newQueen.selectedQueenMainSeasonPlacement,
      // mySelectedQueenTrialMainSeasonChallengeWins:
      //   newQueen.selectedQueenMainSeasonChallengeWins,
    });

    console.log(uidVariable);

    setMySelectedQueenTrialName([]);
    // setMySelectedQueenTrialSeasonAppearedOn([]);
    // setMySelectedQueenTrialMainSeasonPlacement([]);
    // setMySelectedQueenTrialMainSeasonChallengeWins([]);
  }

  //READ
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `${auth.currentUser.uid}`), (snapshot) => {
          setMySelectedQueenTrialNames([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((mySelectedQueenTrialName) => {
              return setMySelectedQueenTrialNames((prevQueens) => [
                ...prevQueens,
                mySelectedQueenTrialName,
              ]);
            });
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  //DELETE
  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
    console.log("test", uid);
  };
  //--------------------------------------------------------------------
  // ------------^  FIREBASE CODE ABOVE ^ ------------------------------
  //--------------------------------------------------------------------

  return (
    //--------------------------------------------------------------------
    // ------------ FIREBASE RENDERING BELOW -----------------------------
    //--------------------------------------------------------------------

    <div className="dashboardContainer">
      <div>Profile</div>
      {error}
      <strong>Email:</strong>
      {currentUser.email}
      <Link to="/update-profile" className="updateProfileButton">
        Update Profile
      </Link>
      <button type="link" onClick={handleLogout}>
        Logout
      </button>
      <input
        id="testInputField"
        className="testInputField"
        type="text"
        // value={mySelectedQueen}
        // onChange={(e) => setMySelectedQueen(e.target.value)}
      ></input>
      <button onClick={writeToDatabase} className="testButton">
        Test Button
      </button>
      {/* <div className="testDbContainer">{testDb}</div> */}

      {mySelectedQueenTrialNames.map(({ mySelectedQueenTrialName }) => (
        <div>
          <h1>{mySelectedQueenTrialName}</h1>
          <button onClick={() => handleDelete(mySelectedQueenTrialName.uid)}>
            Delete
          </button>
        </div>
      ))}
      {/* //--------------------------------------------------------------------
  // ------------ OLD MAPPING CODE TO COMPONENTS BELOW -----------------
  //-------------------------------------------------------------------- */}

      {/* {myQueenElements} */}
      <ViewAllQueensHeader />
      {gridQueenElements}
    </div>
  );
}
