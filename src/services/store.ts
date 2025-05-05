import {createStore, applyMiddleware, compose, StoreEnhancer, Dispatch} from 'redux';
import {thunk, ThunkDispatch} from 'redux-thunk';
import {useDispatch, useSelector} from "react-redux";
import {createSelector} from "@reduxjs/toolkit";
import {rootReducer} from "./reducers/rootReducer";
import {socketMiddleware} from "./middleware/socketMiddleware";
import {TOrderActions} from "./actions/orderActions";
import {TIngredientDetailActions} from "./actions/detailActions";
import {TDataActions} from "./actions/dataActions";
import {TCartActions} from "./actions/cartActions";
import {TTotalPriceActions} from "./actions/totalPriceActions";
import {TRegisterActions} from "./actions/registerActions";
import {TLoginActions, TLogoutActions} from "./actions/loginActions";
import {TGetUserActions, TSetUserActions} from "./actions/userActions";
import {TGetAccessTokenActions} from "./actions/tokenActions";
import {TPostPasswordActions} from "./actions/passwordActions";
import {TLoadingActions} from "./actions/loadingActions";
import {TWSActions} from "./actions/wsActionTypes";
// первый редьюсер вместе с настройкой стора занял 7 (!)(!!!!) часов

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

// const initialState = {};
const composeEnhancers = (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk) as StoreEnhancer));
const store = createStore(
    rootReducer,
    undefined,
    composeEnhancers(
        applyMiddleware(
            thunk,
            socketMiddleware()
        )
    )
);

export default store;

type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type SocketActions = TWSActions;
export type SocketDispatch = ThunkDispatch<RootState, unknown, SocketActions>;

export const useAppSelector = useSelector.withTypes<RootState>();

const selectPasswordRequest = (state: RootState) => state.password.request;
const selectPasswordFailed = (state: RootState) => state.password.failed;
const selectPasswordMessage = (state: RootState) => state.password.message;
export const passwordStateToProps = createSelector(
    [selectPasswordRequest, selectPasswordFailed, selectPasswordMessage],
    (passwordRequest, passwordFailed, passwordMessage) => ({
        passwordRequest,
        passwordFailed,
        passwordMessage
    })
);
export const usePostPasswordDispatch = useDispatch.withTypes<ThunkDispatch<RootState, unknown, TPostPasswordActions>>();

const selectTokenRequest = (state: RootState) => state.token.request;
const selectTokenFailed = (state: RootState) => state.token.failed;
const selectTokenInfo = (state: RootState) => state.token.tokenInfo;
const selectTokenMessage = (state: RootState) => state.token.message;
export const tokenStateToProps = createSelector(
    [selectTokenRequest, selectTokenFailed, selectTokenInfo, selectTokenMessage],
    (tokenRequest, tokenFailed, tokenInfo, tokenMessage) => ({
        tokenRequest,
        tokenFailed,
        tokenInfo,
        tokenMessage
    })
);
export const useGetAccessTokenDispatch = useDispatch.withTypes<ThunkDispatch<RootState, unknown, TGetAccessTokenActions>>();

const selectUserRequest = (state: RootState) => state.user.request;
const selectUserFailed = (state: RootState) => state.user.failed;
const selectUserInfo = (state: RootState) => state.user.userInfo;
const selectUserMessage = (state: RootState) => state.user.message;
export const userStateToProps = createSelector(
    [selectUserRequest, selectUserFailed, selectUserInfo, selectUserMessage],
    (userRequest, userFailed, userInfo, userMessage) => ({
        userRequest,
        userFailed,
        userInfo,
        userMessage
    })
);
export const useGetUserDispatch = useDispatch.withTypes<ThunkDispatch<RootState, unknown, TGetUserActions>>();
export const useSetUserDispatch = useDispatch.withTypes<ThunkDispatch<RootState, unknown, TSetUserActions>>();

const selectLoginRequest = (state: RootState) => state.login.request;
const selectLoginFailed = (state: RootState) => state.login.failed;
const selectLoginInfo = (state: RootState) => state.login.loginInfo;
const selectLoginMessage = (state: RootState) => state.login.message;
export const loginStateToProps = createSelector(
    [selectLoginRequest, selectLoginFailed, selectLoginInfo, selectLoginMessage],
    (loginRequest, loginFailed, loginInfo, loginMessage) => ({
        loginRequest,
        loginFailed,
        loginInfo,
        loginMessage
    })
);
export const useLoginDispatch = useDispatch.withTypes<ThunkDispatch<RootState, unknown, TLoginActions>>();
export const useLogoutDispatch = useDispatch.withTypes<ThunkDispatch<RootState, unknown, TLogoutActions>>();

const selectRegisterRequest = (state: RootState) => state.register.request;
const selectRegisterFailed = (state: RootState) => state.register.failed;
const selectRegisterInfo = (state: RootState) => state.register.registerInfo;
const selectRegisterMessage = (state: RootState) => state.register.message;
export const registerStateToProps = createSelector(
    [selectRegisterRequest, selectRegisterFailed, selectRegisterInfo, selectRegisterMessage],
    (registerRequest, registerFailed, registerInfo, registerMessage) => ({
        registerRequest,
        registerFailed,
        registerInfo,
        registerMessage
    })
);
export const useRegisterDispatch = useDispatch.withTypes<ThunkDispatch<RootState, unknown, TRegisterActions>>();

const selectOrderRequest = (state: RootState) => state.order.request;
const selectOrderFailed = (state: RootState) => state.order.failed;
const selectOrderInfo = (state: RootState) => state.order.orderInfo;
export const orderStateToProps = createSelector(
    [selectOrderRequest, selectOrderFailed, selectOrderInfo],
    (orderRequest, orderFailed, orderInfo) => ({
        orderRequest,
        orderFailed,
        orderInfo
    })
);
export const useOrderDispatch = useDispatch.withTypes<ThunkDispatch<RootState, unknown, TOrderActions>>();

const selectIngredientDetail = (state: RootState) => state.ingredientDetails.ingredientDetails;
export const detailsSelector = createSelector(selectIngredientDetail, (selectedIngredient) => ({selectedIngredient}));
export const useDetailDispatch = useDispatch.withTypes<Dispatch<TIngredientDetailActions>>();

const selectDataRequest = (state: RootState) => state.data.request;
const selectDataFailed = (state: RootState) => state.data.failed;
export const dataStateToProps = createSelector(
    [selectDataRequest, selectDataFailed],
    (dataRequest, dataFailed) => ({
        dataRequest,
        dataFailed
    })
);
const selectDataInfo = (state: RootState) => state.data.dataInfo;
export const dataInfoSelector = createSelector(selectDataInfo, (data) => ({data}));
export const useDataDispatch = useDispatch.withTypes<ThunkDispatch<RootState, unknown, TDataActions>>();

const selectCart = (state: RootState) => state.cart.cartItems;
export const cartSelector = createSelector(selectCart, (cart) => ({cart}));
export const useCartDispatch = useDispatch.withTypes<Dispatch<TCartActions>>();

const selectTotalPrice = (state: RootState) => state.totalPrice.count;
export const totalPriceSelector = createSelector(selectTotalPrice, (totalPrice) => ({totalPrice}));
export const useTotalPriceDispatch = useDispatch.withTypes<Dispatch<TTotalPriceActions>>();

const selectLoading = (state: RootState) => state.loading.isLoading;
export const loadingSelector = createSelector(selectLoading, (loading) => ({loading}));
export const useLoadingDispatch = useDispatch.withTypes<Dispatch<TLoadingActions>>();
