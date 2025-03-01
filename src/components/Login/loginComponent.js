import logo from "../../stock-vector-coin.jpg";
import MyInput from "../../controls/MyInput/myInput";
import Button from "../../controls/Button/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/apiSlice.js";

const LoginComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { user } = useSelector((state) => state.api);
  const onInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser(loginData));
    } catch (err) {
      alert("error" + JSON.stringify(err));
    }
  };

  useEffect(() => {
    if (user?.id > 0) {
      navigate("/home");
    }
  }, [user, navigate]);

  const onRegisterClick = () => {
    navigate("./register");
  };

  return (
    <div className="container">
      <div className="img-div">
        <img src={logo}></img>
      </div>
      <div className="form-div">
        <MyInput
          placeholder="Email"
          type={"email"}
          name={"email"}
          value={loginData.email}
          onChange={onInputChange}
        />
        <MyInput
          placeholder="Password"
          type={"password"}
          name={"password"}
          value={loginData.password}
          onChange={onInputChange}
        />
        <Button buttonText="Sign-in" OnClickHandle={onLogin} />
        <Button buttonText="Register" OnClickHandle={onRegisterClick} />
      </div>
    </div>
  );
};

export default LoginComponent;
