import {Reducer} from "redux";
import {AuthorizationInfo, DeniedInfo, LoginState} from "../../utils/types";
import {
    EMPTY_AUTHORIZATION_INFO,
    POST_LOGIN_FAILED,
    POST_LOGIN_SUCCESS,
    POST_LOGIN
} from "../../utils/data";

const initialState: LoginState = {
    loginRequest: false,
    loginFailed: false,
    loginInfo: EMPTY_AUTHORIZATION_INFO
}

const loginReducer: Reducer<LoginState, { type: string; loginInfo?: any }> = (state = initialState, action) => {
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
                loginInfo: action.loginInfo as AuthorizationInfo,
                loginRequest: false,
                loginFailed: false
            };
        }
        case POST_LOGIN_FAILED: {
            return {
                ...state,
                loginInfo: action.loginInfo as DeniedInfo,
                loginFailed: true,
                loginRequest: false
            };
        }
        default: {
            return state;
        }
    }
};

export default loginReducer;