import logo from "../../stock-vector-coin.jpg";
import MyInput from "../../controls/MyInput/myInput";
import Button from "../../controls/Button/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../controls/Loading/Loading.js";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiSlice.js";

const RegisterComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.api);
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
    dispatch(registerUser(userData));
    try {
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user?.id > 0) {
      navigate("/");
    }
  }, [user, navigate]);

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
