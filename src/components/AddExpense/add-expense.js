import React, { useState } from "react";
import { FaUsers, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MyInput from "../../controls/MyInput/myInput";
import Button from "../../controls/Button/button";
import Constants from "../../constants/constants";
import useCustomAlert from "../../controls/CustomAlert/useCustomAlert";
import UserList from "../UserList/userListComponent";
import SelectGroupList from "../SelectGroupList/selectGroupListComponent";

import {
  setSplitType,
  setTotalAmount,
  setUserSplits,
  setSelectedUser,
} from "../../redux/actions/splitActions";

import "./add-expense.css";

const AddExpense = () => {
  const dispatch = useDispatch();
  const { showAlert, alertComponent } = useCustomAlert();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.api);
  const { splitType, totalAmount, selectedUserId, userSplits } = useSelector(
    (state) => state.split
  );

  const [expenseType, setExpenseType] = useState("INDIVIDUAL");
  //const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState({});
  const [description, setDescription] = useState("");

  const handleAmountChange = (e) => {
    const value = e.target.value;
    dispatch(setTotalAmount(value));
    dispatch(setUserSplits({}));
  };

  const handleSplitTypeChange = (type) => {
    dispatch(setSplitType(type));
    dispatch(setUserSplits({}));
    assignAmountBasedOnSplitType(0, 0);
  };

  const handleUserSelectionChange = (selected) => {
    dispatch(setSelectedUser(selected));
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
            amount: parseFloat(totalAmount),
            paidById: user.id,
            participantIds: [user.id, selectedUserId],
            expenseType: "INDIVIDUAL",
            splitType: splitType.toUpperCase(),
            participants: buildParticipants(),
          }
        : {
            description,
            amount: parseFloat(totalAmount),
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
        showAlert(result);
        navigate("/home");
      } else {
        showAlert("Error: " + result);
      }
    } catch (error) {
      console.error("Error:", error);
      showAlert("Failed to add expense");
    }
  };

  const buildParticipants = () => {
    const participants = [user.id, selectedUserId];
    return participants.map((id) => {
      const paidShare = id === user.id ? parseFloat(totalAmount) : 0;
      const value = userSplits[id] || 0;

      if (splitType === "Percentage") {
        return {
          participantId: id,
          paidShare,
          percentageShare: parseFloat(value),
        };
      } else {
        return {
          participantId: id,
          paidShare,
          owedShare: parseFloat(value),
        };
      }
    });
  };

  const assignAmountBasedOnSplitType = (selectedId, value) => {
    if (!selectedId) return;
    let splits = { [user.id]: 0 };

    switch (splitType) {
      case "Equal":
        splits[user.id] = (totalAmount / 2).toFixed(2);
        splits[selectedId] = (totalAmount / 2).toFixed(2);
        break;
      case "Percentage":
        const percent = parseFloat(value) || 0;
        splits[user.id] = 100 - percent;
        splits[selectedId] = percent;
        break;
      case "Amount":
        const amt = parseFloat(value) || 0;
        if (amt <= totalAmount) {
          splits[user.id] = (totalAmount - amt).toFixed(2);
          splits[selectedId] = amt.toFixed(2);
        }
        break;
      default:
        break;
    }
    dispatch(setUserSplits(splits));
  };

  return (
    <div className="add-expense-component">
      {alertComponent}
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="input-group">
          <FaUsers className="icon" />
          <select
            className="custom-select"
            value={expenseType}
            onChange={(e) => {
              setExpenseType(e.target.value);
              dispatch(setSelectedUser(null));
              setSelectedGroup({});
              dispatch(setUserSplits({}));
            }}
          >
            <option value="INDIVIDUAL">Individual Expense</option>
            <option value="GROUP">Group Expense</option>
          </select>
        </div>

        <div className="input-group">
          <FaMoneyBillWave className="icon" />
          <MyInput
            type="number"
            placeholder="Enter Amount"
            value={totalAmount}
            onChange={handleAmountChange}
            isRequired={true}
            toShowBorder={false}
          />
        </div>

        <div className="input-group expense-type-space-arounnd">
          <div className="black-text-color bold-font-weight">
            {splitType ? `Split by ${splitType}` : "Expense Type"}
          </div>
          <div className="split-type-options">
            {["Equal", "Percentage", "Amount"].map((type) => (
              <button
                key={type}
                type="button"
                className={`split-option-buttons ${
                  splitType === type ? "selected" : ""
                }`}
                onClick={() => handleSplitTypeChange(type)}
              >
                Split by {type}
              </button>
            ))}
          </div>
        </div>

        {expenseType === "GROUP" ? (
          <div className="input-group">
            <SelectGroupList onSelectGroup={handleGroupSelectionChange} />
          </div>
        ) : (
          <UserList
            onSelectUser={handleUserSelectionChange}
            onSelectedUserAmountChange={assignAmountBasedOnSplitType}
          />
        )}

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
