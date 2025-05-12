import loginReducer from '../reducers/loginReducer';
import {
    IPostLoginAction,
    IPostLoginSuccessAction,
    IPostLoginFailedAction,
    IPostLogoutAction,
    TLoginActions,
    TLogoutActions
} from '../actions/loginActions';
import {
    EMPTY_AUTHORIZATION_INFO,
    EMPTY_SERVER_INFO,
    POST_LOGIN,
    POST_LOGIN_FAILED,
    POST_LOGIN_SUCCESS,
    POST_LOGOUT
} from '../../utils/data';
import {IAuthorizationInfo, IServerInfo, IUserInfo, ILoginState} from '../../utils/types';

describe('login reducer', () => {
    const initialState = {
        request: false,
        failed: false,
        loginInfo: EMPTY_AUTHORIZATION_INFO,
        message: EMPTY_SERVER_INFO
    } as ILoginState;

    it('should return the initial state', () => {
        expect(loginReducer(undefined, {} as TLoginActions | TLogoutActions)).toEqual(initialState);
    });

    it('should handle POST_LOGIN', () => {
        const action: IPostLoginAction = {
            type: POST_LOGIN
        };
        const expectedState = {
            request: true,
            failed: false,
            loginInfo: EMPTY_AUTHORIZATION_INFO,
            message: EMPTY_SERVER_INFO
        };
        expect(loginReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle POST_LOGIN_SUCCESS action with login info and message', () => {
        const mockUser: IUserInfo = {
            email: 'test@example.com',
            name: 'Test User'
        };
        const mockLoginInfo: IAuthorizationInfo = {
            success: true,
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
            user: mockUser
        };
        const mockMessage: IServerInfo = {
            message: 'Login successful',
            success: true
        };
        const action: IPostLoginSuccessAction = {
            type: POST_LOGIN_SUCCESS,
            loginInfo: mockLoginInfo,
            loginMessage: mockMessage
        };
        const expectedState = {
            request: false,
            failed: false,
            loginInfo: mockLoginInfo,
            message: mockMessage
        };
        expect(loginReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle POST_LOGIN_FAILED action with error message', () => {
        const mockLoginInfo: IAuthorizationInfo = {
            success: false,
            accessToken: '',
            refreshToken: '',
            user: {
                email: '',
                name: ''
            }
        };
        const mockMessage: IServerInfo = {
            message: 'Invalid email or password',
            success: false
        };
        const action: IPostLoginFailedAction = {
            type: POST_LOGIN_FAILED,
            loginInfo: mockLoginInfo,
            loginMessage: mockMessage
        };
        const expectedState = {
            request: false,
            failed: true,
            loginInfo: mockLoginInfo,
            message: mockMessage
        };
        expect(loginReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle POST_LOGOUT action and clear login info', () => {
        const previousState: ILoginState = {
            request: false,
            failed: false,
            loginInfo: {
                success: true,
                accessToken: 'mock-access-token',
                refreshToken: 'mock-refresh-token',
                user: {
                    email: 'test@example.com',
                    name: 'Test User'
                }
            },
            message: {
                message: 'You have been logged out',
                success: true
            }
        };
        const mockMessage: IServerInfo = {
            message: 'Logout successful',
            success: true
        };
        const action: IPostLogoutAction = {
            type: POST_LOGOUT,
            loginInfo: {
                success: false,
                accessToken: '',
                refreshToken: '',
                user: {
                    email: '',
                    name: ''
                }
            },
            loginMessage: mockMessage
        };
        const expectedState = {
            request: false,
            failed: false,
            loginInfo: EMPTY_AUTHORIZATION_INFO,
            message: mockMessage
        };
        expect(loginReducer(previousState, action)).toEqual(expectedState);
    });
});
