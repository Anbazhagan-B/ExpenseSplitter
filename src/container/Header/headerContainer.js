import React from "react";
import { useSelector } from "react-redux";
import "./headerContainer.css";

const HeaderContainer = () => {
  const headerTitle = useSelector((state) => state.api.headerTitle);

  return (
    <div className="header">
      <h1>{headerTitle}</h1>
    </div>
  );
};

export default HeaderContainer;
