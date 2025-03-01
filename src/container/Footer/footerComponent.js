import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaUsers, FaPlusCircle } from "react-icons/fa";
import "./footerComponent.css";

const FooterComponent = (props) => {
  return (
    <div className="footer">
      <Link to="/home" className="icon">
        <FaHome size={30} color="black" />
      </Link>

      <Link to="/individual-expense" className="icon">
        <FaUser size={30} color="black" />
      </Link>

      <Link to="/group-list" className="icon">
        <FaUsers size={30} color="black" />
      </Link>

      <Link to="/add-expense" className="icon add-expense">
        <FaPlusCircle size={40} color="black" />
      </Link>
    </div>
  );
};

export default FooterComponent;
