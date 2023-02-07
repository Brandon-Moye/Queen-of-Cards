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
// const queenDatabase = [
//   {
//     uid: 1,
//     dragName: "Jade",
//     mainSeasonAppearedOn: "1",
//     mainSeasonPlacement: "6",
//     mainSeasonChallengeWins: "0",
//     queenImage:
//       "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/e4/JadePromoHD.png",
//     queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Jade",
//   },
//   {
//     uid: 2,
//     dragName: "Ongina",
//     mainSeasonAppearedOn: "1",
//     mainSeasonPlacement: "5",
//     mainSeasonChallengeWins: "2",
//     queenImage:
//       "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/0/0d/OnginaAllStars5.jpg",
//     queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Ongina",
//   },
//   {
//     uid: 3,
//     dragName: "Nina Flowers",
//     mainSeasonAppearedOn: "1",
//     mainSeasonPlacement: "2",
//     mainSeasonChallengeWins: "1",
//     queenImage:
//       "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/9/92/Nina_Flowers_All_Stars.jpg",
//     queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Nina_Flowers",
//   },
//   {
//     uid: 4,
//     dragName: "BeBe Zahara Benet",
//     mainSeasonAppearedOn: "1",
//     mainSeasonPlacement: "1",
//     mainSeasonChallengeWins: "2",
//     queenImage:
//       "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/ea/BeBeAS3Promo.png",
//     queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/BeBe_Zahara_Benet",
//   },
//   {
//     uid: 5,
//     dragName: "Rebecca Glasscock",
//     mainSeasonAppearedOn: "1",
//     mainSeasonPlacement: "3",
//     mainSeasonChallengeWins: "1",
//     queenImage:
//       "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/c/ce/RebeccaPromoHD.png",
//     queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Rebecca_Glasscock",
//   },
//   {
//     uid: 6,
//     dragName: "Victoria Parker",
//     mainSeasonAppearedOn: "1",
//     mainSeasonPlacement: "9",
//     mainSeasonChallengeWins: "0",
//     queenImage:
//       "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/4/47/VictoriaPromoHD.png",
//     queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Victoria_Parker",
//   },
//   {
//     uid: 7,
//     dragName: "Shannel",
//     mainSeasonAppearedOn: "1",
//     mainSeasonPlacement: "4",
//     mainSeasonChallengeWins: "0",
//     queenImage:
//       "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/b/ba/Shannel_All_Stars.jpg",
//     queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Shannel",
//   },
//   {
//     uid: 8,
//     dragName: "Tammie Brown",
//     mainSeasonAppearedOn: "1",
//     mainSeasonPlacement: "8",
//     mainSeasonChallengeWins: "0",
//     queenImage:
//       "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/a/a8/Tammie_Brown_All_Stars.jpg",
//     queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Tammie_Brown",
//   },
//   {
//     uid: 9,
//     dragName: "Akashia",
//     mainSeasonAppearedOn: "1",
//     mainSeasonPlacement: "7",
//     mainSeasonChallengeWins: "0",
//     queenImage:
//       "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/8/8a/AkashiaPromoHD.png",
//     queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Akashia",
//   },
// ];

