import {
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,


  SEND_INTERVIEW_LINK_SUCCESS,
  SEND_INTERVIEW_LINK_FAIL
} from "../constants/actionTypes";

import {
  changePasswordAPI,
  updateUserProfileAPI,
  createUserInterviewAPI,
  } from "../api/index.js";

export const changePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      const result = await changePasswordAPI(oldPassword, newPassword);
      dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: result.message });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Something went wrong. Please try again.";
      dispatch({ type: CHANGE_PASSWORD_FAILURE, payload: message });
    }
  };

export const updateUserProfile = (userData) => async (dispatch) => {
  try {
    const response = await updateUserProfileAPI(userData);

    dispatch({
      type: UPDATE_USER_PROFILE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_PROFILE_FAILURE,
      payload: error.response.data.message,
    });
  }
};

// export const createUserInterview = (name, email) => async (dispatch) => {
//   try {
//     dispatch({ type: USER_CREATE_REQUEST });
//     const {result} = await createUserInterviewAPI(name, email);

//     dispatch({
//       type: USER_CREATE_SUCCESS,
//       payload: result.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: USER_CREATE_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };



export const sendInterviewLink = (name, email) => async (dispatch) => {

  try {
    const data = await createUserInterviewAPI(name, email)
    dispatch({
      type: SEND_INTERVIEW_LINK_SUCCESS,
      payload: res.data.message
    })}
       catch (error) 
       {
      dispatch({
        type: SEND_INTERVIEW_LINK_FAIL,
        // payload: error.response.data.message
        });
     }
    
  };
