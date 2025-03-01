import LoginComponent from "./components/Login/loginComponent";
import RegisterComponent from "./components/registerComponent/registerComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeContainer from "./container/home/homeContainer";
import IndividualExpense from "./components/IndividualExpense/individual-expense";
import AddExpense from "./components/AddExpense/add-expense";
const RouterComponent = () => {
  <Router>
    <Routes>
      <Route path="/" element={<LoginComponent />} />
      <Route path="/register" element={<RegisterComponent />} />
      <Route path="/home" element={<HomeContainer />} />
      <Route path="/individual-expense" element={<IndividualExpense />} />
      <Route path="/add-expense" element={<AddExpense />} />
    </Routes>
  </Router>;
};

export default RouterComponent;
