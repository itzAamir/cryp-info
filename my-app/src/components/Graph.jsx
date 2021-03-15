import React, { useRef, useEffect, useState } from "react";
import Chartjs from "chart.js";
import { historyOptions } from "../chartConfig";

const Graph = ({ data, coinName }) => {
   const chartRef = useRef();
   const { day, week, year } = data;
   const [timeFormat, setTimeFormat] = useState("24h");

   const determineTimeFormat = () => {
      if (timeFormat === "24h") {
         return day;
      } else if (timeFormat === "1 Week") {
         return week;
      } else if (timeFormat === "1 Year") {
         return year;
      }
   };

   useEffect(() => {
      if (chartRef && chartRef.current) {
         new Chartjs(chartRef.current, {
            type: "line",
            data: {
               datasets: [
                  {
                     label: `${coinName} ${timeFormat} Price Chart`,
                     data: determineTimeFormat(),
                     backgroundColor: "rgba(174, 305, 194, 0.5)",
                     borderColor: "rgba(174, 305, 194, 0.4)",
                     pointRadius: 0,
                  },
               ],
            },
            options: { ...historyOptions },
         });
      }
      return;
   });

   return (
      <div
         className="graph-container"
         style={{
            display: "flex",
            flexDirection: "column",
         }}
      >
         <div className="graph" style={{ width: "100%", padding: "1rem" }}>
            <canvas
               ref={chartRef}
               id="myChart"
               height={250}
               width={250}
            ></canvas>
         </div>
         <div className="time-format-btns">
            <button
               className="time-format-btn unselectable"
               onClick={() => setTimeFormat("24h")}
            >
               24h
            </button>
            <button
               className="time-format-btn unselectable"
               onClick={() => setTimeFormat("1 Week")}
            >
               1 week
            </button>
            <button
               className="time-format-btn unselectable"
               onClick={() => setTimeFormat("1 Year")}
            >
               1 Year
            </button>
         </div>
      </div>
   );
};

export default Graph;
