import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

const AlertCard = (props) => {
   const value = props.data.value;
   const alertId = props.data.alertId;

   return (
      <div className="alert-card" style={{ backgroundColor: "white" }}>
         <div className="alerts-info">
            <span className="alert-name">
               <b>{value.coinName}</b>
            </span>
            <span
               className="alert-time-interval badge bg-secondary"
               style={{ marginLeft: "1rem", color: "white" }}
            >
               {value.timeInterval}hr
            </span>
         </div>
         <div className="alert-time">Created at: {value.date}</div>
         <button
            className="btn btn-danger delete-card-btn"
            onClick={() => props.onDelete(alertId, value.coinName)}
         >
            <DeleteIcon />
         </button>
      </div>
   );
};

export default AlertCard;
