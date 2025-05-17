import totalPriceReducer from '../reducers/totalPriceReducer';
import {
    TTotalPriceActions,
    IIncrementAction,
    IDecrementAction,
    IResetAction
} from '../actions/totalPriceActions';
import {INCREMENT, DECREMENT, RESET} from '../../utils/data';
import {ITotalPriceState} from '../../utils/types';

describe('totalPrice reducer', () => {
    const initialState: ITotalPriceState = {
        count: 0
    };

    it('should return the initial state', () => {
        expect(totalPriceReducer(undefined, {} as TTotalPriceActions)).toEqual(initialState);
    });

    it('should handle INCREMENT action', () => {
        const previousState: ITotalPriceState = {
            count: 100
        };
        const action: IIncrementAction = {
            type: INCREMENT,
            totalPrice: 50
        };
        const expectedState: ITotalPriceState = {
            count: 150
        };
        expect(totalPriceReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle DECREMENT action', () => {
        const previousState: ITotalPriceState = {
            count: 100
        };
        const action: IDecrementAction = {
            type: DECREMENT,
            totalPrice: 30
        };
        const expectedState: ITotalPriceState = {
            count: 70
        };
        expect(totalPriceReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle RESET action', () => {
        const previousState: ITotalPriceState = {
            count: 200
        };
        const action: IResetAction = {
            type: RESET,
            totalPrice: 0
        };
        const expectedState: ITotalPriceState = {
            count: 0
        };
        expect(totalPriceReducer(previousState, action)).toEqual(expectedState);
    });
});
