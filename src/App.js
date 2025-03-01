import "./App.css";
import Loading from "./controls/Loading/Loading";
import store from "./redux/store";
import { Provider, useSelector } from "react-redux";
import RouterComponent from "./routerComponent";
import LoginComponent from "./components/Login/loginComponent";
import RegisterComponent from "./components/registerComponent/registerComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeContainer from "./container/home/homeContainer";
import IndividualExpense from "./components/IndividualExpense/individual-expense";
import AddExpenseContainer from "./container/AddExpense/add-expense-container";
import AddGroupContainer from "./container/AddGroup/add-group-container";
import GroupListContainer from "./container/GroupList/groupListContainer";

function App() {
  return (
    <div className="main">
      <Provider store={store}>
        <GlobalLoader />
        <Router>
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
            <Route path="/home" element={<HomeContainer />} />
            <Route path="/individual-expense" element={<IndividualExpense />} />
            <Route path="/add-expense" element={<AddExpenseContainer />} />
            <Route path="/add-group" element={<AddGroupContainer />} />
            <Route path="/group-list" element={<GroupListContainer />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

const GlobalLoader = () => {
  const showLoader = useSelector((state) => state.api.showLoader);
  return showLoader ? <Loading /> : null;
};

export default App;
