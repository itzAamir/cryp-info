import React from "react";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import StorageIcon from "@material-ui/icons/Storage";

const CoinData = (props) => {
   return (
      <>
         <div className="coin-data">
            <div className="title-div">
               {props.icon}{" "}
               <span style={{ marginLeft: "0.6rem" }}>{props.title}</span>
            </div>
            <span
               style={{
                  textAlign: "right",
                  width: "40%",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
               }}
            >
               {props.value}
            </span>
         </div>
         <hr />
      </>
   );
};

const CoinInfo = ({ data, formatCurrency }) => {
   const description = data.description.en;
   const newDesc = description.split(".");
   return (
      <>
         <div className="coin-info-bottom">
            <h3 style={{ textTransform: "uppercase" }}>About {data.symbol}</h3>
            <div className="coin-data-container">
               <CoinData
                  key="market-rank"
                  icon={<TrendingUpIcon />}
                  title="Market Rank"
                  value={`#${data.market_cap_rank}`}
               />
               <CoinData
                  key="market-cap"
                  icon={<AttachMoneyIcon />}
                  title="Market Cap"
                  value={`${formatCurrency(data.market_data.market_cap.inr)}`}
               />
               <CoinData
                  key="circulation"
                  icon={<RotateLeftIcon />}
                  title="Circulating Supply"
                  value={`${data.symbol} ${data.market_data.circulating_supply}`}
               />
               <CoinData
                  key="total-supply"
                  icon={<StorageIcon />}
                  title="Total Supply"
                  value={`${
                     data.market_data.max_supply === null
                        ? "unlimited"
                        : data.market_data.max_supply
                  }`}
               />
            </div>
         </div>
         <div className="coin-description-container">
            <h3>
               What is{" "}
               <span style={{ textTransform: "uppercase" }}>{data.symbol}</span>
               ?
            </h3>
            <div className="coin-desc" style={{ opacity: "0.8" }}>
               <p>{newDesc[0]}.</p>
               <p>{newDesc[1]}.</p>
            </div>
         </div>
      </>
   );
};

export default CoinInfo;
