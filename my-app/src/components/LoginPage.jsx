import React from "react";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import TitleBar from "./TitleBar";
// import FooterNav from "./FooterNav";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";

const LoginPage = () => {
   let history = useHistory();
   const handleLogin = () => {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
         .auth()
         .signInWithPopup(provider)
         .then(() => {
            history.goBack();
         })
         .catch((error) => {
            console.error(error);
         });
   };

   return (
      <>
         <TitleBar />
         <div className="login-container">
            <div className="login-box">
               <AssignmentIndIcon
                  style={{ fill: "white", height: "11rem", width: "11rem" }}
               />
               <button className="btn btn-primary" onClick={handleLogin}>
                  <div className="google-icon-div">
                     <div className="google-icon" />
                  </div>
                  Login with google
               </button>
            </div>
         </div>
         {/* <FooterNav /> */}
      </>
   );
};

export default LoginPage;
