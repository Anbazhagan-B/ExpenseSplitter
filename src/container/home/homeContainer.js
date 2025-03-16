import FooterComponent from "../Footer/footerComponent";
import Button from "../../controls/Button/button";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getExpenses } from "../../redux/apiSlice";
import "./homeContainer.css";
import useHeaderTitle from "../../hooks/useHeaderTitle";
import GroupListComponent from "../../components/GroupList/groupListComponent";
import useCustomAlert from "../../controls/CustomAlert/useCustomAlert";

const HomeContainer = () => {
  const dispatch = useDispatch();
  const { showAlert, alertComponent } = useCustomAlert();
  const navigate = useNavigate();
  const { expenses, loading, error, user } = useSelector((state) => state.api);
  useHeaderTitle("Split'u Machi");
  useEffect(() => {
    if (user) {
      dispatch(getExpenses());
    }
  }, [user, dispatch]);
  return (
    <div>
      <div className="home-container">
        {alertComponent}
        <h2>Welcome {user?.username.toUpperCase()}</h2>
        {/* {loading && <p>Loading expenses...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {expenses &&
            expenses.map((expense) => (
              <li key={expense.id}>
                {expense.category}: ${expense.amount}
              </li>
            ))}
        </ul> */}
        <div className="button-section">
          <Button
            buttonText="Groups"
            customclass="home-button"
            OnClickHandle={() => navigate("/group-list")}
          ></Button>
          <Button
            buttonText="Add Group"
            customclass="home-button"
            OnClickHandle={() => navigate("/add-group")}
          ></Button>
        </div>
        <GroupListComponent />
      </div>
    </div>
  );
};

export default HomeContainer;
