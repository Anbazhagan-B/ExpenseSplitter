import React, { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import "./groupListComponent.css";
import useFetchData from "../../hooks/useFetchData";
import Constants from "../../constants/constants";
import { useNavigate } from "react-router-dom";

const GroupListComponent = () => {
  const { data: groups, loading } = useFetchData(Constants.GET_ALL_GROUPS);
  const navigate = useNavigate();
  const handleGroupClick = (groupId) => {
    navigate(`/group-expenses/${groupId}`);
  };

  return (
    <div className="group-list-container">
      {loading ? (
        <p>Loading groups...</p>
      ) : (
        <ul className="group-list">
          {groups.map((group) => (
            <li
              key={group.id}
              className="group-item"
              onClick={() => handleGroupClick(group.id)}
            >
              <div className="group-icon">
                {group.groupName.charAt(0).toUpperCase()}
              </div>
              <div className="group-title">{group.groupName}</div>
              <FaUsers className="group-users-icon" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GroupListComponent;
