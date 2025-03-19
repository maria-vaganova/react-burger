import {Reducer} from "redux";
import {IAuthorizationInfo, IRegisterState, IServerInfo} from "../../utils/types";
import {
    EMPTY_AUTHORIZATION_INFO,
    POST_REGISTER_FAILED,
    POST_REGISTER_SUCCESS,
    POST_REGISTER,
    EMPTY_SERVER_INFO
} from "../../utils/data";
import {
    IPostRegisterAction,
    IPostRegisterFailedAction,
    IPostRegisterSuccessAction,
    TRegisterActions
} from "../actions/registerActions";

const initialState: IRegisterState = {
    request: false,
    failed: false,
    registerInfo: EMPTY_AUTHORIZATION_INFO,
    message: EMPTY_SERVER_INFO
}

function isPostRegisterAction(action: TRegisterActions): action is IPostRegisterAction {
    return action.type === POST_REGISTER;
}

function isPostRegisterSuccessAction(action: TRegisterActions): action is IPostRegisterSuccessAction {
    return action.type === POST_REGISTER_SUCCESS;
}

function isPostRegisterFailedAction(action: TRegisterActions): action is IPostRegisterFailedAction {
    return action.type === POST_REGISTER_FAILED;
}

const registerReducer: Reducer<IRegisterState, {
    type: string;
    registerInfo?: IAuthorizationInfo;
    registerMessage?: IServerInfo;
}> = (state: IRegisterState = initialState, action: TRegisterActions): IRegisterState => {
    switch (action.type) {
        case POST_REGISTER: {
            if (!isPostRegisterAction(action)) {
                throw new Error("Invalid action type");
            }
            return {
                ...state,
                request: true,
                failed: false,
            };
        }
        case POST_REGISTER_SUCCESS: {
            if (!isPostRegisterSuccessAction(action)) {
                throw new Error("Invalid action type");
            }
            return {
                ...state,
                registerInfo: action.registerInfo,
                message: action.registerMessage,
                request: false,
                failed: false
            };
        }
        case POST_REGISTER_FAILED: {
            if (!isPostRegisterFailedAction(action)) {
                throw new Error("Invalid action type");
            }
            return {
                ...state,
                registerInfo: action.registerInfo,
                message: action.registerMessage,
                failed: true,
                request: false
            };
        }
        default: {
            return state;
        }
    }
};

export default registerReducer;