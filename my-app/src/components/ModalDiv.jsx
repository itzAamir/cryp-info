import React, { useState, useContext, useRef } from "react";
import Modal from "react-modal";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import { Link } from "react-router-dom";
import { USER } from "../App";
import Firebase from "firebase/app";

const customStyles = {
   content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "25rem",
      width: "75%",
      overflow: "hidden",
      borderRadius: "20px",
   },
};

const SignInComp = () => {
   return (
      <div
         style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
         }}
      >
         <div className="login-icon" />
         <p>
            <Link to="/login">
               <span style={{ color: "blue", textDecoration: "underline" }}>
                  Log-In
               </span>
            </Link>{" "}
            to create alerts
         </p>
      </div>
   );
};

const writeUserData = (
   uid,
   alertId,
   coinName,
   timeInterval,
   emailId,
   currDate
) => {
   Firebase.database()
      .ref(`alerts/${uid}/${alertId}`)
      .set({
         coinName,
         timeInterval,
         emailId,
         date: currDate,
      })
      .then(() => {
         alert(`Price alert have been set after ${timeInterval} hours`);
      })
      .catch((err) => alert(err));
};

Modal.setAppElement("#root");

const ModalDiv = ({ coinName }) => {
   const coinNameRef = useRef("");
   const timeIntervalRef = useRef("");
   const user = useContext(USER);
   const [modalIsOpen, setIsOpen] = useState(false);

   const handleSubmit = (e) => {
      e.preventDefault();
      let coinNameVal = coinNameRef.current.value;
      let timeIntervalVal = timeIntervalRef.current.value;
      if (timeIntervalVal === "") {
         alert("Invalid Time Interval");
      } else {
         let uniqueId = require("uniqid");
         let d = new Date();
         let currDate = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.toLocaleTimeString()}`;
         writeUserData(
            user.uid,
            uniqueId() + uniqueId(),
            coinNameVal,
            timeIntervalVal,
            user.email,
            currDate
         );
         closeModal();
      }
   };

   function openModal() {
      setIsOpen(true);
   }

   function closeModal() {
      setIsOpen(false);
   }

   return (
      <>
         <div>
            <AddAlertOutlinedIcon
               onClick={openModal}
               style={{
                  width: "3rem",
                  height: "2rem",
                  cursor: "pointer",
                  opacity: "0.7",
               }}
            />
            <Modal
               isOpen={modalIsOpen}
               onRequestClose={closeModal}
               style={customStyles}
               contentLabel="Alert Price Pop-Up"
            >
               {user === "" ? (
                  <SignInComp />
               ) : (
                  <div
                     className="container"
                     style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        position: "relative",
                     }}
                  >
                     <div
                        className="alert-title"
                        style={{
                           position: "absolute",
                           background: "black",
                           color: "white",
                           width: "118%",
                           height: "2rem",
                           top: "-2.3rem",
                           display: "grid",
                           placeItems: "center",
                        }}
                     >
                        Set Alert
                     </div>
                     <br />
                     <form onSubmit={handleSubmit}>
                        <label htmlFor="coin-name-inp" style={{ margin: "0" }}>
                           Coin Name:{" "}
                        </label>{" "}
                        <input
                           ref={coinNameRef}
                           id="coin-name-inp"
                           type="text"
                           value={coinName}
                           disabled={true}
                           style={{ padding: "5px" }}
                        />
                        <br />
                        <br />
                        <label htmlFor="time-interval-inp">
                           Time Interval:
                        </label>{" "}
                        <input
                           ref={timeIntervalRef}
                           id="time-interval-inp"
                           type="number"
                           placeholder="1"
                           max="24"
                           min="1"
                           style={{ padding: "3px" }}
                        />{" "}
                        hour
                        <br />
                        <br />
                        <div
                           style={{
                              display: "flex",
                              justifyContent: "space-around",
                           }}
                        >
                           <button
                              className="btn btn-success"
                              style={{ width: "40%" }}
                           >
                              Set
                           </button>
                           <button
                              className="btn btn-danger"
                              style={{ width: "40%" }}
                              onClick={closeModal}
                           >
                              Close
                           </button>
                        </div>
                     </form>
                  </div>
               )}
            </Modal>
         </div>
      </>
   );
};

export default ModalDiv;
