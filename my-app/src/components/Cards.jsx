import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import NoResults from "./NoResults";
import Spinner from "./Spinner";
import { NavLink } from "react-router-dom";

const Cards = () => {
   const [body, setBody] = useState();
   const [searchTerm, setSearchTerm] = useState("");
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const getData = () => {
         setLoading(true);
         let noOfData = "110";
         const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=${noOfData}&page=1&sparkline=false`;

         axios
            .get(url)
            .then((res) => {
               let data = res.data;
               setBody(
                  data
                     .filter((val) => {
                        if (val.name === "") {
                           return val;
                        } else if (
                           val.name
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                        ) {
                           return val;
                        } else {
                           return "";
                        }
                     })
                     .map((elem, index) => {
                        return (
                           <NavLink key={index} to={`crypto/${elem.id}`}>
                              <Card data={elem} />
                           </NavLink>
                        );
                     })
               );
               setLoading(false);
            })
            .catch((err) => console.error(err));
      };
      getData();
   }, [searchTerm]);

   return (
      <div className="card-container">
         <input
            type="text"
            id="searchBar"
            placeholder="Search..."
            onChange={(event) => setSearchTerm(event.target.value)}
         />
         <hr />
         {loading ? <Spinner /> : ""}
         {body && body.length === 0 && <NoResults />}
         {body}
      </div>
   );
};

export default Cards;
