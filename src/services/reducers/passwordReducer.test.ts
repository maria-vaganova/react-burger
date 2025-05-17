import passwordReducer from '../reducers/passwordReducer';
import {
    IPostPasswordAction,
    IPostPasswordSuccessAction,
    IPostPasswordFailedAction,
    TPostPasswordActions
} from '../actions/passwordActions';
import {
    EMPTY_SERVER_INFO,
    POST_PASSWORD,
    POST_PASSWORD_FAILED,
    POST_PASSWORD_SUCCESS
} from '../../utils/data';
import {IServerInfo, IPasswordState} from '../../utils/types';

describe('password reducer', () => {
    const initialState: IPasswordState = {
        request: false,
        failed: false,
        message: EMPTY_SERVER_INFO
    };

    it('should return the initial state', () => {
        expect(passwordReducer(undefined, {} as TPostPasswordActions)).toEqual(initialState);
    });

    it('should handle POST_PASSWORD', () => {
        const mockMessage: IServerInfo = {
            message: 'Request sent',
            success: true
        };
        const action: IPostPasswordAction = {
            type: POST_PASSWORD,
            passwordMessage: mockMessage
        };
        const expectedState: IPasswordState = {
            request: true,
            failed: false,
            message: mockMessage
        };
        expect(passwordReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle POST_PASSWORD_SUCCESS', () => {
        const mockMessage: IServerInfo = {
            message: 'Password reset successful',
            success: true
        };
        const action: IPostPasswordSuccessAction = {
            type: POST_PASSWORD_SUCCESS,
            passwordMessage: mockMessage
        };
        const expectedState: IPasswordState = {
            request: false,
            failed: false,
            message: mockMessage
        };
        expect(passwordReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle POST_PASSWORD_FAILED', () => {
        const mockMessage: IServerInfo = {
            message: 'Password reset failed',
            success: false
        };
        const action: IPostPasswordFailedAction = {
            type: POST_PASSWORD_FAILED,
            passwordMessage: mockMessage
        };
        const expectedState: IPasswordState = {
            request: false,
            failed: true,
            message: mockMessage
        };
        expect(passwordReducer(initialState, action)).toEqual(expectedState);
    });
});
