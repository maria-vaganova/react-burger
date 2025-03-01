import {Reducer} from "redux";
import {RegisterState} from "../../utils/types";
import {
    EMPTY_AUTHORIZATION_INFO,
    POST_REGISTER_FAILED,
    POST_REGISTER_SUCCESS,
    POST_REGISTER,
    EMPTY_SERVER_INFO
} from "../../utils/data";

const initialState: RegisterState = {
    registerRequest: false,
    registerFailed: false,
    registerInfo: EMPTY_AUTHORIZATION_INFO,
    registerMessage: EMPTY_SERVER_INFO
}

const registerReducer: Reducer<RegisterState, { type: string; registerInfo?: any; registerMessage?: any  }> = (state = initialState, action) => {
    switch (action.type) {
        case POST_REGISTER: {
            return {
                ...state,
                registerRequest: true,
                registerFailed: false,
            };
        }
        case POST_REGISTER_SUCCESS: {
            return {
                ...state,
                registerInfo: action.registerInfo,
                registerMessage: action.registerMessage,
                registerRequest: false,
                registerFailed: false
            };
        }
        case POST_REGISTER_FAILED: {
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