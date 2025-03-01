import AddGroupComponent from "../../components/AddGroup/addGroupComponent";
import useHeaderTitle from "../../hooks/useHeaderTitle";
import FooterComponent from "../Footer/footerComponent";

const AddGroupContainer = () => {
  useHeaderTitle("Create Group");
  return (
    <div className="add-group-container">
      <AddGroupComponent />
    </div>
  );
};

export default AddGroupContainer;
