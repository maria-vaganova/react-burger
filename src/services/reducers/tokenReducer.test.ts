import tokenReducer from '../reducers/tokenReducer';
import {
    IGetAccessTokenSuccessAction,
    IGetAccessTokenFailedAction,
    IGetAccessTokenAction,
    TGetAccessTokenActions
} from '../actions/tokenActions';
import {
    EMPTY_SERVER_INFO,
    EMPTY_TOKEN_INFO,
    GET_TOKEN,
    GET_TOKEN_FAILED,
    GET_TOKEN_SUCCESS
} from '../../utils/data';
import {ITokenInfo, IServerInfo, ITokenState} from '../../utils/types';

describe('token reducer', () => {
    const initialState: ITokenState = {
        request: false,
        failed: false,
        tokenInfo: EMPTY_TOKEN_INFO,
        message: EMPTY_SERVER_INFO
    };

    it('should return the initial state', () => {
        expect(tokenReducer(undefined, {} as TGetAccessTokenActions)).toEqual(initialState);
    });

    it('should handle GET_TOKEN', () => {
        const action: IGetAccessTokenAction = {
            type: GET_TOKEN
        };
        const expectedState: ITokenState = {
            request: true,
            failed: false,
            tokenInfo: EMPTY_TOKEN_INFO,
            message: EMPTY_SERVER_INFO
        };
        expect(tokenReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_TOKEN_SUCCESS action with token info and message', () => {
        const mockTokenInfo: ITokenInfo = {
            success: true,
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token'
        };
        const mockMessage: IServerInfo = {
            message: 'Access token refreshed successfully',
            success: true
        };
        const action: IGetAccessTokenSuccessAction = {
            type: GET_TOKEN_SUCCESS,
            tokenInfo: mockTokenInfo,
            tokenMessage: mockMessage
        };
        const expectedState: ITokenState = {
            request: false,
            failed: false,
            tokenInfo: mockTokenInfo,
            message: mockMessage
        };
        expect(tokenReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_TOKEN_FAILED action with error message', () => {
        const mockTokenInfo: ITokenInfo = {
            success: false,
            accessToken: '',
            refreshToken: ''
        };
        const mockMessage: IServerInfo = {
            message: 'Failed to refresh access token',
            success: false
        };
        const action: IGetAccessTokenFailedAction = {
            type: GET_TOKEN_FAILED,
            tokenInfo: mockTokenInfo,
            tokenMessage: mockMessage
        };
        const expectedState: ITokenState = {
            request: false,
            failed: true,
            tokenInfo: mockTokenInfo,
            message: mockMessage
        };
        expect(tokenReducer(initialState, action)).toEqual(expectedState);
    });
});
