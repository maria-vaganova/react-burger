import {RegisterState} from "../../utils/types";
import {
    EMPTY_REGISTER_INFO,
    POST_REGISTER_FAILED,
    POST_REGISTER_SUCCESS,
    POST_REGISTER
} from "../../utils/data";
import {Reducer} from "redux";

const initialState: RegisterState = {
    registerRequest: false,
    registerFailed: false,
    registerInfo: EMPTY_REGISTER_INFO
}

const registerReducer: Reducer<RegisterState, { type: string; registerInfo?: any }> = (state = initialState, action) => {
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
                registerRequest: false
            };
        }
        case POST_REGISTER_FAILED: {
            return {
                ...state,
                registerInfo: action.registerInfo,
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