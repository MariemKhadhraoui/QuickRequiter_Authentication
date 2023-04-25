import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';
import { forgotPassword as forgotPasswordApi } from '../api';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
    if (data.result.email === "gharbi.wided@esprit.tn") {
      router.push('/dash', { state: data.result.email });
    }
    else if (data.result.email !== "gharbi.wided@esprit.tn") {
      router.push('/twoFactor', { state: data.result.email });
    }
  } catch (error) {
    dispatch({ type: "ERROR", data: error.response.data.message });
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

  } catch (error) {
    dispatch({ type: "ERROR", data: error.response.data.message });
  }
};


export const forgotPassword = (email) => async (dispatch) => {
  try {
    const { data } = await forgotPasswordApi(email);
    dispatch({ type: 'FORGOT_PASSWORD', data });
  } catch (error) {
    console.log(error);
  }
};

export const signinWithGoogle = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signInWithGoogle(formData);
    dispatch({ type: AUTH, data });
    router.push('/');
  } catch (error) {
    console.log(error);
  }
};
