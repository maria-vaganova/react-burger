import {Reducer} from "redux";
import {ILoginState} from "../../utils/types";
import {
    EMPTY_AUTHORIZATION_INFO,
    POST_LOGIN_FAILED,
    POST_LOGIN_SUCCESS,
    POST_LOGIN,
    POST_LOGOUT,
    EMPTY_SERVER_INFO
} from "../../utils/data";

const initialState: ILoginState = {
    loginRequest: false,
    loginFailed: false,
    loginInfo: EMPTY_AUTHORIZATION_INFO,
    loginMessage: EMPTY_SERVER_INFO
}

const loginReducer: Reducer<ILoginState, {
    type: string;
    loginInfo?: any;
    loginMessage?: any
}> = (state = initialState, action) => {
    switch (action.type) {
        case POST_LOGIN: {
            return {
                ...state,
                loginRequest: true,
                loginFailed: false,
            };
        }
        case POST_LOGIN_SUCCESS: {
            return {
                ...state,
                loginInfo: action.loginInfo,
                loginMessage: action.loginMessage,
                loginRequest: false,
                loginFailed: false
            };
        }
        case POST_LOGIN_FAILED: {
            return {
                ...state,
                loginInfo: action.loginInfo,
                loginMessage: action.loginMessage,
                loginFailed: true,
                loginRequest: false
            };
        }
        case POST_LOGOUT: {
            return {
                ...state,
                loginInfo: EMPTY_AUTHORIZATION_INFO,
                loginMessage: action.loginMessage,
                loginFailed: false,
                loginRequest: false
            };
        }
        default: {
            return state;
        }
    }
};

export default loginReducer;