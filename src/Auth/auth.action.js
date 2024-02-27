import axios from "axios";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS , LOGOUT } from "./auth.actiontype";
import { message } from "antd";
import { API_BASE_URL } from "../config/api";

export const loginUserAction = (loginData) => async (dispatch) => {
    console.log(loginData);
    dispatch({ type: LOGIN_REQUEST });
    try {
        const response = await axios.post(`${API_BASE_URL}/Admin/signin`, loginData);
        console.log(response.data.token);
        if (response.data.token) {
            localStorage.setItem("jwt", response.data.token);
            const a=localStorage.getItem("jwt");

            console.log(response.data.token);
        }

        console.log("login success", response.data);
        message.success("Welcome To Admin page")
        dispatch({ type: LOGIN_SUCCESS, payload: response.data.token });
        return true;

    } catch (error) {
        console.log("-----", error);
        message.error("Wrong password or email. please enter correct ca")
        dispatch({ type: LOGIN_FAILURE, payload: error });
        return false;
    }
};

export const registerUserAction = (registerData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    console.log(registerData);
    try {
        const data  = await axios.post(`${API_BASE_URL}/Admin`, registerData);
        console.log(data.jwt);
        if (data.token) {
            localStorage.setItem("jwt", data.token);
        }
        console.log("register", data);
        message.success("Welcome To Admin page")
        dispatch({ type: LOGIN_SUCCESS, payload: data.token });
    } catch (error) {
        console.log("-----", error);
        dispatch({ type: LOGIN_FAILURE, payload: error });
    }

};
export const logoutUserAction = () => (dispatch) => {
    localStorage.removeItem("jwt"); // Remove the JWT token from local storage
    dispatch({ type: LOGOUT });
  };
