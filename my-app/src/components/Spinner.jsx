import React from "react";
import "./component-css/spinner.css";

const Spinner = () => {
   return (
      <div className="spinner-div">
         <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
         </div>
      </div>
   );
};

export default Spinner;
