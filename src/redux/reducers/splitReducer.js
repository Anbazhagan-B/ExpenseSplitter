import {
  SET_SPLIT_TYPE,
  SET_TOTAL_AMOUNT,
  SET_SELECTED_USER,
  SET_USER_SPLITS,
} from "../actions/splitActions";

const initialState = {
  splitType: "Equal",
  totalAmount: 0,
  selectedUserId: null,
  userSplits: {},
};

const splitReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPLIT_TYPE:
      return { ...state, splitType: action.payload, userSplits: {} };
    case SET_TOTAL_AMOUNT:
      return { ...state, totalAmount: action.payload };
    case SET_SELECTED_USER:
      return { ...state, selectedUserId: action.payload };
    case SET_USER_SPLITS:
      return { ...state, userSplits: action.payload };
    default:
      return state;
  }
};

export default splitReducer;
