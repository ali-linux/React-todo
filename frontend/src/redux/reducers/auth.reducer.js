import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "../constants/auth.constants";

const registerState = {
  loading: true,
};

// eslint-disable-next-line import/no-anonymous-default-export
export const registerReducer = (state = registerState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        loading: false,
      };
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        loading: false,
      };
    default:
      return state;
  }
};
const clientInfo = JSON.parse(localStorage.getItem("clientInfo"));
const loginState = clientInfo
  ? {
      token: clientInfo.token,
      isAuthenticated: true,
      loading: false,
      userInfo: clientInfo.userInfo,
    }
  : {
      token: null,
      isAuthenticated: false,
      loading: true,
      userInfo: null,
    };

export const loginReducer = (state = loginState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("clientInfo", JSON.stringify(action.payload));
      console.log(action.payload);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        userInfo: action.payload.userInfo,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
