import {Reducer} from "redux";
import {UserState} from "../../utils/types";
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

const initialState: UserState = {
    userRequest: false,
    userFailed: false,
    userInfo: EMPTY_CURRENT_USER_INFO,
    userMessage: EMPTY_SERVER_INFO
}

const userReducer: Reducer<UserState, { type: string; userInfo?: any; userMessage?: any  }> = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
        case GET_USER: {
            return {
                ...state,
                userRequest: true,
                userFailed: false,
            };
        }
        case SET_USER_SUCCESS:
        case GET_USER_SUCCESS: {
            return {
                ...state,
                userInfo: action.userInfo,
                userMessage: action.userMessage,
                userRequest: false,
                userFailed: false
            };
        }
        case SET_USER_FAILED:
        case GET_USER_FAILED: {
            return {
                ...state,
                userInfo: action.userInfo,
                userMessage: action.userMessage,
                userFailed: true,
                userRequest: false
            };
        }
        default: {
            return state;
        }
    }
};

export default userReducer;