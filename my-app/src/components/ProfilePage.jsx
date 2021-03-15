import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import BackButton from "@material-ui/icons/KeyboardBackspace";
import firebase from "firebase/app";
import { Link } from "react-router-dom";
import { USER } from "../App";

const LogInDiv = ({ onBack }) => {
   return (
      <div
         className="container"
         style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "95vh",
            position: "relative",
         }}
      >
         <BackButton
            style={{
               width: "3rem",
               height: "2.5rem",
               cursor: "pointer",
               opacity: "0.7",
               position: "fixed",
               top: "0",
               left: "0",
            }}
            onClick={onBack}
         />
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

function ProfilePage() {
   const user = useContext(USER);
   const [isLoggedIn, setIsLoggedIn] = useState();
   const history = useHistory();

   const handleBack = () => {
      history.push("/");
   };

   useEffect(() => {
      if (user !== "") {
         setIsLoggedIn(true);
      } else {
         setIsLoggedIn(false);
      }
      return;
   }, [user, isLoggedIn]);

   const handleLogout = () => {
      firebase
         .auth()
         .signOut()
         .then(() => {
            window.location.reload();
         })
         .catch((error) => {
            alert(error);
         });
   };

   return (
      <>
         <div className="profile-container">
            {!isLoggedIn ? (
               <LogInDiv onBack={handleBack} />
            ) : (
               <>
                  <div className="profile-info-container">
                     <BackButton
                        style={{
                           width: "3rem",
                           height: "2.5rem",
                           cursor: "pointer",
                           opacity: "0.7",
                           position: "absolute",
                           fill: "white",
                        }}
                        onClick={handleBack}
                     />
                     <div className="profile-info">
                        <div className="profile-img-div">
                           <img src={user.photoURL} alt="user-pic" />
                        </div>
                        <h3>{user.displayName}</h3>
                     </div>
                  </div>
                  <button
                     className="btn btn-danger logout-btn"
                     onClick={handleLogout}
                  >
                     Log Out
                  </button>
               </>
            )}
         </div>
      </>
   );
}

export default ProfilePage;
