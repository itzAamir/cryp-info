import React from "react";

const Card = ({ data }) => {
   const arrowSymbol = String(data.price_change_percentage_24h).includes("-")
      ? "down"
      : "up";

   const formatCurrency = (number) => {
      let formatter = new Intl.NumberFormat("en-US", {
         style: "currency",
         currency: "inr",
      });
      return formatter.format(number);
   };

   return (
      <div className="card">
         <img src={data.image} alt={data.symbol} />
         <div className="info">
            <div className="price-row">
               <div
                  className="coin-name"
                  style={{
                     fontSize: "2rem",
                     opacity: "0.8",
                     fontFamily: "monospace",
                  }}
               >
                  {data.name}
               </div>
               <div className="percent-change">
                  <div className={`percent-change-arrow-${arrowSymbol}`} />
                  <span
                     style={{ color: arrowSymbol === "down" ? "red" : "green" }}
                  >
                     {data.price_change_percentage_24h.toFixed(2)}%
                  </span>
               </div>
            </div>
            <div
               className="current-price"
               style={{
                  fontSize: "0.9rem",
                  opacity: "0.6",
               }}
            >
               Current Price: {formatCurrency(data.current_price)}
            </div>
         </div>
      </div>
   );
};

export default Card;
