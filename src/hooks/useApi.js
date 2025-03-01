import { useState, useEffect } from "react";

function useApi(url, method = "GET", bodyData = null) {
  const [responseData, setResponseData] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [errorResponse, setErrorResponse] = useState(null);

  useEffect(() => {
    let ignore = false;
    setShowLoader(true);
    setErrorResponse(null);

    const fetchData = async () => {
      try {
        const options = {
          method,
          headers: { "Content-Type": "application/json" },
          ...(bodyData && { body: JSON.stringify(bodyData) }),
        };

        const response = await fetch(url, options);
        const json = await response.json();

        if (!ignore) {
          setResponseData(json);
          setShowLoader(false);
        }
        console.log("Success:", json);
      } catch (error) {
        if (!ignore) {
          setErrorResponse(error.message);
          setShowLoader(false);
        }
        console.error("Error:", error);
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [url, method, bodyData]);

  return { responseData, showLoader, errorResponse };
}

export default useApi;
