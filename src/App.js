import "./App.css";
import Loading from "./controls/Loading/Loading";
import store from "./redux/store";
import { Provider, useSelector } from "react-redux";
import LoginComponent from "./components/Login/loginComponent";
import RegisterComponent from "./components/RegisterComponent/registerComponent";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import IndividualExpense from "./container/IndividualExpense/individual-expense";
import AddExpenseContainer from "./container/AddExpense/add-expense-container";
import AddGroupContainer from "./container/AddGroup/add-group-container";
import GroupListContainer from "./container/GroupList/groupListContainer";
import HeaderContainer from "./container/Header/headerContainer";
import FooterComponent from "./container/Footer/footerComponent";
import HomeContainer from "./container/Home/homeContainer";

function App() {
  return (
    <div className="main">
      <Provider store={store}>
        <GlobalLoader />
        <Router>
          <DynamicHeader />
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
            <Route path="/home" element={<HomeContainer />} />
            <Route path="/individual-expense" element={<IndividualExpense />} />
            <Route path="/add-expense" element={<AddExpenseContainer />} />
            <Route path="/add-group" element={<AddGroupContainer />} />
            <Route path="/group-list" element={<GroupListContainer />} />
          </Routes>
          <DynamicFooter />
        </Router>
      </Provider>
    </div>
  );
}

const GlobalLoader = () => {
  const showLoader = useSelector((state) => state.api.showLoader);
  return showLoader ? <Loading /> : null;
};

const DynamicHeader = () => {
  const location = useLocation();
  if (location.pathname === "/" || location.pathname === "/register") {
    return null;
  }
  return <HeaderContainer />;
};

const DynamicFooter = () => {
  const location = useLocation();
  if (location.pathname === "/" || location.pathname === "/register") {
    return null;
  }
  return <FooterComponent />;
};

export default App;
