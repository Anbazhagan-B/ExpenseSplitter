import { useState, useEffect } from "react";
import Constants from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import MyInput from "../../controls/MyInput/myInput";
import "./addGroupComponent.css";
import Button from "../../controls/Button/button";
import useFetchData from "../../hooks/useFetchData";
import MultiSelectDropdown from "../../controls/MultiSelectDropdown/MultiSelectDropdown";
import useCustomAlert from "../../controls/CustomAlert/useCustomAlert";

const AddGroupComponent = () => {
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { data: users, loading } = useFetchData(Constants.GET_USERS_WITH_ID);
  const navigate = useNavigate();
  const { showAlert, alertComponent } = useCustomAlert();

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleAddGroup = async (event) => {
    event.preventDefault();

    const requestBody = {
      groupName,
      members: selectedUsers,
    };

    console.log("Sending Group Data:", requestBody);

    try {
      const response = await fetch(Constants.ADD_GROUP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const result = await response.text();
      console.log("API Response:", result);

      if (response.ok) {
        showAlert("Group Added Successfully!");
        navigate("/group-list");
      } else {
        showAlert("Error: " + result);
      }
    } catch (error) {
      console.error("Error:", error);
      showAlert("Failed to add group");
    }
  };

  return (
    <div className="group-container">
      {alertComponent}
      <h2>Add Group</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <form onSubmit={handleAddGroup} className="group-form">
          <div className="input-group">
            <MyInput
              type="text"
              placeholder="Enter Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              isRequired={true}
              toShowBorder={false}
            />
          </div>

          {/* <div className="members-list">
            <h3>Select Members:</h3>
            {users.map((user) => (
              <div className="member-item">
                <label key={user.id}>{user.username}</label>
                <input
                  type="checkbox"
                  value={user.id}
                  onChange={() => handleCheckboxChange(user.id)}
                />
              </div>
            ))}
          </div> */}

          <MultiSelectDropdown usersList={users} />

          <Button type="submit" buttonText="Add Group" />
        </form>
      )}
    </div>
  );
};

export default AddGroupComponent;
