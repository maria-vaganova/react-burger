import userReducer from '../reducers/userReducer';
import {
    IGetUserSuccessAction,
    IGetUserFailedAction,
    ISetUserAction,
    ISetUserSuccessAction,
    ISetUserFailedAction,
    TGetUserActions,
    TSetUserActions
} from '../actions/userActions';
import {
    EMPTY_CURRENT_USER_INFO,
    EMPTY_SERVER_INFO,
    GET_USER,
    GET_USER_FAILED,
    GET_USER_SUCCESS,
    SET_USER,
    SET_USER_FAILED,
    SET_USER_SUCCESS
} from '../../utils/data';
import {ICurrentUserInfo, IServerInfo, IUserState} from '../../utils/types';

describe('user reducer', () => {
    const initialState: IUserState = {
        request: false,
        failed: false,
        userInfo: EMPTY_CURRENT_USER_INFO,
        message: EMPTY_SERVER_INFO
    };

    it('should return the initial state', () => {
        expect(userReducer(undefined, {} as TGetUserActions | TSetUserActions)).toEqual(initialState);
    });

    it('should handle GET_USER', () => {
        const action: TGetUserActions = {
            type: GET_USER
        };
        const expectedState: IUserState = {
            request: true,
            failed: false,
            userInfo: EMPTY_CURRENT_USER_INFO,
            message: EMPTY_SERVER_INFO
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_USER_SUCCESS', () => {
        const mockUserInfo: ICurrentUserInfo = {
            success: true,
            user: {
                email: 'test@example.com',
                name: 'Test User'
            }
        };
        const mockMessage: IServerInfo = {
            message: 'User loaded successfully',
            success: true
        };
        const action: IGetUserSuccessAction = {
            type: GET_USER_SUCCESS,
            userInfo: mockUserInfo,
            userMessage: mockMessage
        };
        const expectedState: IUserState = {
            request: false,
            failed: false,
            userInfo: mockUserInfo,
            message: mockMessage
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_USER_FAILED', () => {
        const mockUserInfo: ICurrentUserInfo = {
            success: false,
            user: {
                email: '',
                name: ''
            }
        };
        const mockMessage: IServerInfo = {
            message: 'Failed to load user',
            success: false
        };
        const action: IGetUserFailedAction = {
            type: GET_USER_FAILED,
            userInfo: mockUserInfo,
            userMessage: mockMessage
        };
        const expectedState: IUserState = {
            request: false,
            failed: true,
            userInfo: mockUserInfo,
            message: mockMessage
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_USER', () => {
        const action: ISetUserAction = {
            type: SET_USER
        };
        const expectedState: IUserState = {
            request: true,
            failed: false,
            userInfo: EMPTY_CURRENT_USER_INFO,
            message: EMPTY_SERVER_INFO
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_USER_SUCCESS', () => {
        const mockUserInfo: ICurrentUserInfo = {
            success: true,
            user: {
                email: 'updated@example.com',
                name: 'Updated Name'
            }
        };
        const mockMessage: IServerInfo = {
            message: 'User updated successfully',
            success: true
        };
        const action: ISetUserSuccessAction = {
            type: SET_USER_SUCCESS,
            userInfo: mockUserInfo,
            userMessage: mockMessage
        };
        const expectedState: IUserState = {
            request: false,
            failed: false,
            userInfo: mockUserInfo,
            message: mockMessage
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_USER_FAILED', () => {
        const mockUserInfo: ICurrentUserInfo = {
            success: false,
            user: {
                email: 'old@example.com',
                name: 'Old Name'
            }
        };
        const mockMessage: IServerInfo = {
            message: 'Failed to update user',
            success: false
        };
        const action: ISetUserFailedAction = {
            type: SET_USER_FAILED,
            userInfo: mockUserInfo,
            userMessage: mockMessage
        };
        const expectedState: IUserState = {
            request: false,
            failed: true,
            userInfo: mockUserInfo,
            message: mockMessage
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });
});
