import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHeaderTitle } from "../redux/apiSlice";

const useHeaderTitle = (title) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderTitle(title));
  }, [dispatch, title]);
};

export default useHeaderTitle;
