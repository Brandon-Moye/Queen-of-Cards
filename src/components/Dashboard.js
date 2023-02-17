import React, { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../Firebase";
import { auth } from "../Firebase";
import { uid } from "uid";
import { set, ref, onValue, remove } from "firebase/database";
import { render } from "react-dom";
import { motion } from "framer-motion";

import CardDisplays from "./queenOfCardsComponents/CardDisplay";
import ViewAllQueens from "./queenOfCardsComponents/ViewAllQueens";
import viewAllQueensHeader from "./queenOfCardsComponents/ViewAllQueensHeader";
import ViewAllQueensHeader from "./queenOfCardsComponents/ViewAllQueensHeader";
import Modal from "./queenOfCardsComponents/Modal";
import "./Dashboard.css";
import ScrollToTop from "./queenOfCardsComponents/ScrollToTop";
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
    mainSeasonAppearedOn: "1",
    mainSeasonPlacement: "1",
    mainSeasonChallengeWins: "2",
    uid: "3f0eda89-1ed4-4c76-8f8d-6fccdbeff779",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/ea/BeBeAS3Promo.png",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/BeBe_Zahara_Benet",
  },
  {
    dragName: "Nina Flowers",
    mainSeasonAppearedOn: "1",
    mainSeasonPlacement: "2",
    mainSeasonChallengeWins: "1",
    uid: "2c33214e-e178-44cd-9fcc-eb26614caf49",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/9/92/Nina_Flowers_All_Stars.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Nina_Flowers",
  },
  {
    dragName: "Rebecca Glasscock",
    mainSeasonAppearedOn: "1",
    mainSeasonPlacement: "3",
    mainSeasonChallengeWins: "1",
    uid: "97218b76-76a3-4964-bcc9-9a168a9385c8",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/c/ce/RebeccaPromoHD.png",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Rebecca_Glasscock",
  },
  {
    dragName: "Shannel",
    mainSeasonAppearedOn: "1",
    mainSeasonPlacement: "4",
    mainSeasonChallengeWins: "0",
    uid: "5f0c786c-9772-4c1e-aa85-78b4dd75013f",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/b/ba/Shannel_All_Stars.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Shannel",
  },
  {
    dragName: "Ongina",
    mainSeasonAppearedOn: "1",
    mainSeasonPlacement: "5",
    mainSeasonChallengeWins: "2",
    uid: "66e2c642-c280-4b2d-9891-b174231deb64",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/0/0d/OnginaAllStars5.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Ongina",
  },
  {
    dragName: "Jade",
    mainSeasonAppearedOn: "1",
    mainSeasonPlacement: "6",
    mainSeasonChallengeWins: "0",
    uid: "48b7624f-d27d-4f39-8735-77ede809cb68",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/e4/JadePromoHD.png",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Jade",
  },
  {
    dragName: "Akashia",
    mainSeasonAppearedOn: "1",
    mainSeasonPlacement: "7",
    mainSeasonChallengeWins: "0",
    uid: "6cf985ac-4c7e-4cbe-abff-efdc6c3c25b2",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/8/8a/AkashiaPromoHD.png",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Akashia",
  },
  {
    dragName: "Tammie Brown",
    mainSeasonAppearedOn: "1",
    mainSeasonPlacement: "8",
    mainSeasonChallengeWins: "0",
    uid: "ec03d895-4927-4894-8fc5-8cc1f88648b9",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/a/a8/Tammie_Brown_All_Stars.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Tammie_Brown",
  },
  {
    dragName: "Victoria Parker",
    mainSeasonAppearedOn: "1",
    mainSeasonPlacement: "9",
    mainSeasonChallengeWins: "0",
    uid: "af8d0b03-038e-4463-ba66-5041964edf36",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/4/47/VictoriaPromoHD.png",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Victoria_Parker",
  },
  {
    dragName: "Tyra Sanchez",
    mainSeasonAppearedOn: "2",
    mainSeasonPlacement: "1",
    mainSeasonChallengeWins: "3",
    uid: "2b35e938-b463-432d-8321-d72c23fcda7b",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/c/ca/TyraSanchesS2_Promo.png",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Tyra_Sanchez",
  },
  {
    dragName: "Raven",
    mainSeasonAppearedOn: "2",
    mainSeasonPlacement: "2",
    mainSeasonChallengeWins: "2",
    uid: "ba8c4642-8578-4ffa-90bc-39a8dcd8d7d8",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/c/c7/Raven_All_Stars.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Raven",
  },
  {
    dragName: "Jujubee",
    mainSeasonAppearedOn: "2",
    mainSeasonPlacement: "3",
    mainSeasonChallengeWins: "0",
    uid: "b27f705f-faa2-4ac7-9dd7-0c7cbe486bc5",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/ea/JujubeeUKvsTW.jpeg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Jujubee",
  },
  {
    dragName: "Tatianna",
    mainSeasonAppearedOn: "2",
    mainSeasonPlacement: "4",
    mainSeasonChallengeWins: "1",
    uid: "1f4932a0-b38c-4d30-b62c-3692cf9fd4f5",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/f/f8/Rpdr-as-s2-t-w.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Tatianna",
  },
  {
    dragName: "Pandora Boxx",
    mainSeasonAppearedOn: "2",
    mainSeasonPlacement: "5",
    mainSeasonChallengeWins: "0",
    uid: "60423162-029e-41d0-836c-26b729e3eef8",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/c/c5/PandoraBoxxAS6.png",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Pandora_Boxx",
  },
  {
    dragName: "Jessica Wild",
    mainSeasonAppearedOn: "2",
    mainSeasonPlacement: "6",
    mainSeasonChallengeWins: "1",
    uid: "72ded39a-6a07-4fde-bb1d-491452bb713c",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/8/88/JessicaWild.png",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Jessica_Wild",
  },
  {
    dragName: "Sahara Davenport",
    mainSeasonAppearedOn: "2",
    mainSeasonPlacement: "7",
    mainSeasonChallengeWins: "1",
    uid: "b00c1881-2595-4559-86a1-950a1af67018",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/8/85/SaharaDavenport.png",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Sahara_Davenport",
  },
  {
    dragName: "Morgan McMichaels",
    mainSeasonAppearedOn: "2",
    mainSeasonPlacement: "8",
    mainSeasonChallengeWins: "1",
    uid: "2a4a8a85-5f84-4f9b-a355-5faeb5d6c9c6",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/b/bf/MorganAS3.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Morgan_McMichaels",
  },
  {
    dragName: "Kylie Sonique Love",
    mainSeasonAppearedOn: "2",
    mainSeasonPlacement: "9",
    mainSeasonChallengeWins: "0",
    uid: "2aa4afdc-65c5-4983-88e6-bae056d007dd",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/3/34/KylieSoniqueLoveAS6.png",
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
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/d/d0/MystiqueSummers.png",
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
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/a/a1/NPBFAG.png",
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
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/3/36/ShangelaAS3.jpg",
    queenHomepage:
      "https://rupaulsdragrace.fandom.com//wiki/Shangela_Laquifa_Wadley",
  },
  {
    dragName: "Raja",
    mainSeasonAppearedOn: "3",
    mainSeasonPlacement: "1",
    mainSeasonChallengeWins: "3",
    uid: "4b6d620e-8bd4-43a1-b77f-7e94b2080446",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/7/75/RajaAS7.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Raja",
  },
  {
    dragName: "Manila Luzon",
    mainSeasonAppearedOn: "3",
    mainSeasonPlacement: "2",
    mainSeasonChallengeWins: "3",
    uid: "4af329ac-1e50-492c-a54e-da3d05853790",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/5/55/ManilaLuzonDD1Promo.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Manila_Luzon",
  },
  {
    dragName: "Alexis Mateo",
    mainSeasonAppearedOn: "3",
    mainSeasonPlacement: "3",
    mainSeasonChallengeWins: "3",
    uid: "ced51982-1aae-4d17-b060-3052b717b73e",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/4/45/AlexisMateoAllStars5.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Alexis_Mateo",
  },
  {
    dragName: "Yara Sofia",
    mainSeasonAppearedOn: "3",
    mainSeasonPlacement: "4",
    mainSeasonChallengeWins: "1",
    uid: "7e79fa6c-b3cf-4a26-a993-67b1a579c225",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/6/69/YaraSofiaAS6.png",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Yara_Sofia",
  },
  {
    dragName: "Carmen Carrera",
    mainSeasonAppearedOn: "3",
    mainSeasonPlacement: "5",
    mainSeasonChallengeWins: "0",
    uid: "c955785c-2601-4866-9ff5-65e7b71fea73",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/3/36/CarmenS3.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Carmen_Carrera",
  },
  {
    dragName: "Shangela",
    mainSeasonAppearedOn: "3",
    mainSeasonPlacement: "6",
    mainSeasonChallengeWins: "1",
    uid: "e2c59d58-5697-4006-86cd-5593ff6e874a",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/3/36/ShangelaAS3.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Shangela",
  },
  {
    dragName: "Delta Work",
    mainSeasonAppearedOn: "3",
    mainSeasonPlacement: "7",
    mainSeasonChallengeWins: "0",
    uid: "18fa37b9-46f7-430f-8713-624145db1df0",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/5/54/DeltaS3.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Delta_Work",
  },
  {
    dragName: "Stacy Layne Matthews",
    mainSeasonAppearedOn: "3",
    mainSeasonPlacement: "8",
    mainSeasonChallengeWins: "1",
    uid: "60668487-1e79-44e7-8f3d-12422b93e7d5",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/e6/StacyS3.jpg",
    queenHomepage:
      "https://rupaulsdragrace.fandom.com//wiki/Stacy_Layne_Matthews",
  },
  {
    dragName: "Mariah Paris Balenciaga",
    mainSeasonAppearedOn: "3",
    mainSeasonPlacement: "9",
    mainSeasonChallengeWins: "0",
    uid: "142e992f-f1d2-4394-b33f-7b8175b8cbe9",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/c/c0/MariahBalenciagaAllStars5.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Mariah",
  },
  {
    dragName: "India Ferrah",
    mainSeasonAppearedOn: "3",
    mainSeasonPlacement: "10",
    mainSeasonChallengeWins: "0",
    uid: "bc52815c-8e3b-40e6-b1fd-4816cd4ab8c1",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/b/bf/IndiaFerrahAllStars5.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/India_Ferrah",
  },
  {
    dragName: "Mimi Imfurst",
    mainSeasonAppearedOn: "3",
    mainSeasonPlacement: "11",
    mainSeasonChallengeWins: "0",
    uid: "289d6d27-30bb-4ab4-ae7d-569e92ecd73a",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/4/4f/Mimi_Imfurst_AllStars.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Mimi_Imfurst",
  },
  {
    dragName: "Phoenix",
    mainSeasonAppearedOn: "3",
    mainSeasonPlacement: "12",
    mainSeasonChallengeWins: "0",
    uid: "4ef035a5-7245-404b-b4e5-81b81b34a00a",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/3/3f/PhoenixS3.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Phoenix",
  },

  {
    dragName: "Venus D-Lite",
    mainSeasonAppearedOn: "3",
    mainSeasonPlacement: "13",
    mainSeasonChallengeWins: "0",
    uid: "f8b82e5d-2542-4205-947c-af05ef8bd8a5",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/b/b2/VenusS3.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Venus_D-Lite",
  },
  {
    dragName: "Sharon Needles",
    mainSeasonAppearedOn: "4",
    mainSeasonPlacement: "1",
    mainSeasonChallengeWins: "4",
    uid: "586af60f-30f6-49ff-90f9-45575e468f47",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/4/49/Needles.png",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Sharon_Needles",
  },
  {
    dragName: "Chad Michaels",
    mainSeasonAppearedOn: "4",
    mainSeasonPlacement: "2",
    mainSeasonChallengeWins: "2",
    uid: "7d68311a-e1ed-4237-9979-5978d0dd4e9c",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/ea/Chad_Michaels_AllStars.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Chad_Michaels",
  },
  {
    dragName: "Phi Phi O'Hara",
    mainSeasonAppearedOn: "4",
    mainSeasonPlacement: "2",
    mainSeasonChallengeWins: "2",
    uid: "384296fa-77d2-472e-bb0e-f3e2962d8ed7",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/1/1e/Rpdr-as-s2-pp-w.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Phi_Phi_O%27Hara",
  },
  {
    dragName: "Latrice Royale",
    mainSeasonAppearedOn: "4",
    mainSeasonPlacement: "4",
    mainSeasonChallengeWins: "2",
    uid: "588b497c-0b98-4186-8eeb-52b8423421d3",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/f/fa/LatriceRoyaleAS4.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Latrice_Royale",
  },
  {
    dragName: "Kenya Michaels",
    mainSeasonAppearedOn: "4",
    mainSeasonPlacement: "5",
    mainSeasonChallengeWins: "0",
    uid: "b63a7c08-a1ca-4337-937e-2f4aadd5c704",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/1/10/Kenya.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Kenya_Michaels",
  },
  {
    dragName: "Dida Ritz",
    mainSeasonAppearedOn: "4",
    mainSeasonPlacement: "6",
    mainSeasonChallengeWins: "0",
    uid: "2e9a0170-0d1b-444c-b09e-80138d2112fb",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/9/95/DiDa_Ritz.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Dida_Ritz",
  },
  {
    dragName: "Willam",
    mainSeasonAppearedOn: "4",
    mainSeasonPlacement: "7",
    mainSeasonChallengeWins: "2",
    uid: "20b8ee36-3404-4b0c-aba1-7ab71a6de68b",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/e7/Willam-0.png",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Willam",
  },
  {
    dragName: " Jiggly Caliente",
    mainSeasonAppearedOn: "4",
    mainSeasonPlacement: "8",
    mainSeasonChallengeWins: "0",
    uid: "4556a5b7-0db7-45e6-87cf-d81d001cc33b",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/2/23/JigglyCalienteDRPS1.jpeg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Jiggly_Caliente",
  },
  {
    dragName: "Milan",
    mainSeasonAppearedOn: "4",
    mainSeasonPlacement: "9",
    mainSeasonChallengeWins: "0",
    uid: "f6276b1d-0c3d-4c1c-8ed8-257a1428548d",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/d/d6/Milan.png",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Milan",
  },
  {
    dragName: "Madame LaQueer",
    mainSeasonAppearedOn: "4",
    mainSeasonPlacement: "10",
    mainSeasonChallengeWins: "1",
    uid: "1c8e30be-0a8b-4d84-8ac1-3c9a79104df4",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/d/de/Lequeer.png",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Madame_LaQueer",
  },
  {
    dragName: "The Princess",
    mainSeasonAppearedOn: "4",
    mainSeasonPlacement: "11",
    mainSeasonChallengeWins: "0",
    uid: "56642a27-c882-4277-afb3-27ff61fa1896",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/7/7d/Princess-0.png",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/The_Princess",
  },
  {
    dragName: "Lashauwn Beyond",
    mainSeasonAppearedOn: "4",
    mainSeasonPlacement: "12",
    mainSeasonChallengeWins: "0",
    uid: "d4725527-0181-4e04-986e-32fa9c4c3855",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/5/56/Benyond.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Lashauwn_Beyond",
  },
  {
    dragName: "Alisa Summers",
    mainSeasonAppearedOn: "4",
    mainSeasonPlacement: "13",
    mainSeasonChallengeWins: "0",
    uid: "d2b2df93-40a6-40f6-a975-ad01626af500",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/0/07/Alisa-0.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Alisa_Summers",
  },
  {
    dragName: "Jinkx Monsoon",
    mainSeasonAppearedOn: "5",
    mainSeasonPlacement: "1",
    mainSeasonChallengeWins: "2",
    uid: "0b80e947-f283-4487-81f6-496177d07156",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/a/a6/JinkxMonsoonAS7.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Jinkx_Monsoon",
  },
  {
    dragName: "Roxxxy Andrews",
    mainSeasonAppearedOn: "5",
    mainSeasonPlacement: "2",
    mainSeasonChallengeWins: "2",
    uid: "856fb045-15f3-4fd3-9e89-9dfc6c74c99c",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/0/0d/Rpdr-as-s2-ra-w.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Roxxxy_Andrews",
  },
  {
    dragName: "Alaska",
    mainSeasonAppearedOn: "5",
    mainSeasonPlacement: "2",
    mainSeasonChallengeWins: "2",
    uid: "c8e6b493-57a8-49c1-b179-a05cc3304249",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/a/a9/Rpdr-as-s2-a-w.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Alaska",
  },
  {
    dragName: "Detox",
    mainSeasonAppearedOn: "5",
    mainSeasonPlacement: "4",
    mainSeasonChallengeWins: "1",
    uid: "14bd9705-e7f1-4837-b3f8-8130f06fbcbc",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/c/c0/Rpdr-as-s2-d-w.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Detox",
  },
  {
    dragName: "Coco Montrese",
    mainSeasonAppearedOn: "5",
    mainSeasonPlacement: "5",
    mainSeasonChallengeWins: "1",
    uid: "f0d31c79-e86a-4b53-9128-47d05a622c3e",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/8/8a/Rpdr-as-s2-cc-w.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Coco_Montrese",
  },
  {
    dragName: "Alyssa Edwards",
    mainSeasonAppearedOn: "5",
    mainSeasonPlacement: "6",
    mainSeasonChallengeWins: "1",
    uid: "138934c2-f3f3-4094-9e02-596c929489b0",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/d/d0/Rpdr-as-s2-ae-w.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Alyssa_Edwards",
  },
  {
    dragName: "Ivy Winters",
    mainSeasonAppearedOn: "5",
    mainSeasonPlacement: "7",
    mainSeasonChallengeWins: "1",
    uid: "92966f0c-09a9-4595-bda2-72deb485ea12",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/6/63/IvyS5.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Ivy_Winters",
  },
  {
    dragName: "Jade Jolie",
    mainSeasonAppearedOn: "5",
    mainSeasonPlacement: "8",
    mainSeasonChallengeWins: "0",
    uid: "46bdff8b-de7d-41a6-a5c5-297c999abc6b",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/8/8e/JadeJolieTBBD4.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Jade_Jolie",
  },
  {
    dragName: "Lineysha Sparx",
    mainSeasonAppearedOn: "5",
    mainSeasonPlacement: "9",
    mainSeasonChallengeWins: "1",
    uid: "fdc817d8-90d2-48cd-9a23-cd7a63534ab1",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/3/37/LineyshaS5.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Lineysha_Sparx",
  },
  {
    dragName: "Honey Mahogany",
    mainSeasonAppearedOn: "5",
    mainSeasonPlacement: "10",
    mainSeasonChallengeWins: "0",
    uid: "42d668b2-283d-4433-af1d-dffbf815f40c",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/5/50/HoneyS5.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Honey_Mahogany",
  },
  {
    dragName: "Vivienne Pinay",
    mainSeasonAppearedOn: "5",
    mainSeasonPlacement: "10",
    mainSeasonChallengeWins: "0",
    uid: "bdc309eb-91ee-4a84-b275-14541eb26104",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/f/fc/VivienneS5.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Vivienne_Pinay",
  },
  {
    dragName: "Monica Beverly Hillz",
    mainSeasonAppearedOn: "5",
    mainSeasonPlacement: "12",
    mainSeasonChallengeWins: "0",
    uid: "102ba768-8f2b-491e-a7db-04370fbecb96",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/4/44/MonicaS5.jpg",
    queenHomepage:
      "https://rupaulsdragrace.fandom.com//wiki/Monica_Beverly_Hillz",
  },
  {
    dragName: "Serena ChaCha",
    mainSeasonAppearedOn: "5",
    mainSeasonPlacement: "13",
    mainSeasonChallengeWins: "0",
    uid: "7b69e6cb-2219-49f5-b4c1-b3b6315fb669",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/c/ce/SerenaChaChaAS6.png",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Serena_ChaCha",
  },
  {
    dragName: "Penny Tration",
    mainSeasonAppearedOn: "5",
    mainSeasonPlacement: "14",
    mainSeasonChallengeWins: "0",
    uid: "117499e4-8593-4304-a388-07a5411c411b",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/7/7b/PennyS5.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Penny_Tration",
  },
  {
    dragName: "Bianca Del Rio",
    mainSeasonAppearedOn: "6",
    mainSeasonPlacement: "1",
    mainSeasonChallengeWins: "3",
    uid: "b1515036-d58f-442c-b7dc-b79a5f777ce4",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/c/c7/BiancaS6promo.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Bianca_Del_Rio",
  },
  {
    dragName: "Courtney Act",
    mainSeasonAppearedOn: "6",
    mainSeasonPlacement: "2",
    mainSeasonChallengeWins: "2",
    uid: "83e58d14-5725-4781-ac42-d9b9e250309e",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/3/3d/CourtneyS6promo.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Courtney_Act",
  },
  {
    dragName: "Adore Delano",
    mainSeasonAppearedOn: "6",
    mainSeasonPlacement: "2",
    mainSeasonChallengeWins: "3",
    uid: "ee4344b0-5d91-4783-be74-c23ab85a85a9",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/4/4f/Rpdr-as-s2-ad-w.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Adore_Delano",
  },
  {
    dragName: "Darienne Lake",
    mainSeasonAppearedOn: "6",
    mainSeasonPlacement: "4",
    mainSeasonChallengeWins: "1",
    uid: "a94af2e4-b7be-4c46-ab17-b1677c8f2ca3",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/0/0b/DarienneS6promo.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Darienne_Lake",
  },
  {
    dragName: "BenDeLaCreme",
    mainSeasonAppearedOn: "6",
    mainSeasonPlacement: "5",
    mainSeasonChallengeWins: "2",
    uid: "3ccb3352-a1e0-49a6-9609-254a20a2da6b",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/0/01/BenDeLaCremeAS3.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/BenDeLaCreme",
  },
  {
    dragName: "Joslyn Fox",
    mainSeasonAppearedOn: "6",
    mainSeasonPlacement: "6",
    mainSeasonChallengeWins: "0",
    uid: "57caed95-0e3c-4391-a27d-46aa24f47f93",
    queenImage:
      "https://www.dragofficial.com/uploads/1/9/3/9/19395567/4353854.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Joslyn_Fox",
  },
  {
    dragName: "Trinity K. Bonet",
    mainSeasonAppearedOn: "6",
    mainSeasonPlacement: "7",
    mainSeasonChallengeWins: "0",
    uid: "d8449297-6cef-4f2e-a315-278d0c3b75e4",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/4/40/TrinityKBonetAS6.png",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Trinity_K._Bonet",
  },
  {
    dragName: "Laganja Estranja",
    mainSeasonAppearedOn: "6",
    mainSeasonPlacement: "8",
    mainSeasonChallengeWins: "1",
    uid: "3ea8ab7c-cc7a-41a7-a410-6b66aa717c5a",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/2/28/LaganjaS6promo.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Laganja_Estranja",
  },
  {
    dragName: "Milk",
    mainSeasonAppearedOn: "6",
    mainSeasonPlacement: "9",
    mainSeasonChallengeWins: "0",
    uid: "848f4e7d-22ad-4688-8908-8c7122116ccb",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/1/14/MilkAS3.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Milk",
  },
  {
    dragName: "Gia Gunn",
    mainSeasonAppearedOn: "6",
    mainSeasonPlacement: "10",
    mainSeasonChallengeWins: "0",
    uid: "ad441f20-dd73-442f-8fab-a310d919deb3",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/2/25/GiaGunnAS4.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Gia_Gunn",
  },
  {
    dragName: "April Carrión",
    mainSeasonAppearedOn: "6",
    mainSeasonPlacement: "11",
    mainSeasonChallengeWins: "0",
    uid: "432ece49-0d19-47db-9c9f-e3dc1ccedd9e",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/5/5b/AprilS6promo.jpg",
    queenHomepage:
      "https://rupaulsdragrace.fandom.com//wiki/April_Carri%C3%B3n",
  },
  {
    dragName: "Vivacious",
    mainSeasonAppearedOn: "6",
    mainSeasonPlacement: "12",
    mainSeasonChallengeWins: "0",
    uid: "373e3c56-4d1f-421b-b3ce-1cff7aaf0465",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/3/32/VivaciousS6promo.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Vivacious",
  },
  {
    dragName: "Kelly Mantle",
    mainSeasonAppearedOn: "6",
    mainSeasonPlacement: "13",
    mainSeasonChallengeWins: "0",
    uid: "ad09fe32-1563-488e-aa3d-2f25f52b57c7",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/3/3d/KellyS6promo.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Kelly_Mantle",
  },
  {
    dragName: "Magnolia Crawford",
    mainSeasonAppearedOn: "6",
    mainSeasonPlacement: "13",
    mainSeasonChallengeWins: "0",
    uid: "8597493a-656f-4f20-9556-a638bdabe2a7",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/2/23/MagnoliaS6promo.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Magnolia_Crawford",
  },
  {
    dragName: "Violet Chachki",
    mainSeasonAppearedOn: "7",
    mainSeasonPlacement: "1",
    mainSeasonChallengeWins: "3",
    uid: "f78d00c2-0bb6-4b5d-a8e5-3d54ff4a25ad",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/5/52/VioletS7promo.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Violet_Chachki",
  },
  {
    dragName: "Pearl",
    mainSeasonAppearedOn: "7",
    mainSeasonPlacement: "2",
    mainSeasonChallengeWins: "2",
    uid: "b63e4c50-24f5-42f3-8eed-70db6c44e4d1",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/5/50/PearlS7promo.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Pearl",
  },
  {
    dragName: "Ginger Minj",
    mainSeasonAppearedOn: "7",
    mainSeasonPlacement: "2",
    mainSeasonChallengeWins: "3",
    uid: "c8eae283-c391-44fc-9cff-55f683df6cb4",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/f/f6/GingerMinjAS6.png",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Ginger_Minj",
  },
  {
    dragName: "Kennedy Davenport",
    mainSeasonAppearedOn: "7",
    mainSeasonPlacement: "4",
    mainSeasonChallengeWins: "2",
    uid: "5b8205c0-143f-4fe0-9b8c-8a14017c8b58",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/8/83/KennedyAS3.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Kennedy_Davenport",
  },
  {
    dragName: "Katya",
    mainSeasonAppearedOn: "7",
    mainSeasonPlacement: "5",
    mainSeasonChallengeWins: "2",
    uid: "9c715efc-8d54-4caf-a30a-16c195d2e31c",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/8/82/Rpdr-as-s2-k-w.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Katya",
  },
  {
    dragName: "Trixie Mattel",
    mainSeasonAppearedOn: "7",
    mainSeasonPlacement: "6",
    mainSeasonChallengeWins: "0",
    uid: "24d06b2c-8a56-4684-a72c-b90e0f697d93",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/e9/TrixieMattelQOTU1.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Trixie_Mattel",
  },
  {
    dragName: "Miss Fame",
    mainSeasonAppearedOn: "7",
    mainSeasonPlacement: "7",
    mainSeasonChallengeWins: "0",
    uid: "7d13384e-11c4-4c44-922d-29e0b22ec495",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/8/89/FameS7promo.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Miss_Fame",
  },
  {
    dragName: "Jaidynn Diore Fierce",
    mainSeasonAppearedOn: "7",
    mainSeasonPlacement: "8",
    mainSeasonChallengeWins: "0",
    uid: "03b11083-3d69-46ce-80da-c85c2cca51e1",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/a/a6/JaidynnS7promo.jpg",
    queenHomepage:
      "https://rupaulsdragrace.fandom.com//wiki/Jaidynn_Diore_Fierce",
  },
  {
    dragName: "Max",
    mainSeasonAppearedOn: "7",
    mainSeasonPlacement: "9",
    mainSeasonChallengeWins: "2",
    uid: "961eef50-15cf-4ce9-9132-2a878cd9c063",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/c/c9/MaxS7promo.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Max",
  },
  {
    dragName: "Kandy Ho",
    mainSeasonAppearedOn: "7",
    mainSeasonPlacement: "10",
    mainSeasonChallengeWins: "0",
    uid: "91d06f5b-cb30-4175-9ea9-fa7d1ceae228",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/3/3c/Kandy_Ho_The_Switch.png",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Kandy_Ho",
  },
  {
    dragName: "Mrs. Kasha Davis",
    mainSeasonAppearedOn: "7",
    mainSeasonPlacement: "11",
    mainSeasonChallengeWins: "0",
    uid: "dbcad1d4-caa4-4d3b-a0fd-349bda420269",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/c/cf/KashaS7promo.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Mrs._Kasha_Davis",
  },
  {
    dragName: "Jasmine Masters",
    mainSeasonAppearedOn: "7",
    mainSeasonPlacement: "12",
    mainSeasonChallengeWins: "0",
    uid: "79f3ff9a-1bf5-469c-9a68-8fdeb72f2ad7",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/d/d0/JasmineMastersAS4.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Jasmine_Masters",
  },
  {
    dragName: "Sasha Belle",
    mainSeasonAppearedOn: "7",
    mainSeasonPlacement: "13",
    mainSeasonChallengeWins: "0",
    uid: "98320e3d-c1d6-4e18-9054-db71fab867e1",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/d/db/SashaS7promo.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Sasha_Belle",
  },
  {
    dragName: "Tempest DuJour",
    mainSeasonAppearedOn: "7",
    mainSeasonPlacement: "14",
    mainSeasonChallengeWins: "0",
    uid: "b1d9919c-c7e1-423f-97f2-882b7f3834c3",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/2/26/TempestS7promo.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Tempest_DuJour",
  },
  {
    dragName: "Bob The Drag Queen",
    mainSeasonAppearedOn: "8",
    mainSeasonPlacement: "1",
    mainSeasonChallengeWins: "3",
    uid: "0a8a5d08-0365-422f-ba75-3196a4893259",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/0/0d/BobFullS8.jpg",
    queenHomepage:
      "https://rupaulsdragrace.fandom.com//wiki/Bob_The_Drag_Queen",
  },
  {
    dragName: "Kim Chi",
    mainSeasonAppearedOn: "8",
    mainSeasonPlacement: "2",
    mainSeasonChallengeWins: "2",
    uid: "d7872d73-d6d3-4a89-9353-0f43b6752779",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/d/d8/KimS8.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Kim_Chi",
  },
  {
    dragName: "Naomi Smalls",
    mainSeasonAppearedOn: "8",
    mainSeasonPlacement: "2",
    mainSeasonChallengeWins: "1",
    uid: "ed40e257-3ccc-4a8a-a04a-6593780b5551",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/b/b4/NaomiVRS1.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Naomi_Smalls",
  },
  {
    dragName: "Chi Chi DeVayne",
    mainSeasonAppearedOn: "8",
    mainSeasonPlacement: "4",
    mainSeasonChallengeWins: "1",
    uid: "20e09469-c466-4353-bb43-14397a08d159",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/ef/ChiChiAS3.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Chi_Chi_DeVayne",
  },
  {
    dragName: "Derrick Barry",
    mainSeasonAppearedOn: "8",
    mainSeasonPlacement: "5",
    mainSeasonChallengeWins: "1",
    uid: "c5e0b238-8a7c-4f51-b332-4e7f70cf35f0",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/3/3a/DerrickVRS1.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Derrick_Barry",
  },
  {
    dragName: "Thorgy Thor",
    mainSeasonAppearedOn: "8",
    mainSeasonPlacement: "6",
    mainSeasonChallengeWins: "0",
    uid: "ca47ae8a-2915-48ec-8768-7d0b5edfcd68",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/d/d4/ThorgyAS3.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Thorgy_Thor",
  },
  {
    dragName: "Robbie Turner",
    mainSeasonAppearedOn: "8",
    mainSeasonPlacement: "7",
    mainSeasonChallengeWins: "1",
    uid: "49e90b60-6847-4dcd-bdce-13eb7f8c2b15",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/9/9d/RobbieS8.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Robbie_Turner",
  },
  {
    dragName: "Acid Betty",
    mainSeasonAppearedOn: "8",
    mainSeasonPlacement: "8",
    mainSeasonChallengeWins: "0",
    uid: "64dc8166-2dc1-4ec9-9f40-a119b1a572f8",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/3/3e/AcidS8.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Acid_Betty",
  },
  {
    dragName: "Naysha Lopez",
    mainSeasonAppearedOn: "8",
    mainSeasonPlacement: "9",
    mainSeasonChallengeWins: "0",
    uid: "63b7a46b-3ec0-4c89-bcb5-cf51087a770b",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/2/23/NayshaS8.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Naysha_Lopez",
  },
  {
    dragName: "Cynthia Lee Fontaine",
    mainSeasonAppearedOn: "8",
    mainSeasonPlacement: "10",
    mainSeasonChallengeWins: "0",
    uid: "c9cba26d-297e-4e02-8b12-c8c6f6b34980",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/3/34/CynthiaS9.jpg",
    queenHomepage:
      "https://rupaulsdragrace.fandom.com//wiki/Cynthia_Lee_Fontaine",
  },
  {
    dragName: "Laila McQueen",
    mainSeasonAppearedOn: "8",
    mainSeasonPlacement: "11",
    mainSeasonChallengeWins: "0",
    uid: "8ce26426-ff3c-4bb3-b09a-8f4ac24c6a81",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/b/bb/LailaS8.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Laila_McQueen",
  },
  {
    dragName: "Dax ExclamationPoint",
    mainSeasonAppearedOn: "8",
    mainSeasonPlacement: "11",
    mainSeasonChallengeWins: "0",
    uid: "ce2b1e21-99ee-43d7-b6dc-f23f1f3a58e1",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/e2/DaxS8.jpg",
    queenHomepage:
      "https://rupaulsdragrace.fandom.com//wiki/Dax_ExclamationPoint",
  },
  {
    dragName: "Sasha Velour",
    mainSeasonAppearedOn: "9",
    mainSeasonPlacement: "1",
    mainSeasonChallengeWins: "2",
    uid: "44f73af2-825a-47aa-b2fe-576008d583d9",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/b/b4/SashaS9.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Sasha_Velour",
  },
  {
    dragName: "Peppermint",
    mainSeasonAppearedOn: "9",
    mainSeasonPlacement: "2",
    mainSeasonChallengeWins: "1",
    uid: "4f594193-de16-486e-9062-174dd70321a0",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/3/3d/PeppermintS9.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Peppermint",
  },
  {
    dragName: "Trinity The Tuck",
    mainSeasonAppearedOn: "9",
    mainSeasonPlacement: "3",
    mainSeasonChallengeWins: "3",
    uid: "034f1365-31cd-4cf6-a3a2-de6e14be509c",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/0/0f/TrinityTheTuckAS7.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Trinity_Taylor",
  },
  {
    dragName: "Shea Couleé",
    mainSeasonAppearedOn: "9",
    mainSeasonPlacement: "3",
    mainSeasonChallengeWins: "4",
    uid: "7a71f045-371c-47c9-b316-27d5d7bff3a5",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/a/a0/SheaCoule%C3%A9AS7.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Shea_Coule%C3%A9",
  },
  {
    dragName: "Alexis Michelle",
    mainSeasonAppearedOn: "9",
    mainSeasonPlacement: "5",
    mainSeasonChallengeWins: "1",
    uid: "dbe4fdce-a83a-41a5-9b8d-d079129ef2fd",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/8/82/AlexisS9.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Alexis_Michelle",
  },
  {
    dragName: "Nina Bo'nina Brown",
    mainSeasonAppearedOn: "9",
    mainSeasonPlacement: "6",
    mainSeasonChallengeWins: "1",
    uid: "8d9c6cab-a138-4061-993c-8fe098fcbbe3",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/7/7e/NinaBoninaReunion.png",
    queenHomepage:
      "https://rupaulsdragrace.fandom.com//wiki/Nina_Bo%27nina_Brown",
  },
  {
    dragName: "Valentina",
    mainSeasonAppearedOn: "9",
    mainSeasonPlacement: "7",
    mainSeasonChallengeWins: "1",
    uid: "bc11dcd5-12a3-4d50-8e1d-65def3a77984",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/1/1d/Valentina2AS4.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Valentina",
  },
  {
    dragName: "Farrah Moan",
    mainSeasonAppearedOn: "9",
    mainSeasonPlacement: "8",
    mainSeasonChallengeWins: "0",
    uid: "30d21179-9b34-4d1b-923d-d629d30b649f",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/5/52/FarrahMoanAS4.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Farrah_Moan",
  },
  {
    dragName: "Aja",
    mainSeasonAppearedOn: "9",
    mainSeasonPlacement: "9",
    mainSeasonChallengeWins: "0",
    uid: "a84a2bf8-87d8-4bca-a701-a008ea84b075",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/9/9f/AjaAS3.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Aja",
  },
  {
    dragName: "Cynthia Lee Fontaine",
    mainSeasonAppearedOn: "9",
    mainSeasonPlacement: "10",
    mainSeasonChallengeWins: "0",
    uid: "6d5fc73d-5131-4a72-bcda-84363ff6ad8e",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/3/34/CynthiaS9.jpg",
    queenHomepage:
      "https://rupaulsdragrace.fandom.com//wiki/Cynthia_Lee_Fontaine",
  },
  {
    dragName: "Eureka!",
    mainSeasonAppearedOn: "9",
    mainSeasonPlacement: "11",
    mainSeasonChallengeWins: "0",
    uid: "554c8a32-0cf0-4422-aeb7-90f36004acc3",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/3/3d/EurekaAS6.png",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Eureka_O%27Hara",
  },
  {
    dragName: "Charlie Hides",
    mainSeasonAppearedOn: "9",
    mainSeasonPlacement: "12",
    mainSeasonChallengeWins: "0",
    uid: "51a23c4d-7256-46f6-bf5e-77b2291f3202",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/9/97/CharlieS9.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Charlie_Hides",
  },
  {
    dragName: "Kimora Blac",
    mainSeasonAppearedOn: "9",
    mainSeasonPlacement: "13",
    mainSeasonChallengeWins: "0",
    uid: "cc97697b-0a46-4b69-82d6-f4927234757b",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/5/55/KimoraS9.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Kimora_Blac",
  },
  {
    dragName: "Jaymes Mansfield",
    mainSeasonAppearedOn: "9",
    mainSeasonPlacement: "14",
    mainSeasonChallengeWins: "0",
    uid: "49956778-9d1c-48db-851a-189163f6eaf8",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/7/7c/JaymesS9.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Jaymes_Mansfield",
  },
  {
    dragName: "Aquaria",
    mainSeasonAppearedOn: "10",
    mainSeasonPlacement: "1",
    mainSeasonChallengeWins: "3",
    uid: "eef0f118-60d1-4cc0-b806-27bd97c085db",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/7/77/AquariaS10.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Aquaria",
  },
  {
    dragName: "Kameron Michaels",
    mainSeasonAppearedOn: "10",
    mainSeasonPlacement: "2",
    mainSeasonChallengeWins: "1",
    uid: "84651da1-1567-4eb0-a156-42f81df3d0fc",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/8/81/KameronVRS1.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Kameron_Michaels",
  },
  {
    dragName: "Eureka!",
    mainSeasonAppearedOn: "10",
    mainSeasonPlacement: "2",
    mainSeasonChallengeWins: "2",
    uid: "3a5a55a7-9951-4031-87df-59790f8ebc3d",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/3/3d/EurekaAS6.png",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Eureka",
  },
  {
    dragName: "Asia O'Hara",
    mainSeasonAppearedOn: "10",
    mainSeasonPlacement: "4",
    mainSeasonChallengeWins: "2",
    uid: "c1e22079-64de-4203-b93e-d3c29b6ae399",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/8/84/AsiaVRS1.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Asia_O%27Hara",
  },
  {
    dragName: "Miz Cracker",
    mainSeasonAppearedOn: "10",
    mainSeasonPlacement: "5",
    mainSeasonChallengeWins: "1",
    uid: "9373122e-a712-4077-8258-42535b60d84e",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/3/36/MizCrackerAllStars5.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Miz_Cracker",
  },
  {
    dragName: "Monét X Change",
    mainSeasonAppearedOn: "10",
    mainSeasonPlacement: "6",
    mainSeasonChallengeWins: "0",
    uid: "cb26121d-c646-41ae-b153-cdb0901a4021",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/2/2a/Mon%C3%A9tXChangeAS7.jpg",
    queenHomepage:
      "https://rupaulsdragrace.fandom.com//wiki/Mon%C3%A9t_X_Change",
  },
  {
    dragName: "The Vixen",
    mainSeasonAppearedOn: "10",
    mainSeasonPlacement: "7",
    mainSeasonChallengeWins: "1",
    uid: "454679d2-ec6f-429c-babb-94f7c49be5bb",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/5/5e/VixenS10.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/The_Vixen",
  },
  {
    dragName: "Mo Heart",
    mainSeasonAppearedOn: "10",
    mainSeasonPlacement: "8",
    mainSeasonChallengeWins: "0",
    uid: "a474e25a-38ab-441b-8015-6bec523ab010",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/a/ae/MoHeartUKvsTW.jpeg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Mo_Heart",
  },
  {
    dragName: "Blair St. Clair",
    mainSeasonAppearedOn: "10",
    mainSeasonPlacement: "9",
    mainSeasonChallengeWins: "0",
    uid: "fb6fdfa2-60d1-4eb1-a2dc-a65247f1f2b4",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/5/5a/BlairStClairAllStars5.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Blair_St._Clair",
  },
  {
    dragName: "Mayhem Miller",
    mainSeasonAppearedOn: "10",
    mainSeasonPlacement: "10",
    mainSeasonChallengeWins: "1",
    uid: "d6e09203-9c6e-45a3-869e-2b24cefc73f2",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/d/d5/MayhemMillerAllStars5.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Mayhem_Miller",
  },
  {
    dragName: "Dusty Ray Bottoms",
    mainSeasonAppearedOn: "10",
    mainSeasonPlacement: "11",
    mainSeasonChallengeWins: "0",
    uid: "aeedc595-0700-4dde-84ee-7af2beff3a63",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/a/a4/DustyS10.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Dusty_Ray_Bottoms",
  },
  {
    dragName: "Yuhua Hamasaki",
    mainSeasonAppearedOn: "10",
    mainSeasonPlacement: "12",
    mainSeasonChallengeWins: "0",
    uid: "2f5b33e4-17b3-4c19-ab0b-6ccb33efb3c2",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/c/c5/YuhuaS10.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Yuhua_Hamasaki",
  },
  {
    dragName: "Kalorie Karbdashian-Williams",
    mainSeasonAppearedOn: "10",
    mainSeasonPlacement: "13",
    mainSeasonChallengeWins: "0",
    uid: "71b083fc-d23c-42ec-a70c-0b5b8cc3c997",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/b/be/KalorieS10.jpg",
    queenHomepage:
      "https://rupaulsdragrace.fandom.com//wiki/Kalorie_Karbdashian-Williams",
  },
  {
    dragName: "Vanessa Vanjie Mateo",
    mainSeasonAppearedOn: "10",
    mainSeasonPlacement: "14",
    mainSeasonChallengeWins: "0",
    uid: "5f9c9c82-02f0-4b7a-91f7-c9d63bd2b4dd",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/5/5d/VanessaVRS1.jpg",
    queenHomepage:
      "https://rupaulsdragrace.fandom.com//wiki/Vanessa_Vanjie_Mateo",
  },
  {
    dragName: "Yvie Oddly",
    mainSeasonAppearedOn: "11",
    mainSeasonPlacement: "1",
    mainSeasonChallengeWins: "1",
    uid: "e56561cb-946a-4d41-bf1a-a102a47bf92a",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/d/d8/YvieOddlyAS7.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Yvie_Oddly",
  },
  {
    dragName: "Brooke Lynn Hytes",
    mainSeasonAppearedOn: "11",
    mainSeasonPlacement: "2",
    mainSeasonChallengeWins: "3",
    uid: "08497063-1ee1-4a18-9728-68a8fc0fde79",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/4/4f/BrookeLynnHytesJudgePromoCAvsTW1.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Brooke_Lynn_Hytes",
  },
  {
    dragName: "Silky Nutmeg Ganache",
    mainSeasonAppearedOn: "11",
    mainSeasonPlacement: "3",
    mainSeasonChallengeWins: "2",
    uid: "bb65be4b-c35d-4513-bdac-c62918690ff3",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/f/fb/SilkyNutmegGanacheCAvsTW.jpg",
    queenHomepage:
      "https://rupaulsdragrace.fandom.com//wiki/Silky_Nutmeg_Ganache",
  },
  {
    dragName: "A'keria C. Davenport",
    mainSeasonAppearedOn: "11",
    mainSeasonPlacement: "3",
    mainSeasonChallengeWins: "2",
    uid: "15220a40-469e-41d1-a264-276d16658dd7",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/8/80/A%27keriaChanelDavenportAS6.png",
    queenHomepage:
      "https://rupaulsdragrace.fandom.com//wiki/A%27keria_C._Davenport",
  },
  {
    dragName: "Vanessa Vanjie Mateo",
    mainSeasonAppearedOn: "11",
    mainSeasonPlacement: "5",
    mainSeasonChallengeWins: "0",
    uid: "a3da5430-1d35-4b21-9ad0-8969992f5196",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/5/5d/VanessaVRS1.jpg",
    queenHomepage:
      "https://rupaulsdragrace.fandom.com//wiki/Vanessa_Vanjie_Mateo",
  },
  {
    dragName: "Nina West",
    mainSeasonAppearedOn: "11",
    mainSeasonPlacement: "6",
    mainSeasonChallengeWins: "2",
    uid: "add922c0-1d9e-48ea-9fd5-a2eddb7c60ae",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/6/60/Nina_West.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Nina_West",
  },
  {
    dragName: "Shuga Cain",
    mainSeasonAppearedOn: "11",
    mainSeasonPlacement: "7",
    mainSeasonChallengeWins: "0",
    uid: "d43a963d-6232-4e20-bfa0-b9206b6a5aa2",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/d/d5/Shuga_Cain.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Shuga_Cain",
  },
  {
    dragName: "Plastique Tiara",
    mainSeasonAppearedOn: "11",
    mainSeasonPlacement: "8",
    mainSeasonChallengeWins: "1",
    uid: "6c637604-2191-456d-9b5b-6893f380c713",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/f/f6/Plastique_Tiara.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Plastique_Tiara",
  },
  {
    dragName: "Ra'Jah O'Hara",
    mainSeasonAppearedOn: "11",
    mainSeasonPlacement: "9",
    mainSeasonChallengeWins: "0",
    uid: "67179714-3fd0-4ac1-b44f-2af96bccef55",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/3/3b/Ra%27JahO%27HaraCAvsTW.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Ra%27Jah_O%27Hara",
  },
  {
    dragName: "Scarlet Envy",
    mainSeasonAppearedOn: "11",
    mainSeasonPlacement: "10",
    mainSeasonChallengeWins: "1",
    uid: "b9a814ab-85fd-4ad3-895a-d07e47ef99b1",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/e4/ScarletEnvyAS6.png",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Scarlet_Envy",
  },
  {
    dragName: "Ariel Versace",
    mainSeasonAppearedOn: "11",
    mainSeasonPlacement: "11",
    mainSeasonChallengeWins: "0",
    uid: "45a0924a-c553-471a-b751-2fc3cc619bf4",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/3/3a/Ariel_Versace.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Ariel_Versace",
  },
  {
    dragName: "Mercedes Iman Diamond",
    mainSeasonAppearedOn: "11",
    mainSeasonPlacement: "12",
    mainSeasonChallengeWins: "0",
    uid: "a77b737e-2856-4c5e-9ec8-709b10d89e01",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/1/10/Mercedes_Iman_Diamond.jpg",
    queenHomepage:
      "https://rupaulsdragrace.fandom.com//wiki/Mercedes_Iman_Diamond",
  },
  {
    dragName: "Honey Davenport",
    mainSeasonAppearedOn: "11",
    mainSeasonPlacement: "13",
    mainSeasonChallengeWins: "0",
    uid: "67ddbdb5-fc14-4c63-b26c-553a8ceb9b7a",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/8/83/Honey_Davenport.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Honey_Davenport",
  },
  {
    dragName: "Kahanna Montrese",
    mainSeasonAppearedOn: "11",
    mainSeasonPlacement: "14",
    mainSeasonChallengeWins: "0",
    uid: "e769f1a1-591c-4d92-90bd-333c504d4f84",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/b/b9/Kahanna_Montrese.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Kahanna_Montrese",
  },
  {
    dragName: "Soju",
    mainSeasonAppearedOn: "11",
    mainSeasonPlacement: "15",
    mainSeasonChallengeWins: "0",
    uid: "9ff2bc84-0119-4913-816f-c22474383baf",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/8/84/Soju.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Soju",
  },
  {
    dragName: "Jaida Essence Hall",
    mainSeasonAppearedOn: "12",
    mainSeasonPlacement: "1",
    mainSeasonChallengeWins: "3",
    uid: "6742388a-6659-4dbf-8cef-40f44a87ab74",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/4/4d/JaidaEssenceHallAS7.jpg",
    queenHomepage:
      "https://rupaulsdragrace.fandom.com//wiki/Jaida_Essence_Hall",
  },
  {
    dragName: "Crystal Methyd",
    mainSeasonAppearedOn: "12",
    mainSeasonPlacement: "2",
    mainSeasonChallengeWins: "1",
    uid: "10a37a00-ba21-4447-8fb6-9ce9b6b377b9",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/f/ff/CrystalMethyd.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Crystal_Methyd",
  },
  {
    dragName: "Gigi Goode",
    mainSeasonAppearedOn: "12",
    mainSeasonPlacement: "2",
    mainSeasonChallengeWins: "4",
    uid: "161c4b9c-00c0-435d-ae28-a7b7f90d9d94",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/d/d2/GigiGoode.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Gigi_Goode",
  },
  {
    dragName: "Jackie Cox",
    mainSeasonAppearedOn: "12",
    mainSeasonPlacement: "5",
    mainSeasonChallengeWins: "0",
    uid: "b7b989a1-a754-400e-9306-e04c035b53a8",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/5/52/JackieCox.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Jackie_Cox",
  },
  {
    dragName: "Heidi N Closet",
    mainSeasonAppearedOn: "12",
    mainSeasonPlacement: "6",
    mainSeasonChallengeWins: "1",
    uid: "41074f89-7f86-4552-908a-99d236a12ede",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/8/85/HeidiNCloset.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Heidi_N_Closet",
  },
  {
    dragName: "Widow Von'Du",
    mainSeasonAppearedOn: "12",
    mainSeasonPlacement: "7",
    mainSeasonChallengeWins: "1",
    uid: "48dc33cb-08b6-4112-844b-0329f047f3b8",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/2/24/WidowVonDu.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Widow_Von%27Du",
  },
  {
    dragName: "Jan",
    mainSeasonAppearedOn: "12",
    mainSeasonPlacement: "8",
    mainSeasonChallengeWins: "0",
    uid: "bbbc9a11-ad2a-492c-84a0-46b7be2abf5e",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/9/9e/JanAS6.png",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Jan",
  },
  {
    dragName: "Brita",
    mainSeasonAppearedOn: "12",
    mainSeasonPlacement: "9",
    mainSeasonChallengeWins: "0",
    uid: "65026a58-ab5b-44a3-a17d-163a2c32c6b7",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/7/7f/Brita.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Brita",
  },
  {
    dragName: "Aiden Zhane",
    mainSeasonAppearedOn: "12",
    mainSeasonPlacement: "10",
    mainSeasonChallengeWins: "0",
    uid: "741a3df2-cfe5-4205-ae5e-f0af9dc0ecc6",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/c/cd/AidenZhane.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Aiden_Zhane",
  },
  {
    dragName: "Nicky Doll",
    mainSeasonAppearedOn: "12",
    mainSeasonPlacement: "11",
    mainSeasonChallengeWins: "0",
    uid: "2114b466-760c-469b-9d70-d49dbd265e77",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/6/61/NickyDollDRF1.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Nicky_Doll",
  },
  {
    dragName: "Rock M. Sakura",
    mainSeasonAppearedOn: "12",
    mainSeasonPlacement: "12",
    mainSeasonChallengeWins: "0",
    uid: "bfa2841c-95f1-4e73-a8e6-a86de9cf4ba7",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/c/cf/RockMSakura.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Rock_M._Sakura",
  },
  {
    dragName: "Dahlia Sin",
    mainSeasonAppearedOn: "12",
    mainSeasonPlacement: "13",
    mainSeasonChallengeWins: "0",
    uid: "fddc5fe4-107a-4850-a2a4-ef6a1ad4fb4e",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/1/16/DahliaSin.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Dahlia_Sin",
  },
  {
    dragName: "Symone",
    mainSeasonAppearedOn: "13",
    mainSeasonPlacement: "1",
    mainSeasonChallengeWins: "4",
    uid: "be60d63d-1ce1-43b2-970b-173bf9ed988e",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/2/21/Symone.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Symone",
  },
  {
    dragName: "Kandy Muse",
    mainSeasonAppearedOn: "13",
    mainSeasonPlacement: "2",
    mainSeasonChallengeWins: "1",
    uid: "720c0d3b-c541-41ca-b777-9dd91205f668",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/4/46/KandyMuse.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Kandy_Muse",
  },
  {
    dragName: "Rosé",
    mainSeasonAppearedOn: "13",
    mainSeasonPlacement: "3",
    mainSeasonChallengeWins: "3",
    uid: "9b0acc70-b68d-4a1d-b004-27edb449ce75",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/2/25/Ros%C3%A9.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Ros%C3%A9",
  },
  {
    dragName: "Gottmik",
    mainSeasonAppearedOn: "13",
    mainSeasonPlacement: "3",
    mainSeasonChallengeWins: "2",
    uid: "710e5296-c0b6-449e-a0f1-7a3ee074c6c8",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/2/22/Gottmik.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Gottmik",
  },
  {
    dragName: "Olivia Lux",
    mainSeasonAppearedOn: "13",
    mainSeasonPlacement: "5",
    mainSeasonChallengeWins: "2",
    uid: "7da68988-2c20-4cfc-82d4-d46a0ee39baf",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/1/11/OliviaLux.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Olivia_Lux",
  },
  {
    dragName: "Utica Queen",
    mainSeasonAppearedOn: "13",
    mainSeasonPlacement: "6",
    mainSeasonChallengeWins: "1",
    uid: "d2c8ebe0-7bd0-4877-9c2a-2fbe29937109",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/3/34/UticaQueen.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Utica_Queen",
  },
  {
    dragName: "Tina Burner",
    mainSeasonAppearedOn: "13",
    mainSeasonPlacement: "7",
    mainSeasonChallengeWins: "0",
    uid: "d1df2589-573c-4886-9a3d-bfab6cf74141",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/0/05/TinaBurner.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Tina_Burner",
  },
  {
    dragName: "Denali",
    mainSeasonAppearedOn: "13",
    mainSeasonPlacement: "8",
    mainSeasonChallengeWins: "1",
    uid: "f41476b0-2720-4f04-90c4-629c7511df44",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/6/69/Denali.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Denali",
  },
  {
    dragName: "Elliott with 2 Ts",
    mainSeasonAppearedOn: "13",
    mainSeasonPlacement: "9",
    mainSeasonChallengeWins: "0",
    uid: "4ea7030f-beee-42f6-a3d4-b37bba01675e",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/e4/Elliottwith2Ts.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Elliott_with_2_Ts",
  },
  {
    dragName: "LaLa Ri",
    mainSeasonAppearedOn: "13",
    mainSeasonPlacement: "10",
    mainSeasonChallengeWins: "0",
    uid: "ca8098b7-632b-417a-99f5-82a2edcb5b3f",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/f/f3/LaLaRi.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/LaLa_Ri",
  },
  {
    dragName: "Tamisha Iman",
    mainSeasonAppearedOn: "13",
    mainSeasonPlacement: "11",
    mainSeasonChallengeWins: "0",
    uid: "f0a0ad60-df4a-4874-ae49-0b8b7d155f64",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/9/99/TamishaIman.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Tamisha_Iman",
  },
  {
    dragName: "Joey Jay",
    mainSeasonAppearedOn: "13",
    mainSeasonPlacement: "12",
    mainSeasonChallengeWins: "0",
    uid: "16db466c-5239-4cd0-abe0-8ae7783fd3b5",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/2/2b/JoeyJay.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Joey_Jay",
  },
  {
    dragName: "Kahmora Hall",
    mainSeasonAppearedOn: "13",
    mainSeasonPlacement: "13",
    mainSeasonChallengeWins: "0",
    uid: "961836a9-bed0-4699-8ec8-2b7544ca77c1",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/e1/KahmoraHall.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Kahmora_Hall",
  },
  {
    dragName: "Willow Pill",
    mainSeasonAppearedOn: "14",
    mainSeasonPlacement: "1",
    mainSeasonChallengeWins: "1",
    uid: "4729be5c-f7bb-49e4-9151-483fc00262c2",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/7/75/WillowPill.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Willow_Pill",
  },
  {
    dragName: "Lady Camden",
    mainSeasonAppearedOn: "14",
    mainSeasonPlacement: "2",
    mainSeasonChallengeWins: "3",
    uid: "2186ddc2-1cf3-49fc-a3d2-8d369569380d",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/6/6e/LadyCamden.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Lady_Camden",
  },
  {
    dragName: "Bosco",
    mainSeasonAppearedOn: "14",
    mainSeasonPlacement: "3",
    mainSeasonChallengeWins: "3",
    uid: "be8c6f7d-818c-45fc-975f-cffdaf8b8cdc",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/0/06/Bosco.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Bosco",
  },
  {
    dragName: "Angeria Paris VanMicheals",
    mainSeasonAppearedOn: "14",
    mainSeasonPlacement: "3",
    mainSeasonChallengeWins: "2",
    uid: "5839848b-989d-4d6b-8c47-ee301c334355",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/5/5b/AngeriaParisVanMicheals.jpg",
    queenHomepage:
      "https://rupaulsdragrace.fandom.com//wiki/Angeria_Paris_VanMicheals",
  },
  {
    dragName: "Daya Betty",
    mainSeasonAppearedOn: "14",
    mainSeasonPlacement: "3",
    mainSeasonChallengeWins: "1",
    uid: "0472340b-0e97-46f3-9aa8-c1f7de425c27",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/b/b7/DayaBetty.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Daya_Betty",
  },
  {
    dragName: "Jorgeous",
    mainSeasonAppearedOn: "14",
    mainSeasonPlacement: "6",
    mainSeasonChallengeWins: "1",
    uid: "7a9ec24b-34d4-4989-9c72-458a53630ede",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/1/14/Jorgeous.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Jorgeous",
  },
  {
    dragName: "DeJa Skye",
    mainSeasonAppearedOn: "14",
    mainSeasonPlacement: "6",
    mainSeasonChallengeWins: "1",
    uid: "876c6af8-09a4-4b3f-86bd-3adf6fafce6d",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/1/16/DeJaSkye.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/DeJa_Skye",
  },
  {
    dragName: "Jasmine Kennedie",
    mainSeasonAppearedOn: "14",
    mainSeasonPlacement: "8",
    mainSeasonChallengeWins: "0",
    uid: "ece6234e-8c7d-4dbb-9a2e-d794559978c1",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/1/12/JasmineKennedie.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Jasmine_Kennedie",
  },
  {
    dragName: "Kerri Colby",
    mainSeasonAppearedOn: "14",
    mainSeasonPlacement: "9",
    mainSeasonChallengeWins: "0",
    uid: "2dfef98c-8a48-472e-8bac-0160fadc5c48",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/2/26/KerriColby.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Kerri_Colby",
  },
  {
    dragName: "Maddy Morphosis",
    mainSeasonAppearedOn: "14",
    mainSeasonPlacement: "10",
    mainSeasonChallengeWins: "0",
    uid: "04464b62-cc70-4fbd-980e-c50584d21c27",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/3/3d/MaddyMorphosis.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Maddy_Morphosis",
  },
  {
    dragName: "Orion Story",
    mainSeasonAppearedOn: "14",
    mainSeasonPlacement: "11",
    mainSeasonChallengeWins: "0",
    uid: "def71524-e02e-4463-99f5-d55a0301e47e",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/8/87/OrionStory.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Orion_Story",
  },
  {
    dragName: 'Kornbread "The Snack" Jeté',
    mainSeasonAppearedOn: "14",
    mainSeasonPlacement: "12",
    mainSeasonChallengeWins: "1",
    uid: "3e9dd7f4-7102-4cce-986f-a72e687e7907",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/c/c9/KornbreadTheSnack.jpg",
    queenHomepage:
      "https://rupaulsdragrace.fandom.com//wiki/Kornbread_%22The_Snack%22_Jet%C3%A9",
  },
  {
    dragName: "Alyssa Hunter",
    mainSeasonAppearedOn: "14",
    mainSeasonPlacement: "13",
    mainSeasonChallengeWins: "0",
    uid: "89aea96e-494d-4fc9-8557-cb8e4de20c75",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/0/01/AlyssaHunter.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/Alyssa_Hunter",
  },
  {
    dragName: "June Jambalaya",
    mainSeasonAppearedOn: "14",
    mainSeasonPlacement: "14",
    mainSeasonChallengeWins: "0",
    uid: "dde43dec-149a-4ec7-8dcd-a727139d5cb0",
    queenImage:
      "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/7/74/JuneJambalaya.jpg",
    queenHomepage: "https://rupaulsdragrace.fandom.com//wiki/June_Jambalaya",
  },
];

