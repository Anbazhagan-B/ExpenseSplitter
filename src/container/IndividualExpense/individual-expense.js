import ExpenseList from "../../components/ExpenseList/expenseList.js";
import FooterComponent from "../Footer/footerComponent.js";
import { useNavigate } from "react-router-dom";
import "./individual-expense.css";
import { useSelector } from "react-redux";
import useHeaderTitle from "../../hooks/useHeaderTitle.js";

const IndividualExpense = (props) => {
  const { user } = useSelector((state) => state.api);
  const navigate = useNavigate();
  useHeaderTitle("My Expenses");
  return (
    <div className="individual-expense">
      <ExpenseList id={user.id} />
      <FooterComponent />
    </div>
  );
};

export default IndividualExpense;
