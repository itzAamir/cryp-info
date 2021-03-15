import React from "react";
import TitleBar from "./TitleBar";
import Cards from "./Cards";
import FooterNav from "./FooterNav";

const Home = () => {
   return (
      <>
         <TitleBar />
         <div className="custom-container">
            <Cards key="cards" />
         </div>
         <FooterNav />
      </>
   );
};

export default Home;
