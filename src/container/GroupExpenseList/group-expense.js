import ExpenseList from "../../components/ExpenseList/expenseList.js";
import FooterComponent from "../Footer/footerComponent.js";
import useHeaderTitle from "../../hooks/useHeaderTitle.js";
import { useParams } from "react-router-dom";

const GroupExpenseList = () => {
  const { groupId } = useParams();

  useHeaderTitle("My Expenses");
  return (
    <div className="individual-expense">
      <ExpenseList id={groupId} fetchType="GROUP" />
      <FooterComponent />
    </div>
  );
};

export default GroupExpenseList;
