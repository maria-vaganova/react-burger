import {Reducer} from "redux";
import {IPasswordState, IServerInfo} from "../../utils/types";
import {
    EMPTY_SERVER_INFO,
    POST_PASSWORD,
    POST_PASSWORD_FAILED,
    POST_PASSWORD_SUCCESS
} from "../../utils/data";
import {TPostPasswordActions} from "../actions/passwordActions";

const initialState: IPasswordState = {
    request: false,
    failed: false,
    message: EMPTY_SERVER_INFO
}

const passwordReducer: Reducer<IPasswordState, {
    type: string;
    passwordMessage: IServerInfo;
}> = (state: IPasswordState = initialState, action: TPostPasswordActions): IPasswordState => {
    switch (action.type) {
        case POST_PASSWORD: {
            return {
                ...state,
                request: true,
                failed: false,
                message: EMPTY_SERVER_INFO
            };
        }
        case POST_PASSWORD_SUCCESS: {
            return {
                ...state,
                message: action.passwordMessage,
                request: false,
                failed: false
            };
        }
        case POST_PASSWORD_FAILED: {
            return {
                ...state,
                message: action.passwordMessage,
                failed: true,
                request: false
            };
        }
        default: {
            return state;
        }
    }
};

export default passwordReducer;