import React, { useState, useEffect } from "react";
import "./custom-alert.css";

const CustomAlert = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 30000000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className="custom-alert">
      <h1>{message}</h1>
      <button onClick={onClose}>OK</button>
    </div>
  );
};

export default CustomAlert;
