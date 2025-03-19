import {Reducer} from "redux";
import {ICurrentUserInfo, IServerInfo, IUserState} from "../../utils/types";
import {
    EMPTY_SERVER_INFO,
    EMPTY_CURRENT_USER_INFO,
    GET_USER,
    SET_USER,
    SET_USER_SUCCESS,
    GET_USER_SUCCESS,
    SET_USER_FAILED,
    GET_USER_FAILED
} from "../../utils/data";
import {
    IGetUserAction,
    IGetUserFailedAction,
    IGetUserSuccessAction,
    ISetUserAction,
    ISetUserFailedAction,
    ISetUserSuccessAction,
    TGetUserActions,
    TSetUserActions
} from "../actions/userActions";

const initialState: IUserState = {
    request: false,
    failed: false,
    userInfo: EMPTY_CURRENT_USER_INFO,
    message: EMPTY_SERVER_INFO
}

function isUserAction(action: TGetUserActions | TSetUserActions): action is IGetUserAction | ISetUserAction {
    return action.type === SET_USER || action.type === GET_USER;
}

function isUserSuccessAction(action: TGetUserActions | TSetUserActions): action is IGetUserSuccessAction | ISetUserSuccessAction {
    return action.type === SET_USER_SUCCESS || action.type === GET_USER_SUCCESS;
}

function isUserFailedAction(action: TGetUserActions | TSetUserActions): action is IGetUserFailedAction | ISetUserFailedAction {
    return action.type === SET_USER_FAILED || action.type === GET_USER_FAILED;
}

const userReducer: Reducer<IUserState, {
    type: string;
    userInfo?: ICurrentUserInfo;
    userMessage?: IServerInfo;
}> = (state: IUserState = initialState, action: TGetUserActions | TSetUserActions): IUserState => {
    switch (action.type) {
        case SET_USER:
        case GET_USER: {
            if (!isUserAction(action)) {
                throw new Error("Invalid action type");
            }
            return {
                ...state,
                request: true,
                failed: false,
            };
        }
        case SET_USER_SUCCESS:
        case GET_USER_SUCCESS: {
            if (!isUserSuccessAction(action)) {
                throw new Error("Invalid action type");
            }
            return {
                ...state,
                userInfo: action.userInfo,
                message: action.userMessage,
                request: false,
                failed: false
            };
        }
        case SET_USER_FAILED:
        case GET_USER_FAILED: {
            if (!isUserFailedAction(action)) {
                throw new Error("Invalid action type");
            }
            return {
                ...state,
                userInfo: action.userInfo,
                message: action.userMessage,
                failed: true,
                request: false
            };
        }
        default: {
            return state;
        }
    }
};

export default userReducer;