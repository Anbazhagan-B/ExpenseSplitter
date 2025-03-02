import AddExpense from "../../components/AddExpense/add-expense";
import useHeaderTitle from "../../hooks/useHeaderTitle";
import FooterComponent from "../Footer/footerComponent";

const AddExpenseContainer = () => {
  useHeaderTitle("New Expense");
  return (
    <div className="add-expense-container">
      <AddExpense />
    </div>
  );
};

export default AddExpenseContainer;
