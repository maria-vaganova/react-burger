import {Reducer} from "redux";
import {IPasswordState} from "../../utils/types";
import {
    EMPTY_SERVER_INFO,
    POST_PASSWORD,
    POST_PASSWORD_FAILED,
    POST_PASSWORD_SUCCESS
} from "../../utils/data";
import {TPostPasswordActions} from "../actions/passwordActions";

const initialState: IPasswordState = {
    passwordRequest: false,
    passwordFailed: false,
    passwordMessage: EMPTY_SERVER_INFO
}

const passwordReducer: Reducer<IPasswordState, {
    type: string;
    passwordMessage: any
}> = (state: IPasswordState = initialState, action: TPostPasswordActions): IPasswordState => {
    switch (action.type) {
        case POST_PASSWORD: {
            return {
                ...state,
                passwordRequest: true,
                passwordFailed: false,
                passwordMessage: EMPTY_SERVER_INFO
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