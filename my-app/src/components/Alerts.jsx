import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TitleBar from "./TitleBar";
import FooterNav from "./FooterNav";
import AlertCard from "./AlertCard";
import { USER } from "../App";
import firebase from "../firebase/config";

const LoginDiv = () => {
   return (
      <div
         className="container"
         style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "86vh",
            position: "relative",
         }}
      >
         <div className="login-icon" />
         <p>
            <Link to="/login">
               <span style={{ color: "blue", textDecoration: "underline" }}>
                  Log-In
               </span>
            </Link>{" "}
            to view this page
         </p>
      </div>
   );
};

const Alerts = () => {
   const user = useContext(USER);
   const [body, setBody] = useState("");

   const handleDelete = (alertId, coinName) => {
      let dbRef = firebase.database().ref(`alerts/${user.uid}/${alertId}`);
      dbRef
         .remove()
         .then(() => alert(`${coinName} has been deleted.`))
         .catch((err) => alert(err));
   };

   let dbRef;
   useEffect(() => {
      const getData = async () => {
         dbRef = await firebase.database().ref(`alerts/${user.uid}`);
         dbRef.on("value", (snapshot) => {
            let data = snapshot.val();
            if (data !== null) {
               let myArr = Object.entries(data);
               setBody(
                  myArr.map((val) => (
                     <AlertCard
                        key={val[0]}
                        data={{
                           alertId: val[0],
                           value: val[1],
                        }}
                        onDelete={handleDelete}
                     />
                  ))
               );
            } else {
               setBody(
                  <div className="not-found-div">
                     <div className="not-found-div-image" />
                     <h3>No Alerts Found</h3>
                  </div>
               );
            }
         });
      };
      getData();

      return () => {
         dbRef.off();
      };
   });

   return (
      <>
         <TitleBar />
         <div className="alerts-container">
            {user === "" ? (
               <LoginDiv />
            ) : (
               <>
                  <div
                     className="container"
                     style={{
                        overflowY: "hidden",
                        height: "89vh",
                        backgroundColor: "rgba(229, 229, 229, 0.5)",
                     }}
                  >
                     <div className="alert-title">
                        <h1>Alerts</h1>
                     </div>
                     <hr style={{ width: "100%", marginBottom: "2rem" }} />
                     <div
                        className="alert-card-container"
                        style={{
                           overflowY: "auto",
                           height: "65vh",
                        }}
                     >
                        {body}
                     </div>
                  </div>
               </>
            )}
            <FooterNav />
         </div>
      </>
   );
};

export default Alerts;
