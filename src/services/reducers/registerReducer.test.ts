import registerReducer from '../reducers/registerReducer';
import {
    IPostRegisterAction,
    IPostRegisterSuccessAction,
    IPostRegisterFailedAction,
    TRegisterActions
} from '../actions/registerActions';
import {
    EMPTY_AUTHORIZATION_INFO,
    EMPTY_SERVER_INFO,
    POST_REGISTER,
    POST_REGISTER_FAILED,
    POST_REGISTER_SUCCESS
} from '../../utils/data';
import {IAuthorizationInfo, IServerInfo, IRegisterState} from '../../utils/types';

describe('register reducer', () => {
    const initialState: IRegisterState = {
        request: false,
        failed: false,
        registerInfo: EMPTY_AUTHORIZATION_INFO,
        message: EMPTY_SERVER_INFO
    };

    it('should return the initial state', () => {
        expect(registerReducer(undefined, {} as TRegisterActions)).toEqual(initialState);
    });

    it('should handle POST_REGISTER', () => {
        const action: IPostRegisterAction = {
            type: POST_REGISTER
        };
        const expectedState = {
            request: true,
            failed: false,
            registerInfo: EMPTY_AUTHORIZATION_INFO,
            message: EMPTY_SERVER_INFO
        };
        expect(registerReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle POST_REGISTER_SUCCESS action with user info and message', () => {
        const mockUser = {
            email: 'test@example.com',
            name: 'Test User'
        };
        const mockAuthInfo: IAuthorizationInfo = {
            success: true,
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
            user: mockUser
        };
        const mockMessage: IServerInfo = {
            message: 'Registration successful',
            success: true
        };
        const action: IPostRegisterSuccessAction = {
            type: POST_REGISTER_SUCCESS,
            registerInfo: mockAuthInfo,
            registerMessage: mockMessage
        };
        const expectedState = {
            request: false,
            failed: false,
            registerInfo: mockAuthInfo,
            message: mockMessage
        };
        expect(registerReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle POST_REGISTER_FAILED action with error message', () => {
        const mockAuthInfo: IAuthorizationInfo = {
            success: false,
            accessToken: '',
            refreshToken: '',
            user: {
                email: '',
                name: ''
            }
        };
        const mockMessage: IServerInfo = {
            message: 'Registration failed',
            success: false
        };
        const action: IPostRegisterFailedAction = {
            type: POST_REGISTER_FAILED,
            registerInfo: mockAuthInfo,
            registerMessage: mockMessage
        };
        const expectedState = {
            request: false,
            failed: true,
            registerInfo: mockAuthInfo,
            message: mockMessage
        };
        expect(registerReducer(initialState, action)).toEqual(expectedState);
    });
});
