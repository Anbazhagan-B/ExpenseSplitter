import React, { useEffect, useState } from "react";
import Constants from "../../Constants/constants";

const SelectGroupList = ({ onSelectGroup }) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(Constants.GET_ALL_GROUPS);
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
  const handleGroupSelection = (e) => {
    e.preventDefault();
    const selectedGroupId = parseInt(e.target.value);
    const selectedGroup = groups.find((group) => group.id === selectedGroupId);
    onSelectGroup(selectedGroup);
  };
  return (
    <select onChange={handleGroupSelection}>
      {loading ? (
        <option>Loading...</option>
      ) : (
        groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.groupName}
          </option>
        ))
      )}
    </select>
  );
};

export default SelectGroupList;