const queenDatabase = [
  {
    dragName: "BeBe Zahara Benet",
    mainSeasonAppearedOn: "1Series\nSongWorkWorkWork",
    mainSeasonPlacement: "1",
    mainSeasonChallengeWins: "2",
    uid: "3f0eda89-1ed4-4c76-8f8d-6fccdbeff779",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/ea/BeBeAS3Promo.png/revision/latest/scale-to-width-down/333?cb=20181021181328",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/BeBe_Zahara_Benet",
  },
  {
    dragName: "Nina Flowers",
    mainSeasonAppearedOn: "1Series\nSeries\nSeries\nSong",
    mainSeasonPlacement: "2",
    mainSeasonChallengeWins: "1",
    uid: "2c33214e-e178-44cd-9fcc-eb26614caf49",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/9/92/Nina_Flowers_All_Stars.jpg/revision/latest/scale-to-width-down/333?cb=20210906195526",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Nina_Flowers",
  },
  {
    dragName: "Rebecca Glasscock",
    mainSeasonAppearedOn: "1Series\nSeries\n",
    mainSeasonPlacement: "3",
    mainSeasonChallengeWins: "1",
    uid: "97218b76-76a3-4964-bcc9-9a168a9385c8",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/c/ce/RebeccaPromoHD.png/revision/latest/scale-to-width-down/333?cb=20170712132453",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Rebecca_Glasscock",
  },
  {
    dragName: "Shannel",
    mainSeasonAppearedOn: "1Series\nSong",
    mainSeasonPlacement: "4",
    mainSeasonChallengeWins: "0",
    uid: "5f0c786c-9772-4c1e-aa85-78b4dd75013f",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/b/ba/Shannel_All_Stars.jpg/revision/latest/scale-to-width-down/333?cb=20210906195703",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Shannel",
  },
  {
    dragName: "Ongina",
    mainSeasonAppearedOn: "1TitleTitleTitle\nTitleAward",
    mainSeasonPlacement: "5",
    mainSeasonChallengeWins: "2",
    uid: "66e2c642-c280-4b2d-9891-b174231deb64",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/0/0d/OnginaAllStars5.jpg/revision/latest/scale-to-width-down/350?cb=20200508170217",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Ongina",
  },
  {
    dragName: "Jade",
    mainSeasonAppearedOn: "1Title\nTitle\nTitle\n",
    mainSeasonPlacement: "6",
    mainSeasonChallengeWins: "0",
    uid: "48b7624f-d27d-4f39-8735-77ede809cb68",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/e4/JadePromoHD.png/revision/latest/scale-to-width-down/333?cb=20170712132559",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Jade",
  },
  {
    dragName: "Akashia",
    mainSeasonAppearedOn: "1TitleTitle",
    mainSeasonPlacement: "7",
    mainSeasonChallengeWins: "0",
    uid: "6cf985ac-4c7e-4cbe-abff-efdc6c3c25b2",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/8/8a/AkashiaPromoHD.png/revision/latest/scale-to-width-down/333?cb=20170712132526",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Akashia",
  },
  {
    dragName: "Tammie Brown",
    mainSeasonAppearedOn: "1TitleTitleTitleTitle\nTitle",
    mainSeasonPlacement: "8",
    mainSeasonChallengeWins: "0",
    uid: "ec03d895-4927-4894-8fc5-8cc1f88648b9",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/a/a8/Tammie_Brown_All_Stars.jpg/revision/latest/scale-to-width-down/333?cb=20210906195713",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Tammie_Brown",
  },
  {
    dragName: "Victoria Parker",
    mainSeasonAppearedOn: "1Work\nWork\nWork\n",
    mainSeasonPlacement: "9",
    mainSeasonChallengeWins: "0",
    uid: "af8d0b03-038e-4463-ba66-5041964edf36",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/4/47/VictoriaPromoHD.png/revision/latest/scale-to-width-down/333?cb=20170712132542",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Victoria_Parker",
  },
  {
    dragName: "Tyra Sanchez",
    mainSeasonAppearedOn: "2Series\nSongWork\nWork\nWork",
    mainSeasonPlacement: "1",
    mainSeasonChallengeWins: "3",
    uid: "2b35e938-b463-432d-8321-d72c23fcda7b",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/c/ca/TyraSanchesS2_Promo.png/revision/latest/scale-to-width-down/333?cb=20181113201234",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Tyra_Sanchez",
  },
  {
    dragName: "Raven",
    mainSeasonAppearedOn: "2Series\nSeries\nSongSeriesAward",
    mainSeasonPlacement: "2",
    mainSeasonChallengeWins: "2",
    uid: "ba8c4642-8578-4ffa-90bc-39a8dcd8d7d8",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/c/c7/Raven_All_Stars.jpg/revision/latest/scale-to-width-down/333?cb=20210906195545",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Raven",
  },
  {
    dragName: "Jujubee",
    mainSeasonAppearedOn: "2Song Selection\n",
    mainSeasonPlacement: "3",
    mainSeasonChallengeWins: "0",
    uid: "b27f705f-faa2-4ac7-9dd7-0c7cbe486bc5",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/ea/JujubeeUKvsTW.jpeg/revision/latest/scale-to-width-down/333?cb=20220117162759",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Jujubee",
  },
  {
    dragName: "Tatianna",
    mainSeasonAppearedOn: "2",
    mainSeasonPlacement: "4",
    mainSeasonChallengeWins: "1",
    uid: "1f4932a0-b38c-4d30-b62c-3692cf9fd4f5",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/f/f8/Rpdr-as-s2-t-w.jpg/revision/latest/scale-to-width-down/350?cb=20200126212216",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Tatianna",
  },
  {
    dragName: "Pandora Boxx",
    mainSeasonAppearedOn: "2",
    mainSeasonPlacement: "5",
    mainSeasonChallengeWins: "0",
    uid: "60423162-029e-41d0-836c-26b729e3eef8",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/c/c5/PandoraBoxxAS6.png/revision/latest/scale-to-width-down/293?cb=20210526183915",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Pandora_Boxx",
  },
  {
    dragName: "Jessica Wild",
    mainSeasonAppearedOn: "2",
    mainSeasonPlacement: "6",
    mainSeasonChallengeWins: "1",
    uid: "72ded39a-6a07-4fde-bb1d-491452bb713c",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/8/88/JessicaWild.png/revision/latest/scale-to-width-down/333?cb=20200909030658",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Jessica_Wild",
  },
  {
    dragName: "Sahara Davenport",
    mainSeasonAppearedOn: "2",
    mainSeasonPlacement: "7",
    mainSeasonChallengeWins: "1",
    uid: "b00c1881-2595-4559-86a1-950a1af67018",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/8/85/SaharaDavenport.png/revision/latest/scale-to-width-down/333?cb=20210413194202",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Sahara_Davenport",
  },
  {
    dragName: "Morgan McMichaels",
    mainSeasonAppearedOn: "2",
    mainSeasonPlacement: "8",
    mainSeasonChallengeWins: "1",
    uid: "2a4a8a85-5f84-4f9b-a355-5faeb5d6c9c6",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/b/bf/MorganAS3.jpg/revision/latest/scale-to-width-down/333?cb=20171021011327",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Morgan_McMichaels",
  },
  {
    dragName: "Kylie Sonique Love",
    mainSeasonAppearedOn: "2",
    mainSeasonPlacement: "9",
    mainSeasonChallengeWins: "0",
    uid: "2aa4afdc-65c5-4983-88e6-bae056d007dd",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/3/34/KylieSoniqueLoveAS6.png/revision/latest/scale-to-width-down/298?cb=20210528135509",
    queenHomepage:
      "https://rupaulsdragrace.fandom.com//wiki/Kylie_Sonique_Love",
  },
  {
    dragName: "Mystique Summers",
    mainSeasonAppearedOn: "2",
    mainSeasonPlacement: "10",
    mainSeasonChallengeWins: "0",
    uid: "6886dfc4-4efb-4840-bad2-04ba60c8d79b",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/d/d0/MystiqueSummers.png/revision/latest/scale-to-width-down/333?cb=20200909040858",
    queenHomepage:
      "https://rupaulsdragrace.fandom.com//wiki/Mystique_Summers_Madison",
  },
  {
    dragName: "Nicole Paige Brooks",
    mainSeasonAppearedOn: "2",
    mainSeasonPlacement: "11",
    mainSeasonChallengeWins: "0",
    uid: "a7425f0b-5697-411c-9b8d-0d60b2992c61",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/a/a1/NPBFAG.png/revision/latest/scale-to-width-down/333?cb=20200909040615",
    queenHomepage:
      "https://rupaulsdragrace.fandom.com//wiki/Nicole_Paige_Brooks",
  },
  {
    dragName: "Shangela",
    mainSeasonAppearedOn: "2",
    mainSeasonPlacement: "12",
    mainSeasonChallengeWins: "0",
    uid: "10208441-d4c4-4ffe-94ac-f1b53884936c",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/3/36/ShangelaAS3.jpg/revision/latest/scale-to-width-down/333?cb=20171021011525",
    queenHomepage:
      "https://rupaulsdragrace.fandom.com//wiki/Shangela_Laquifa_Wadley",
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

  //--------------------------------------------------------------------
  // ------------ ^OLD MAPPING CODE TO COMPONENTS ABOVE^ ---------------
  //--------------------------------------------------------------------

  //--------------------------------------------------------------------
  // ------------ FIREBASE CODE BELOW ----------------------------------
  //--------------------------------------------------------------------

  //WRITE
  function writeToDatabase(uidProp) {
    const findSelectedQueen = queenDatabase.find(function (
      theQueenThatIsCurrentlyBeingIndexed
    ) {
      return theQueenThatIsCurrentlyBeingIndexed.uid === uidProp;
    });

    const uidVariable = findSelectedQueen.uid;
    set(ref(db, `/${auth.currentUser.uid}/${uidVariable}`), {
      myQueensUID: uidVariable,
    });

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
              return setMyQueensUIDSToRenderState((prevQueens) => [
                ...prevQueens,
                myQueensUID,
              ]);
            });
          }
        });
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
  testArray = queenDatabase.filter(function (queen) {
    return result.includes(queen.uid);
  });

  const gridQueenElements = queenDatabase.map((item) => {
    return <ViewAllQueens item={item} handleClick={writeToDatabase} />;
  });

  const myQueenElements = testArray.map((certainItem) => {
    return (
      <CardDisplays certainItem={certainItem} handleClick={handleDelete} />
    );
  });

  //DELETE
  function handleDelete(dragNameProp) {
    const findSelectedQueen = queenDatabase.find(function (
      theQueenThatIsCurrentlyBeingIndexed
    ) {
      return theQueenThatIsCurrentlyBeingIndexed.dragName === dragNameProp;
    });

    const uidVariable = findSelectedQueen.uid;

    remove(ref(db, `/${auth.currentUser.uid}/${uidVariable}`));
    console.log("test", uid);
  }
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

      {/* //--------------------------------------------------------------------
  // ------------ OLD MAPPING CODE TO COMPONENTS BELOW -----------------
  //-------------------------------------------------------------------- */}
      <div className="myQueenElements">{myQueenElements}</div>
      <ViewAllQueensHeader />
      {gridQueenElements}
    </div>
  );
}
