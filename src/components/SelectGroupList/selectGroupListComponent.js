import Constants from "../../constants/constants";
import useFetchData from "../../hooks/useFetchData";

const SelectGroupList = ({ onSelectGroup }) => {
  const { data: groups, loading } = useFetchData(Constants.GET_ALL_GROUPS);

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
