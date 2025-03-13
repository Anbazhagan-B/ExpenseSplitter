import { useState } from "react";
import CustomAlert from "./CustomAlert";

const useCustomAlert = () => {
  const [alertMessage, setAlertMessage] = useState(null);

  const showAlert = (message) => {
    setAlertMessage(message);
  };

  const closeAlert = () => {
    setAlertMessage(null);
  };

  return {
    showAlert,
    alertComponent: alertMessage ? (
      <CustomAlert message={alertMessage} onClose={closeAlert} />
    ) : null,
  };
};

export default useCustomAlert;
