import AddExpense from "../../components/AddExpense/add-expense";
import FooterComponent from "../Footer/footerComponent";

const AddExpenseContainer = (props) => {
  return (
    <div className="add-expense-container">
      <AddExpense />
      <FooterComponent></FooterComponent>
    </div>
  );
};

export default AddExpenseContainer;
