import ExpenseList from "../../components/ExpenseList/expenseList.js";
import FooterComponent from "../Footer/footerComponent.js";
import "./individual-expense.css";
import { useSelector } from "react-redux";
import useHeaderTitle from "../../hooks/useHeaderTitle.js";

const IndividualExpense = (props) => {
  const { user } = useSelector((state) => state.api);
  useHeaderTitle("My Expenses");
  return (
    <div className="individual-expense">
      <ExpenseList id={user.id} />
      <FooterComponent />
    </div>
  );
};

export default IndividualExpense;
