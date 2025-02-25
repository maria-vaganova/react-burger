import {Reducer} from "redux";
import {AuthorizationInfo, DeniedInfo, RegisterState} from "../../utils/types";
import {
    EMPTY_AUTHORIZATION_INFO,
    POST_REGISTER_FAILED,
    POST_REGISTER_SUCCESS,
    POST_REGISTER
} from "../../utils/data";

const initialState: RegisterState = {
    registerRequest: false,
    registerFailed: false,
    registerInfo: EMPTY_AUTHORIZATION_INFO
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
                registerInfo: action.registerInfo as AuthorizationInfo,
                registerRequest: false,
                registerFailed: false
            };
        }
        case POST_REGISTER_FAILED: {
            return {
                ...state,
                registerInfo: action.registerInfo as DeniedInfo,
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