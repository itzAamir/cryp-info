import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PersonIcon from "@material-ui/icons/Person";
import { NavLink } from "react-router-dom";

const FooterNav = () => {
   return (
      <div className="footer-div">
         <NavLink
            to="/alerts"
            activeStyle={{
               opacity: "0.5",
            }}
         >
            <NotificationsIcon style={{ height: "1.7rem" }} />
         </NavLink>
         <NavLink
            to="/"
            activeStyle={{
               opacity: "0.5",
            }}
            exact
         >
            <HomeIcon style={{ opacity: "1" }} />
         </NavLink>
         <NavLink
            to="/profile"
            activeStyle={{
               opacity: "0.5",
            }}
         >
            <PersonIcon />
         </NavLink>
      </div>
   );
};

export default FooterNav;
