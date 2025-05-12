import detailReducer from '../reducers/detailReducer';
import {SHOW_INGREDIENT_DETAILS, CLEAR_INGREDIENT_DETAILS, EMPTY_INGREDIENT_DETAILS} from '../../utils/data';
import {
    TIngredientDetailActions,
    IShowIngredientDetailAction,
    IClearIngredientDetailAction
} from '../actions/detailActions';
import {IIngredientDetailState} from '../../utils/types';

describe('detail reducer', () => {
    const initialState: IIngredientDetailState = {
        ingredientDetails: EMPTY_INGREDIENT_DETAILS
    };

    it('should return the initial state', () => {
        expect(detailReducer(undefined, {} as TIngredientDetailActions)).toEqual(initialState);
    });

    it('should handle SHOW_INGREDIENT_DETAILS with correct payload', () => {
        const mockIngredientDetail = {
            image_large: 'https://example.com/image.jpg',
            name: 'Cheese',
            calories: 363,
            proteins: 25,
            fat: 30,
            carbohydrates: 1
        };
        const action: IShowIngredientDetailAction = {
            type: SHOW_INGREDIENT_DETAILS,
            ingredientDetailInfo: mockIngredientDetail
        };
        const expectedState: IIngredientDetailState = {
            ingredientDetails: mockIngredientDetail
        };
        expect(detailReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle CLEAR_INGREDIENT_DETAILS and reset to empty', () => {
        const previousState: IIngredientDetailState = {
            ingredientDetails: {
                image_large: 'https://example.com/image.jpg',
                name: 'Cheese',
                calories: 363,
                proteins: 25,
                fat: 30,
                carbohydrates: 1
            }
        };
        const action: IClearIngredientDetailAction = {
            type: CLEAR_INGREDIENT_DETAILS,
            ingredientDetailInfo: EMPTY_INGREDIENT_DETAILS
        };
        const expectedState: IIngredientDetailState = {
            ingredientDetails: EMPTY_INGREDIENT_DETAILS
        };
        expect(detailReducer(previousState, action)).toEqual(expectedState);
    });
});
