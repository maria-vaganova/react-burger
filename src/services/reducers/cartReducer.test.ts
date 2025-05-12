import cartReducer from '../reducers/cartReducer';
import {
    IAddIngredientAction,
    TCartActions,
    IDiscardIngredientAction,
    IMoveItemsAction
} from '../actions/cartActions';
import {ICartState} from '../../utils/types';
import {
    ADD_INGREDIENT,
    BUN_TYPE,
    SAUCE_TYPE,
    MAIN_TYPE,
    DISCARD_INGREDIENT,
    MOVE_ITEMS
} from '../../utils/data';

describe('cart reducer', () => {
    const initialState: ICartState = {
        cartItems: []
    };

    it('should return the initial state', () => {
        expect(cartReducer(undefined, {} as TCartActions)).toEqual(initialState);
    });

    it('should handle ADD_INGREDIENT for regular ingredient (sauce)', () => {
        const action: IAddIngredientAction = {
            type: ADD_INGREDIENT,
            cartItems: [
                {
                    id: '1',
                    type: SAUCE_TYPE,
                    displayOrder: 0,
                    key: 'key-1'
                }
            ]
        };
        const expectedState: ICartState = {
            cartItems: [
                {
                    id: '1',
                    type: SAUCE_TYPE,
                    displayOrder: 0,
                    key: 'key-1'
                }
            ]
        };
        expect(cartReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_INGREDIENT with multiple items and correct displayOrder', () => {
        const previousState: ICartState = {
            cartItems: [
                {
                    id: '1',
                    type: SAUCE_TYPE,
                    displayOrder: 0,
                    key: 'key-1'
                },
                {
                    id: '2',
                    type: MAIN_TYPE,
                    displayOrder: 1,
                    key: 'key-2'
                }
            ]
        };
        const action: IAddIngredientAction = {
            type: ADD_INGREDIENT,
            cartItems: [
                {
                    id: '3',
                    type: MAIN_TYPE,
                    displayOrder: 0,
                    key: 'key-3'
                }
            ]
        };
        const expectedState: ICartState = {
            cartItems: [
                {
                    id: '1',
                    type: SAUCE_TYPE,
                    displayOrder: 0,
                    key: 'key-1'
                },
                {
                    id: '2',
                    type: MAIN_TYPE,
                    displayOrder: 1,
                    key: 'key-2'
                },
                {
                    id: '3',
                    type: MAIN_TYPE,
                    displayOrder: 2,
                    key: 'key-3'
                }
            ]
        };
        expect(cartReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle ADD_INGREDIENT and replace existing bun', () => {
        const previousState: ICartState = {
            cartItems: [
                {
                    id: '2',
                    type: BUN_TYPE,
                    displayOrder: 0,
                    key: 'key-2'
                },
                {
                    id: '3',
                    type: MAIN_TYPE,
                    displayOrder: 1,
                    key: 'key-3'
                }
            ]
        };
        const action: IAddIngredientAction = {
            type: ADD_INGREDIENT,
            cartItems: [
                {
                    id: '4',
                    type: BUN_TYPE,
                    displayOrder: 0,
                    key: 'key-4'
                }
            ]
        };
        const expectedState: ICartState = {
            cartItems: [
                {
                    id: '3',
                    type: MAIN_TYPE,
                    displayOrder: 1,
                    key: 'key-3'
                },
                {
                    id: '4',
                    type: BUN_TYPE,
                    displayOrder: 0,
                    key: 'key-4'
                }
            ]
        };
        expect(cartReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle DISCARD_INGREDIENT and reindex displayOrder', () => {
        const previousState: ICartState = {
            cartItems: [
                {
                    id: '1',
                    type: SAUCE_TYPE,
                    displayOrder: 0,
                    key: 'key-1'
                },
                {
                    id: '2',
                    type: BUN_TYPE,
                    displayOrder: 1,
                    key: 'key-2'
                },
                {
                    id: '3',
                    type: MAIN_TYPE,
                    displayOrder: 2,
                    key: 'key-3'
                }
            ]
        };
        const action: IDiscardIngredientAction = {
            type: DISCARD_INGREDIENT,
            displayOrder: 1
        };
        const expectedState: ICartState = {
            cartItems: [
                {
                    id: '1',
                    type: SAUCE_TYPE,
                    displayOrder: 0,
                    key: 'key-1'
                },
                {
                    id: '3',
                    type: MAIN_TYPE,
                    displayOrder: 1,
                    key: 'key-3'
                }
            ]
        };
        expect(cartReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle MOVE_ITEMS correctly', () => {
        const previousState: ICartState = {
            cartItems: [
                {
                    id: '1',
                    type: SAUCE_TYPE,
                    displayOrder: 0,
                    key: 'key-1'
                },
                {
                    id: '2',
                    type: MAIN_TYPE,
                    displayOrder: 1,
                    key: 'key-2'
                },
                {
                    id: '3',
                    type: MAIN_TYPE,
                    displayOrder: 2,
                    key: 'key-3'
                }
            ]
        };
        const action: IMoveItemsAction = {
            type: MOVE_ITEMS,
            fromIndex: 2,
            toIndex: 0
        };
        const expectedState: ICartState = {
            cartItems: [
                {
                    id: '3',
                    type: MAIN_TYPE,
                    displayOrder: 2,
                    key: 'key-3'
                },
                {
                    id: '1',
                    type: SAUCE_TYPE,
                    displayOrder: 0,
                    key: 'key-1'
                },
                {
                    id: '2',
                    type: MAIN_TYPE,
                    displayOrder: 1,
                    key: 'key-2'
                }
            ]
        };
        expect(cartReducer(previousState, action)).toEqual(expectedState);
    });
});