export default function Dashboard() {
  const [error, setError] = useState("");
  const [myQueensUID, setMyQueensUID] = useState([]);
  const [myQueensUIDSToRenderState, setMyQueensUIDSToRenderState] = useState(
    []
  );
  const [tooManyQueensMessage, setTooManyQueensMessage] = useState(false);

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

  //WRITE
  function writeToDatabase(uidProp) {
    if (myQueensUIDSToRenderState.length <= 4) {
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
    } else {
      setTooManyQueensMessage(true);
    }
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
  function handleDelete(uidProp) {
    const findSelectedQueen = queenDatabase.find(function (
      theQueenThatIsCurrentlyBeingIndexed
    ) {
      return theQueenThatIsCurrentlyBeingIndexed.uid === uidProp;
    });

    const uidVariable = findSelectedQueen.uid;

    remove(ref(db, `/${auth.currentUser.uid}/${uidVariable}`));
    console.log("test", uid);
  }

  return (
    <div className="dashboardContainer">
      <Modal
        onOpenOfModal={tooManyQueensMessage}
        onCloseOfModal={() => setTooManyQueensMessage(false)}
      ></Modal>
      <div className="myQueenElements">{myQueenElements}</div>
      <ViewAllQueensHeader />
      {gridQueenElements}
      <ScrollToTop />
    </div>
  );
}
