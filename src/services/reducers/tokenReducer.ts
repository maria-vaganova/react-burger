import {Reducer} from "redux";
import {TokenState} from "../../utils/types";
import {
    EMPTY_SERVER_INFO,
    EMPTY_TOKEN_INFO,
    GET_TOKEN,
    GET_TOKEN_FAILED,
    GET_TOKEN_SUCCESS
} from "../../utils/data";

const initialState: TokenState = {
    tokenRequest: false,
    tokenFailed: false,
    tokenInfo: EMPTY_TOKEN_INFO,
    tokenMessage: EMPTY_SERVER_INFO
}

const tokenReducer: Reducer<TokenState, {type: string; tokenInfo?: any; tokenMessage?: any}> = (state = initialState, action) => {
    switch (action.type) {
        case GET_TOKEN: {
            return {
                ...state,
                tokenRequest: true,
                tokenFailed: false,
            };
        }
        case GET_TOKEN_SUCCESS: {
            return {
                ...state,
                tokenInfo: action.tokenInfo,
                tokenMessage: action.tokenMessage,
                tokenRequest: false,
                tokenFailed: false
            };
        }
        case GET_TOKEN_FAILED: {
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