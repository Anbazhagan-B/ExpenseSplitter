import React, { useState, useEffect, useMemo } from "react";
import "./expenseList.css";
import ExpenseItem from "../ExpenseItem/expenseitem";
const ExpenseList = (props) => {
  const { userId } = props;
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(
          `http://localhost:8024/expenses/user/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch expenses");
        }
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      fetchExpenses();
    }
  }, [userId]);

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
