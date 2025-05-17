import loadingReducer from '../reducers/loadingReducer';
import {TLoadingActions} from '../actions/loadingActions';
import {ILoadingState} from '../../utils/types';
import {LOADING_START, LOADING_STOP} from '../../utils/data';

describe('loading reducer', () => {
    it('should return the initial state', () => {
        expect(loadingReducer(undefined, {} as TLoadingActions)).toEqual({
            isLoading: true
        });
    });

    it('should handle LOADING_START action', () => {
        const previousState: ILoadingState = {
            isLoading: false
        };
        const action: TLoadingActions = {
            type: LOADING_START,
            isLoading: true
        };
        const expectedState: ILoadingState = {
            isLoading: true
        };
        expect(loadingReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle LOADING_STOP action', () => {
        const previousState: ILoadingState = {
            isLoading: true
        };
        const action: TLoadingActions = {
            type: LOADING_STOP,
            isLoading: false
        };
        const expectedState: ILoadingState = {
            isLoading: false
        };
        expect(loadingReducer(previousState, action)).toEqual(expectedState);
    });
});
