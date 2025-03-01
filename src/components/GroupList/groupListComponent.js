import React, { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import "./groupListComponent.css";

const GroupListComponent = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(
          "http://localhost:8024/groups/getAllGroups"
        );
        const data = await response.json();
        setGroups(data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className="group-list-container">
      <h2>My Groups</h2>

      {loading ? (
        <p>Loading groups...</p>
      ) : (
        <ul className="group-list">
          {groups.map((group) => (
            <li key={group.id} className="group-item">
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
