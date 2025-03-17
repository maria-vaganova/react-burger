import {Reducer} from "redux";
import {ITokenState} from "../../utils/types";
import {
    EMPTY_SERVER_INFO,
    EMPTY_TOKEN_INFO,
    GET_TOKEN,
    GET_TOKEN_FAILED,
    GET_TOKEN_SUCCESS
} from "../../utils/data";
import {
    IGetAccessTokenAction,
    IGetAccessTokenFailedAction,
    IGetAccessTokenSuccessAction,
    TGetAccessTokenActions
} from "../actions/tokenActions";

const initialState: ITokenState = {
    tokenRequest: false,
    tokenFailed: false,
    tokenInfo: EMPTY_TOKEN_INFO,
    tokenMessage: EMPTY_SERVER_INFO
}

function isGetAccessTokenAction(action: TGetAccessTokenActions): action is IGetAccessTokenAction {
    return action.type === GET_TOKEN;
}
function isGetAccessTokenSuccessAction(action: TGetAccessTokenActions): action is IGetAccessTokenSuccessAction {
    return action.type === GET_TOKEN_SUCCESS;
}
function isGetAccessTokenFailedAction(action: TGetAccessTokenActions): action is IGetAccessTokenFailedAction {
    return action.type === GET_TOKEN_FAILED;
}

const tokenReducer: Reducer<ITokenState, {
    type: string;
    tokenInfo?: any;
    tokenMessage?: any
}> = (state: ITokenState = initialState, action: TGetAccessTokenActions): ITokenState => {
    switch (action.type) {
        case GET_TOKEN: {
            if (!isGetAccessTokenAction(action)) {
                throw new Error("Invalid action type");
            }
            return {
                ...state,
                tokenRequest: true,
                tokenFailed: false,
            };
        }
        case GET_TOKEN_SUCCESS: {
            if (!isGetAccessTokenSuccessAction(action)) {
                throw new Error("Invalid action type");
            }
            return {
                ...state,
                tokenInfo: action.tokenInfo,
                tokenMessage: action.tokenMessage,
                tokenRequest: false,
                tokenFailed: false
            };
        }
        case GET_TOKEN_FAILED: {
            if (!isGetAccessTokenFailedAction(action)) {
                throw new Error("Invalid action type");
            }
            return {
                ...state,
                tokenInfo: action.tokenInfo,
                tokenMessage: action.tokenMessage,
                tokenFailed: true,
                tokenRequest: false
            };
        }
        default: {
            return state;
        }
    }
};

export default tokenReducer;