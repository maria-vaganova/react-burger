import {Reducer} from "redux";
import {IRegisterState} from "../../utils/types";
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
    registerRequest: false,
    registerFailed: false,
    registerInfo: EMPTY_AUTHORIZATION_INFO,
    registerMessage: EMPTY_SERVER_INFO
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
    registerInfo?: any;
    registerMessage?: any
}> = (state: IRegisterState = initialState, action: TRegisterActions): IRegisterState => {
    switch (action.type) {
        case POST_REGISTER: {
            if (!isPostRegisterAction(action)) {
                throw new Error("Invalid action type");
            }
            return {
                ...state,
                registerRequest: true,
                registerFailed: false,
            };
        }
        case POST_REGISTER_SUCCESS: {
            if (!isPostRegisterSuccessAction(action)) {
                throw new Error("Invalid action type");
            }
            return {
                ...state,
                registerInfo: action.registerInfo,
                registerMessage: action.registerMessage,
                registerRequest: false,
                registerFailed: false
            };
        }
        case POST_REGISTER_FAILED: {
            if (!isPostRegisterFailedAction(action)) {
                throw new Error("Invalid action type");
            }
            return {
                ...state,
                registerInfo: action.registerInfo,
                registerMessage: action.registerMessage,
                registerFailed: true,
                registerRequest: false
            };
        }
        default: {
            return state;
        }
    }
};

export default registerReducer;