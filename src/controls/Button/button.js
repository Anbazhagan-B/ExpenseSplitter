import "./button.css";

const Button = (props) => {
  const { buttonText, OnClickHandle, customclass, type } = props;

  return (
    <button
      type={type}
      className={"text-properties " + customclass ? customclass : ""}
      onClick={OnClickHandle}
    >
      {buttonText}
    </button>
  );
};

export default Button;
