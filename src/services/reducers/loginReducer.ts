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
import {
    IPostLoginAction,
    IPostLoginFailedAction,
    IPostLoginSuccessAction,
    IPostLogoutAction,
    TLoginActions,
    TLogoutActions
} from "../actions/loginActions";

const initialState: ILoginState = {
    loginRequest: false,
    loginFailed: false,
    loginInfo: EMPTY_AUTHORIZATION_INFO,
    loginMessage: EMPTY_SERVER_INFO
}

function isPostLoginAction(action: TLoginActions | TLogoutActions): action is IPostLoginAction {
    return action.type === POST_LOGIN;
}

function isPostLoginSuccessAction(action: TLoginActions | TLogoutActions): action is IPostLoginSuccessAction {
    return action.type === POST_LOGIN_SUCCESS;
}

function isPostLoginFailedAction(action: TLoginActions | TLogoutActions): action is IPostLoginFailedAction {
    return action.type === POST_LOGIN_FAILED;
}

function isPostLogoutAction(action: TLoginActions | TLogoutActions): action is IPostLogoutAction {
    return action.type === POST_LOGOUT;
}

const loginReducer: Reducer<ILoginState, {
    type: string;
    loginInfo?: any;
    loginMessage?: any
}> = (state: ILoginState = initialState, action: TLoginActions | TLogoutActions): ILoginState => {
    switch (action.type) {
        case POST_LOGIN: {
            if (!isPostLoginAction(action)) {
                throw new Error("Invalid action type");
            }
            return {
                ...state,
                loginRequest: true,
                loginFailed: false,
            };
        }
        case POST_LOGIN_SUCCESS: {
            if (!isPostLoginSuccessAction(action)) {
                throw new Error("Invalid action type");
            }
            return {
                ...state,
                loginInfo: action.loginInfo,
                loginMessage: action.loginMessage,
                loginRequest: false,
                loginFailed: false
            };
        }
        case POST_LOGIN_FAILED: {
            if (!isPostLoginFailedAction(action)) {
                throw new Error("Invalid action type");
            }
            return {
                ...state,
                loginInfo: action.loginInfo,
                loginMessage: action.loginMessage,
                loginFailed: true,
                loginRequest: false
            };
        }
        case POST_LOGOUT: {
            if (!isPostLogoutAction(action)) {
                throw new Error("Invalid action type");
            }
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