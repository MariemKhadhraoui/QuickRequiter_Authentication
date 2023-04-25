import {
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,


  SEND_INTERVIEW_LINK_SUCCESS,
  SEND_INTERVIEW_LINK_FAIL
 
} from '../constants/actionTypes';

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
  
  const initialState = {
    user: null,
    error: null,
  };

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_SUCCESS:
      return { ...state, error: null, message: action.payload };
    case CHANGE_PASSWORD_FAILURE:
      return { ...state, error: action.payload, message: "" };
      case UPDATE_USER_PROFILE_SUCCESS:
        return {
          ...state,
          user: action.payload,
          error: null,
        };
      case UPDATE_USER_PROFILE_FAILURE:
        return {
          ...state,
          error: action.payload,
        };

        case SEND_INTERVIEW_LINK_SUCCESS:
          return { successMessage: action.payload };
        case SEND_INTERVIEW_LINK_FAIL:
          return { errorMessage: action.payload };
        default:
        return state;
  }
};
