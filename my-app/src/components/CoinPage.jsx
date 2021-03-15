import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import FooterNav from "./FooterNav";
import CoinInfo from "./CoinInfo";
import ModalDiv from "./ModalDiv";
import Spinner from "./Spinner";
import Graph from "./Graph";
import BackButton from "@material-ui/icons/KeyboardBackspace";

const CoinPage = () => {
   const history = useHistory();
   const { id } = useParams();
   const [data, setData] = useState("");
   const [coinGraphData, setCoinGraphData] = useState({});
   const [dataAvailable, setDataAvailable] = useState(false);
   const [arrowSymbol, setArrowSymbol] = useState("up");
   const [loading, setLoading] = useState(false);

   const formatData = (data) => {
      return data.map((e) => {
         return { t: e[0], y: e[1].toFixed(2) };
      });
   };

   const formatCurrency = (number) => {
      let formatter = new Intl.NumberFormat("en-US", {
         style: "currency",
         currency: "inr",
      });
      return formatter.format(number);
   };

   useEffect(() => {
      setLoading(true);
      const getData = async () => {
         const [dayResult, weekResult, yearResult, details] = await Promise.all(
            [
               axios.get(
                  `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
                  {
                     params: {
                        vs_currency: "inr",
                        days: "1",
                     },
                  }
               ),
               axios.get(
                  `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
                  {
                     params: {
                        vs_currency: "inr",
                        days: "7",
                     },
                  }
               ),
               axios.get(
                  `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
                  {
                     params: {
                        vs_currency: "inr",
                        days: "365",
                     },
                  }
               ),
               axios.get("https://api.coingecko.com/api/v3/coins/" + id),
            ]
         );
         setData(details.data);
         setDataAvailable(true);
         if (
            String(
               details.data.market_data.price_change_percentage_24h_in_currency
                  .inr
            ).includes("-")
         ) {
            setArrowSymbol("down");
         }
         setCoinGraphData({
            day: formatData(dayResult.data.prices),
            week: formatData(weekResult.data.prices),
            year: formatData(yearResult.data.prices),
         });
         setLoading(false);
         return;
      };
      getData();
   }, [id]);

   const handleBack = () => {
      history.goBack();
   };

   return (
      <>
         <div className="coin-page-title">
            <BackButton
               style={{
                  width: "3rem",
                  height: "2.5rem",
                  cursor: "pointer",
                  opacity: "0.7",
               }}
               onClick={handleBack}
            />
            <ModalDiv coinName={data.name} />
         </div>
         {loading ? <Spinner /> : ""}
         <div className="coin-info-main-container">
            {dataAvailable && (
               <>
                  <div className="coin-info-container">
                     <div className="img-div">
                        <img src={data.image.small} alt={data.id} />
                     </div>
                     <div className="current-coin-price">
                        <span style={{ fontSize: "0.9rem" }}>
                           Current {data.symbol} Price
                        </span>
                        <div className="price-change">
                           <span
                              style={{
                                 fontSize: "1.5rem",
                                 fontFamily: "sans-serif",
                              }}
                           >
                              {formatCurrency(
                                 data.market_data.current_price.inr
                              )}
                           </span>
                           <div className="coin-percentage-change">
                              <div
                                 className={`percent-change-arrow-${arrowSymbol}`}
                              ></div>
                              <span
                                 style={{
                                    color:
                                       arrowSymbol === "down" ? "red" : "green",
                                 }}
                              >
                                 {data.market_data.price_change_percentage_24h.toFixed(
                                    2
                                 )}
                                 %
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="center-div">
                     <div
                        className="highest-lowest-div"
                        style={{ fontSize: "0.8rem" }}
                     >
                        <span>
                           24h Highest{" "}
                           <span>
                              {formatCurrency(data.market_data.high_24h.inr)}
                           </span>
                        </span>{" "}
                        |{" "}
                        <span>
                           24h Lowest{" "}
                           <span>
                              {formatCurrency(data.market_data.low_24h.inr)}
                           </span>
                        </span>
                     </div>
                  </div>
                  <Graph
                     key="graph"
                     data={coinGraphData}
                     coinName={data.name}
                  />
                  <CoinInfo data={data} formatCurrency={formatCurrency} />
               </>
            )}
         </div>
         <FooterNav />
      </>
   );
};

export default CoinPage;
