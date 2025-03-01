import ExpenseList from "../ExpenseList/expenseList";
import FooterComponent from "../../container/Footer/footerComponent.js";
import { useNavigate } from "react-router-dom";
import "./individual-expense.css";
import Button from "../../controls/Button/button.js";
import { useSelector } from "react-redux";

const IndividualExpense = (props) => {
  const { user } = useSelector((state) => state.api);
  const navigate = useNavigate();
  const addExpenseClick = () => {
    navigate("./add-expense");
  };
  return (
    <div className="individual-expense">
      <ExpenseList userId={user.id} />
      <Button buttonText="Add Expense" OnClickHandle={addExpenseClick}></Button>
      <FooterComponent />
    </div>
  );
};

export default IndividualExpense;
