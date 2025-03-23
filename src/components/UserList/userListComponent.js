import React from "react";
import { useSelector, useDispatch } from "react-redux";
import useFetchData from "../../hooks/useFetchData";
import Constants from "../../constants/constants";

import "./userListComponent.css";
import {
  setSelectedUser,
  setUserSplits,
} from "../../redux/actions/splitActions";

const UserList = ({ onSelectUser, onSelectedUserAmountChange }) => {
  const { user } = useSelector((state) => state.api);
  const { splitType, selectedUserId, userSplits } = useSelector(
    (state) => state.split
  );
  const dispatch = useDispatch();

  const { data: users, loading } = useFetchData(Constants.GET_USERS_WITH_ID);

  const handleUserSelection = (userId) => {
    dispatch(setSelectedUser(userId));
    onSelectUser(userId);
    dispatch(setUserSplits({}));
    onSelectedUserAmountChange(userId, 0);
  };

  const handleInputChange = (userId, value) => {
    onSelectedUserAmountChange(userId, value);
  };

  return (
    <div className="user-list-container">
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <ul className="user-list">
          <li className="user-item selected">
            <div className="user-icon">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <span className="user-name">{user.username} (You)</span>
            <span className="user-amount">{userSplits[user.id] || "0.00"}</span>
          </li>

          {users
            .filter((u) => u.id !== user.id)
            .map((otherUser) => (
              <li
                key={otherUser.id}
                className={`user-item ${
                  selectedUserId === otherUser.id ? "selected" : ""
                }`}
              >
                <div className="user-icon">
                  {otherUser.username.charAt(0).toUpperCase()}
                </div>
                <span className="user-name">{otherUser.username}</span>

                {splitType === "Percentage" || splitType === "Amount" ? (
                  <input
                    type="number"
                    className="split-input"
                    placeholder={splitType === "Percentage" ? "%" : "$"}
                    onChange={(e) =>
                      handleInputChange(otherUser.id, e.target.value)
                    }
                    disabled={selectedUserId !== otherUser.id}
                  />
                ) : (
                  <span className="user-amount">
                    {userSplits[otherUser.id] || "0.00"}
                  </span>
                )}

                <input
                  type="radio"
                  name="selectedUser"
                  checked={selectedUserId === otherUser.id}
                  onChange={() => handleUserSelection(otherUser.id)}
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
