import {Reducer} from "redux";
import {PasswordState} from "../../utils/types";
import {
    EMPTY_SERVER_INFO,
    POST_PASSWORD,
    POST_PASSWORD_FAILED,
    POST_PASSWORD_SUCCESS
} from "../../utils/data";

const initialState: PasswordState = {
    passwordRequest: false,
    passwordFailed: false,
    passwordMessage: EMPTY_SERVER_INFO
}

const passwordReducer: Reducer<PasswordState, {type: string; passwordMessage?: any}> = (state = initialState, action) => {
    switch (action.type) {
        case POST_PASSWORD: {
            return {
                ...state,
                passwordRequest: true,
                passwordFailed: false,
            };
        }
        case POST_PASSWORD_SUCCESS: {
            return {
                ...state,
                passwordMessage: action.passwordMessage,
                passwordRequest: false,
                passwordFailed: false
            };
        }
        case POST_PASSWORD_FAILED: {
            return {
                ...state,
                passwordMessage: action.passwordMessage,
                passwordFailed: true,
                passwordRequest: false
            };
        }
        default: {
            return state;
        }
    }
};

export default passwordReducer;