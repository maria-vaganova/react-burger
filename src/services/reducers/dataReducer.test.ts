import dataReducer from '../reducers/dataReducer';
import {TDataActions, IGetDataSuccessAction} from '../actions/dataActions';
import {GET_DATA, GET_DATA_FAILED, GET_DATA_SUCCESS} from '../../utils/data';
import {IDataState, IIngredient} from '../../utils/types';

describe('data reducer', () => {
    const initialState: IDataState = {
        request: false,
        failed: false,
        dataInfo: []
    };

    it('should return the initial state', () => {
        expect(dataReducer(undefined, {} as TDataActions)).toEqual(initialState);
    });

    it('should handle GET_DATA', () => {
        const action: TDataActions = {
            type: GET_DATA
        };
        const expectedState: IDataState = {
            request: true,
            failed: false,
            dataInfo: []
        };
        expect(dataReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_DATA_SUCCESS', () => {
        const mockData: IIngredient[] = [
            {
                _id: '1',
                name: 'Bun',
                type: 'bun',
                proteins: 10,
                fat: 5,
                carbohydrates: 3,
                calories: 200,
                price: 100,
                image: 'bun.png',
                image_mobile: 'bun_mobile.png',
                image_large: 'bun_large.png',
                __v: 0
            }
        ];
        const action: IGetDataSuccessAction = {
            type: GET_DATA_SUCCESS,
            dataInfo: mockData
        };
        const expectedState: IDataState = {
            request: false,
            failed: false,
            dataInfo: mockData
        };
        expect(dataReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_DATA_FAILED', () => {
        const action: TDataActions = {
            type: GET_DATA_FAILED
        };
        const expectedState: IDataState = {
            request: false,
            failed: true,
            dataInfo: []
        };
        expect(dataReducer(initialState, action)).toEqual(expectedState);
    });
});
