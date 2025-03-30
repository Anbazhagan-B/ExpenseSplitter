import React, { useState, useEffect, useMemo } from "react";
import "./expenseList.css";
import ExpenseItem from "../ExpenseItem/expenseitem";
import useFetchData from "../../hooks/useFetchData";
const ExpenseList = (props) => {
  const { id } = props;

  const getExpenseFetechUrl = (fetchType) => {
    if (fetchType == "GROUP") {
      return `http://localhost:8024/expenses/groupExpenses/${id}`;
    } else {
      return `http://localhost:8024/expenses/userExpenses/${id}`;
    }
  };

  const url = getExpenseFetechUrl(props.fetchType);

  const { data: expenses, loading, error } = useFetchData(url, [id]);

  const groupedExpenses = useMemo(() => {
    return expenses.reduce((acc, expense) => {
      const createdDate = expense.createdAt.split(".")[0];
      const monthYear = new Date(createdDate).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
      });

      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      expense.data = createdDate;
      acc[monthYear].push(expense);
      return acc;
    }, {});
  }, [expenses]);

  if (loading) return <p>Loading expenses...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="expense-list">
      {groupedExpenses == null ||
      groupedExpenses == undefined ||
      Object.keys(groupedExpenses).length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        Object.keys(groupedExpenses).map((month) => (
          <div key={month}>
            <h2 className="black-text-color">{month}</h2>
            {groupedExpenses[month].map((expense, index) => (
              <ExpenseItem key={expense.id || index} {...expense} />
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default ExpenseList;
