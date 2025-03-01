import React, { useEffect, useState } from "react";
import Constants from "../../Constants/constants";

const UserList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
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

  return (
    <select onChange={(e) => onSelectUser(parseInt(e.target.value))}>
      {loading ? (
        <option>Loading...</option>
      ) : (
        users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))
      )}
    </select>
  );
};

export default UserList;
