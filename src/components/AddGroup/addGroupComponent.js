import { useState, useEffect } from "react";
import Constants from "../../Constants/constants";
import { useNavigate } from "react-router-dom";
import MyInput from "../../controls/MyInput/myInput";
import "./addGroupComponent.css";
import Button from "../../controls/Button/button";

const AddGroupComponent = () => {
  const [groupName, setGroupName] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(Constants.GET_USERS_WITH_ID);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
        alert("Group Added Successfully!");
        navigate("/group-list");
      } else {
        alert("Error: " + result);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add group");
    }
  };

  return (
    <div className="group-container">
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

          <div className="members-list">
            <h3>Select Members:</h3>
            {users.map((user) => (
              <div className="member-item">
                <input
                  type="checkbox"
                  value={user.id}
                  onChange={() => handleCheckboxChange(user.id)}
                />
                <label key={user.id}>{user.username}</label>
              </div>
            ))}
          </div>

          <Button type="submit" buttonText="Add Group" />
        </form>
      )}
    </div>
  );
};

export default AddGroupComponent;
