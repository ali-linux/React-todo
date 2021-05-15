import axios from "axios";
import { setAlert } from "../actions/alert.action";
import { REGISTER_FAIL, REGISTER_SUCCESS } from "../constants/auth.constants";

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, email, password });
    try {
      const res = await axios.post("api/auth/register", body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors)
        errors.forEach((err) => {
          dispatch(setAlert(err.msg, "danger"));
        });
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
