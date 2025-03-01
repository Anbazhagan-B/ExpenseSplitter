import React, { useEffect, useState } from "react";
import { FaUsers, FaUser, FaMoneyBillWave } from "react-icons/fa";
import "./add-expense.css";
import { useNavigate } from "react-router-dom";
import MyInput from "../../controls/MyInput/myInput";
import Button from "../../controls/Button/button";
import Constants from "../../Constants/constants";
import { useSelector } from "react-redux";
import UserList from "../UserList/userListComponent";
import SelectGroupList from "../SelectGroupList/selectGroupListComponent";

const AddExpense = () => {
  const { user } = useSelector((state) => state.api);
  const [expenseType, setExpenseType] = useState("INDIVIDUAL"); // Default selection
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState({});
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const navigate = useNavigate();
  const handleExpenseTypeChange = (event) => {
    setExpenseType(event.target.value);
    setSelectedUser(null);
    setSelectedGroup({});
  };

  const handleUserSelectionChange = (selected) => {
    setSelectedUser(selected);
  };

  const handleGroupSelectionChange = (selected) => {
    setSelectedGroup(selected);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBody =
      expenseType === "INDIVIDUAL"
        ? {
            description,
            amount: parseFloat(amount),
            paidById: user.id,
            participantIds: [user.id, selectedUser],
            expenseType: "INDIVIDUAL",
          }
        : {
            description,
            amount: parseFloat(amount),
            paidById: user.id,
            participantIds: [user.id, ...selectedGroup.memberIds],
            expenseType: "GROUP",
            groupId: parseInt(selectedGroup.id),
          };

    try {
      const response = await fetch(Constants.ADD_EXPENSE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      const result = await response.text();
      if (response.ok) {
        alert(result);
        navigate("/home");
      } else {
        alert("Error: " + result);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add expense");
    }
  };

  return (
    <div className="add-expense-component">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="input-group">
          <FaUsers className="icon" />
          <select value={expenseType} onChange={handleExpenseTypeChange}>
            <option value="INDIVIDUAL">Individual Expense</option>
            <option value="GROUP">Group Expense</option>
          </select>
        </div>

        <div className="input-group">
          <FaUser className="icon" />
          {expenseType === "INDIVIDUAL" ? (
            <UserList onSelectUser={handleUserSelectionChange} />
          ) : (
            <SelectGroupList onSelectGroup={handleGroupSelectionChange} />
          )}
        </div>

        <div className="input-group">
          <FaMoneyBillWave className="icon" />
          <MyInput
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            isRequired={true}
            toShowBorder={false}
          />
        </div>
        <div className="input-group">
          <textarea
            placeholder="Write Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="submit-btn" buttonText="Add Expense" />
      </form>
    </div>
  );
};

export default AddExpense;
