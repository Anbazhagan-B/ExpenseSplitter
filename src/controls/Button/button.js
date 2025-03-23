import "./button.css";

const Button = (props) => {
  const { buttonText, OnClickHandle, customclass, type } = props;

  return (
    <button
      type={type}
      className={`custom-button text-properties ${customclass || ""}`}
      onClick={OnClickHandle}
    >
      {buttonText}
    </button>
  );
};

export default Button;
