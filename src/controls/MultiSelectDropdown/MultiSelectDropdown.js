import React, { useState } from "react";
import "./MultiSelectDropdown.css";

export default function MultiSelectDropdown({ usersList }) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === usersList.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(usersList.map((user) => user.id));
    }
  };

  const filteredUsers = usersList.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selected = filteredUsers.filter((user) =>
    selectedUsers.includes(user.id)
  );
  const unselected = filteredUsers.filter(
    (user) => !selectedUsers.includes(user.id)
  );

  return (
    <div className="dropdown-container">
      <div
        className="dropdown-header"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <label>
          {selectedUsers.length > 0
            ? `${selectedUsers.length} Selected`
            : "Search for Users"}
        </label>
        <label>{isDropdownOpen ? "▲" : "▼"}</label>
      </div>

      {isDropdownOpen && (
        <div className="dropdown-list">
          <input
            type="text"
            placeholder="Search for Users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <div className="checkbox-item select-all">
            <label>Select All</label>
            <input
              type="checkbox"
              checked={selectedUsers.length === usersList.length}
              onChange={handleSelectAll}
            />
          </div>

          {selected.map((user) => (
            <div key={user.id} className="checkbox-item">
              <label>{user.username}</label>
              <input
                type="checkbox"
                checked={true}
                onChange={() => handleCheckboxChange(user.id)}
              />
            </div>
          ))}

          {unselected.map((user) => (
            <div key={user.id} className="checkbox-item">
              <label>{user.username}</label>
              <input
                type="checkbox"
                checked={false}
                onChange={() => handleCheckboxChange(user.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
