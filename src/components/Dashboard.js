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
import "./Dashboard.css";
const queenDatabase = [
  {
    uid: 1,
    dragName: "Jade",
    mainSeasonAppearedOn: "1",
    mainSeasonPlacement: "6",
    mainSeasonChallengeWins: "0",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/e4/JadePromoHD.png",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Jade",
  },
  {
    uid: 2,
    dragName: "Ongina",
    mainSeasonAppearedOn: "1",
    mainSeasonPlacement: "5",
    mainSeasonChallengeWins: "2",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/0/0d/OnginaAllStars5.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Ongina",
  },
  {
    uid: 3,
    dragName: "Nina Flowers",
    mainSeasonAppearedOn: "1",
    mainSeasonPlacement: "2",
    mainSeasonChallengeWins: "1",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/9/92/Nina_Flowers_All_Stars.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Nina_Flowers",
  },
  {
    uid: 4,
    dragName: "BeBe Zahara Benet",
    mainSeasonAppearedOn: "1",
    mainSeasonPlacement: "1",
    mainSeasonChallengeWins: "2",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/ea/BeBeAS3Promo.png",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/BeBe_Zahara_Benet",
  },
  {
    uid: 5,
    dragName: "Rebecca Glasscock",
    mainSeasonAppearedOn: "1",
    mainSeasonPlacement: "3",
    mainSeasonChallengeWins: "1",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/c/ce/RebeccaPromoHD.png",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Rebecca_Glasscock",
  },
  {
    uid: 6,
    dragName: "Victoria Parker",
    mainSeasonAppearedOn: "1",
    mainSeasonPlacement: "9",
    mainSeasonChallengeWins: "0",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/4/47/VictoriaPromoHD.png",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Victoria_Parker",
  },
  {
    uid: 7,
    dragName: "Shannel",
    mainSeasonAppearedOn: "1",
    mainSeasonPlacement: "4",
    mainSeasonChallengeWins: "0",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/b/ba/Shannel_All_Stars.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Shannel",
  },
  {
    uid: 8,
    dragName: "Tammie Brown",
    mainSeasonAppearedOn: "1",
    mainSeasonPlacement: "8",
    mainSeasonChallengeWins: "0",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/a/a8/Tammie_Brown_All_Stars.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Tammie_Brown",
  },
  {
    uid: 9,
    dragName: "Akashia",
    mainSeasonAppearedOn: "1",
    mainSeasonPlacement: "7",
    mainSeasonChallengeWins: "0",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/8/8a/AkashiaPromoHD.png",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Akashia",
  },
];

export default function Dashboard() {
  const [error, setError] = useState("");
  const [myQueensUID, setMyQueensUID] = useState([]);
  const [myQueensUIDSToRenderState, setMyQueensUIDSToRenderState] = useState(
    []
  );

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
  }

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

    const uidVariable = findSelectedQueen.uid;
    set(ref(db, `/${auth.currentUser.uid}/${uidVariable}`), {
      myQueensUID: uidVariable,
    });

    // console.log(uidVariable);
    // console.log(findSelectedQueen.dragName);

    setMyQueensUID([]);
  }

  //READ
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `${auth.currentUser.uid}`), (snapshot) => {
          setMyQueensUIDSToRenderState([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((myQueensUID) => {
              const findSelectedQueen = queenDatabase.find(function (
                theQueenThatIsCurrentlyBeingIndexed
              ) {
                return theQueenThatIsCurrentlyBeingIndexed.dragName;
              });
              return setMyQueensUIDSToRenderState((prevQueens) => [
                ...prevQueens,
                myQueensUID,
              ]);
            });
          }
        });

        // for (const item of myQueensUIDSToRenderState) {
        //   console.log(item);
        // }
        //FIND FUNCTION TRIALS
        // function poopoo(peepee) {
        //   return peepee.myQueensUID === 5;
        // }
        // console.log(myQueensUIDSToRenderState);
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  //RENDER QUEENS TO DISPLAY
  const result = myQueensUIDSToRenderState.map((a) => a.myQueensUID);
  console.log(result);
  let i = 0;
  let testArray = [];
  // for (let i = 0; i < result.length; i++) {
  //   for (let j = 0; j < queenDatabase.length; j++)
  //     if (result[i] === queenDatabase[j].uid) {
  //       testArray.unshift(queenDatabase[j]);
  //     }
  // }

  testArray = queenDatabase.filter(function (queen) {
    return result.includes(queen.uid);
  });
  console.log(testArray);

  const myQueenElements = testArray.map((certainItem) => {
    return <CardDisplays certainItem={certainItem} />;
  });

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

      {testArray.map(({ myQueensUID }) => (
        <div>
          <h1>{testArray.myQueensUID}</h1>
          {/* <button onClick={() => handleDelete(myQueensUID.uid)}>Delete</button> */}
        </div>
      ))}
      {/* //--------------------------------------------------------------------
  // ------------ OLD MAPPING CODE TO COMPONENTS BELOW -----------------
  //-------------------------------------------------------------------- */}
      <div className="myQueenElements">{myQueenElements}</div>
      <ViewAllQueensHeader />
      {gridQueenElements}
    </div>
  );
}
