import GroupListComponent from "../../components/GroupList/groupListComponent";
import useHeaderTitle from "../../hooks/useHeaderTitle";
import FooterComponent from "../Footer/footerComponent";

const GroupListContainer = () => {
  useHeaderTitle("Group Splits");
  return (
    <div>
      <GroupListComponent />
    </div>
  );
};

export default GroupListContainer;
