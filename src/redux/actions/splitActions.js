export const SET_SPLIT_TYPE = "SET_SPLIT_TYPE";
export const SET_TOTAL_AMOUNT = "SET_TOTAL_AMOUNT";
export const SET_SELECTED_USER = "SET_SELECTED_USER";
export const SET_USER_SPLITS = "SET_USER_SPLITS";

export const setSplitType = (splitType) => ({
  type: SET_SPLIT_TYPE,
  payload: splitType,
});
export const setTotalAmount = (amount) => ({
  type: SET_TOTAL_AMOUNT,
  payload: amount,
});
export const setSelectedUser = (userId) => ({
  type: SET_SELECTED_USER,
  payload: userId,
});
export const setUserSplits = (splits) => ({
  type: SET_USER_SPLITS,
  payload: splits,
});
