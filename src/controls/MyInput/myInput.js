import "./myinput.css";

const MyInput = (props) => {
  const {
    placeholder,
    name,
    value,
    type,
    onChange,
    isRequired,
    toShowBorder = true,
  } = props;
  return (
    <input
      className={`text-properties ${toShowBorder ? "border-style" : ""}`}
      name={name}
      onChange={onChange}
      value={value}
      type={type}
      placeholder={placeholder}
      {...(isRequired ? { required: true } : {})}
    ></input>
  );
};

export default MyInput;
