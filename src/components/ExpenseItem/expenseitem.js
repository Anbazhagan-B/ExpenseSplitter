import React from "react";
import "./expenseitem.css";

const ExpenseItem = ({ date, description, amount, user, createdAt }) => {
  const createdDate = createdAt.split(".")[0];
  const month = new Date(createdDate).toLocaleString("en-US", {
    month: "short",
  });
  const day = new Date(createdDate).getDate();

  return (
    <div className="expense-item">
      <div className="date-box">
        <div className="month white-text-color">{month.toUpperCase()}</div>
        <div className="day white-text-color">{day}</div>
      </div>
      <img src={user} alt="User" className="user-img" />
      <div className="category black-text-color">{description}</div>
      <div className="amount black-text-color">${amount.toFixed(2)}</div>
    </div>
  );
};

export default ExpenseItem;
