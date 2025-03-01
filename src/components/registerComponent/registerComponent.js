import logo from "../../stock-vector-coin.jpg";
import MyInput from "../../controls/MyInput/myInput";
import Button from "../../controls/Button/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import API_HEADERS from "../../Constants/headers.js";
import Constants from "../../Constants/constants.js";
import useApi from "../../hooks/useApi.js";
import Loading from "../../controls/Loading/Loading.js";

const RegisterComponent = (props) => {
  const navigate = useNavigate();
  const [showMyLoader, setShowMyLoader] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: 0,
  });

  const onInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onRegisterUser = async (e) => {
    e.preventDefault();
    try {
      // const { showLoader } = useApi(userData, Constants.REGISTER_USER_API_URL);
      // setShowMyLoader(showLoader);
      // const response = await axios.post(
      //   Constants.REGISTER_USER_API_URL,
      //   userData,
      //   {
      //     headers: API_HEADERS,
      //   }
      // );
      // navigate("./home");
      // console.log("Success" + JSON.stringify(response));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      {showMyLoader && <Loading />}
      <div className="img-div">
        <img src={logo}></img>
      </div>
      <div className="form-div">
        <MyInput
          placeholder="Full Name"
          type={"text"}
          name={"username"}
          value={userData.username}
          onChange={onInputChange}
        />
        <MyInput
          placeholder="Email"
          type={"email"}
          name={"email"}
          value={userData.email}
          onChange={onInputChange}
        />
        <MyInput
          placeholder="Password"
          type={"password"}
          name={"password"}
          value={userData.password}
          onChange={onInputChange}
        />
        <MyInput
          placeholder="Phone number"
          type={"number"}
          name={"phoneNumber"}
          value={userData.phoneNumber}
          onChange={onInputChange}
        />
        <Button buttonText="Register" OnClickHandle={onRegisterUser} />
      </div>
    </div>
  );
};

export default RegisterComponent;
