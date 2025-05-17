import store, {
    RootState,
    orderStateToProps,
    dataStateToProps,
    cartSelector,
    totalPriceSelector,
    loadingSelector,
    loginStateToProps,
    registerStateToProps,
    userStateToProps,
    tokenStateToProps,
    passwordStateToProps,
    detailsSelector
} from './store';
import {
    EMPTY_AUTHORIZATION_INFO,
    EMPTY_CURRENT_USER_INFO,
    EMPTY_INGREDIENT_DETAILS,
    EMPTY_ORDER_INFO,
    EMPTY_SERVER_INFO,
    EMPTY_TOKEN_INFO
} from "../utils/data";

const mockRootState: RootState = {
    order: {request: false, failed: false, orderInfo: EMPTY_ORDER_INFO},
    ingredientDetails: {ingredientDetails: EMPTY_INGREDIENT_DETAILS},
    data: {request: false, failed: false, dataInfo: []},
    cart: {cartItems: []},
    totalPrice: {count: 0},
    register: {
        request: false,
        failed: false,
        registerInfo: EMPTY_AUTHORIZATION_INFO,
        message: EMPTY_SERVER_INFO
    },
    login: {request: false, failed: false, loginInfo: EMPTY_AUTHORIZATION_INFO, message: EMPTY_SERVER_INFO},
    user: {request: false, failed: false, userInfo: EMPTY_CURRENT_USER_INFO, message: EMPTY_SERVER_INFO},
    token: {request: false, failed: false, tokenInfo: EMPTY_TOKEN_INFO, message: EMPTY_SERVER_INFO},
    password: {request: false, failed: false, message: EMPTY_SERVER_INFO},
    loading: {isLoading: true},
    websocket: {}
};

describe('Redux Store', () => {
    it('should return the initial state', () => {
        const state = store.getState();
        expect(state).toEqual(mockRootState);
    });

    describe('Redux Selectors', () => {
        it('orderStateToProps should select correct values', () => {
            const result = orderStateToProps(mockRootState);
            expect(result).toEqual({
                orderRequest: false,
                orderFailed: false,
                orderInfo: mockRootState.order.orderInfo
            });
        });

        it('dataStateToProps should select correct values', () => {
            const result = dataStateToProps(mockRootState);
            expect(result).toEqual({
                dataRequest: false,
                dataFailed: false
            });
        });

        it('cartSelector should select cart items', () => {
            const result = cartSelector(mockRootState);
            expect(result).toEqual({
                cart: mockRootState.cart.cartItems
            });
        });

        it('totalPriceSelector should select total price', () => {
            const result = totalPriceSelector(mockRootState);
            expect(result).toEqual({
                totalPrice: mockRootState.totalPrice.count
            });
        });

        it('loadingSelector should select loading flag', () => {
            const result = loadingSelector(mockRootState);
            expect(result).toEqual({
                loading: mockRootState.loading.isLoading
            });
        });

        it('loginStateToProps should select login info', () => {
            const result = loginStateToProps(mockRootState);
            expect(result).toEqual({
                loginRequest: false,
                loginFailed: false,
                loginInfo: EMPTY_AUTHORIZATION_INFO,
                loginMessage: EMPTY_SERVER_INFO
            });
        });

        it('registerStateToProps should select register info', () => {
            const result = registerStateToProps(mockRootState);
            expect(result).toEqual({
                registerRequest: false,
                registerFailed: false,
                registerInfo: EMPTY_AUTHORIZATION_INFO,
                registerMessage: EMPTY_SERVER_INFO
            });
        });

        it('userStateToProps should select user info', () => {
            const result = userStateToProps(mockRootState);
            expect(result).toEqual({
                userRequest: false,
                userFailed: false,
                userInfo: EMPTY_CURRENT_USER_INFO,
                userMessage: EMPTY_SERVER_INFO
            });
        });

        it('tokenStateToProps should select token info', () => {
            const result = tokenStateToProps(mockRootState);
            expect(result).toEqual({
                tokenRequest: false,
                tokenFailed: false,
                tokenInfo: EMPTY_TOKEN_INFO,
                tokenMessage: EMPTY_SERVER_INFO
            });
        });

        it('passwordStateToProps should select password info', () => {
            const result = passwordStateToProps(mockRootState);
            expect(result).toEqual({
                passwordRequest: false,
                passwordFailed: false,
                passwordMessage: EMPTY_SERVER_INFO
            });
        });

        it('detailsSelector should select ingredient details', () => {
            const result = detailsSelector(mockRootState);
            expect(result).toEqual({
                selectedIngredient: mockRootState.ingredientDetails.ingredientDetails
            });
        });

        it('detailsSelector should select ingredient details', () => {
            const result = detailsSelector(mockRootState);
            expect(result).toEqual({
                selectedIngredient: mockRootState.ingredientDetails.ingredientDetails
            });
        });
    });
});