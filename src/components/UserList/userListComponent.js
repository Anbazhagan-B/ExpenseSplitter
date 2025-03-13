import React, { useEffect, useState } from "react";
import Constants from "../../constants/constants";
import "./userListComponent.css";
import useFetchData from "../../hooks/useFetchData";

const UserList = ({ onSelectUser }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: users, loading } = useFetchData(Constants.GET_USERS_WITH_ID);

  const handleUserSelection = (userId) => {
    setSelectedUser(userId);
    onSelectUser(userId);
  };

  return (
    <div className="user-list-container">
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <ul className="user-list">
          {users.map((user) => (
            <li
              key={user.id}
              className={`user-item ${
                selectedUser === user.id ? "selected" : ""
              }`}
              onClick={() => handleUserSelection(user.id)}
            >
              <div
                className="user-icon"
                style={{ backgroundColor: getColor(user.username) }}
              >
                {user.username.charAt(0).toUpperCase()}
              </div>
              <span className="user-name">{user.username}</span>
              <input
                type="radio"
                name="selectedUser"
                checked={selectedUser === user.id}
                onChange={() => handleUserSelection(user.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const getColor = (name) => {
  const colors = [
    "#A5D6A7",
    "#90CAF9",
    "#F48FB1",
    "#FFAB91",
    "#CE93D8",
    "#FFCC80",
  ];
  return colors[name.charCodeAt(0) % colors.length];
};
export default UserList;
