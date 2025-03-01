import {createStore, applyMiddleware, compose, StoreEnhancer, Dispatch} from 'redux';
import {thunk, ThunkDispatch} from 'redux-thunk';
import {useDispatch, useSelector} from "react-redux";
import {createSelector} from "@reduxjs/toolkit";
import {rootReducer} from "./reducers/rootReducer";
import {OrderActions} from "./actions/orderActions";
import {IngredientDetailActionTypes} from "./actions/detailActions";
import {DataActions} from "./actions/dataActions";
import {CartActionTypes} from "./actions/cartActions";
import {TotalPriceActionTypes} from "./actions/totalPriceActions";
import {RegisterActions} from "./actions/registerActions";
import {LoginActions, LogoutActions} from "./actions/loginActions";
import {GetUserActions, SetUserActions} from "./actions/userActions";
import {GetAccessTokenActions} from "./actions/tokenActions";
import {PostPasswordActions} from "./actions/passwordActions";
// первый редьюсер вместе с настройкой стора занял 7 (!)(!!!!) часов

const initialState = {};
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk) as StoreEnhancer));

export default store;

type AppStore = typeof store;
type RootState = ReturnType<AppStore['getState']>;

export const useAppSelector = useSelector.withTypes<RootState>();

const selectPasswordRequest = (state: RootState) => state.password.passwordRequest;
const selectPasswordFailed = (state: RootState) => state.password.passwordFailed;
const selectPasswordMessage = (state: RootState) => state.password.passwordMessage;
export const passwordStateToProps = createSelector(
    [selectPasswordRequest, selectPasswordFailed, selectPasswordMessage],
    (passwordRequest, passwordFailed, passwordMessage) => ({
        passwordRequest,
        passwordFailed,
        passwordMessage
    })
);
export const usePostPasswordDispatch = useDispatch.withTypes<ThunkDispatch<RootState, unknown, PostPasswordActions>>();

const selectTokenRequest = (state: RootState) => state.token.tokenRequest;
const selectTokenFailed = (state: RootState) => state.token.tokenFailed;
const selectTokenInfo = (state: RootState) => state.token.tokenInfo;
const selectTokenMessage = (state: RootState) => state.token.tokenMessage;
export const tokenStateToProps = createSelector(
    [selectTokenRequest, selectTokenFailed, selectTokenInfo, selectTokenMessage],
    (tokenRequest, tokenFailed, tokenInfo, tokenMessage) => ({
        tokenRequest,
        tokenFailed,
        tokenInfo,
        tokenMessage
    })
);
export const useGetAccessTokenDispatch = useDispatch.withTypes<ThunkDispatch<RootState, unknown, GetAccessTokenActions>>();

const selectUserRequest = (state: RootState) => state.user.userRequest;
const selectUserFailed = (state: RootState) => state.user.userFailed;
const selectUserInfo = (state: RootState) => state.user.userInfo;
const selectUserMessage = (state: RootState) => state.user.userMessage;
export const userStateToProps = createSelector(
    [selectUserRequest, selectUserFailed, selectUserInfo, selectUserMessage],
    (userRequest, userFailed, userInfo, userMessage) => ({
        userRequest,
        userFailed,
        userInfo,
        userMessage
    })
);
export const useGetUserDispatch = useDispatch.withTypes<ThunkDispatch<RootState, unknown, GetUserActions>>();
export const useSetUserDispatch = useDispatch.withTypes<ThunkDispatch<RootState, unknown, SetUserActions>>();

const selectLoginRequest = (state: RootState) => state.login.loginRequest;
const selectLoginFailed = (state: RootState) => state.login.loginFailed;
const selectLoginInfo = (state: RootState) => state.login.loginInfo;
const selectLoginMessage = (state: RootState) => state.login.loginMessage;
export const loginStateToProps = createSelector(
    [selectLoginRequest, selectLoginFailed, selectLoginInfo, selectLoginMessage],
    (loginRequest, loginFailed, loginInfo, loginMessage) => ({
        loginRequest,
        loginFailed,
        loginInfo,
        loginMessage
    })
);
export const useLoginDispatch = useDispatch.withTypes<ThunkDispatch<RootState, unknown, LoginActions>>();
export const useLogoutDispatch = useDispatch.withTypes<ThunkDispatch<RootState, unknown, LogoutActions>>();

const selectRegisterRequest = (state: RootState) => state.register.registerRequest;
const selectRegisterFailed = (state: RootState) => state.register.registerFailed;
const selectRegisterInfo = (state: RootState) => state.register.registerInfo;
const selectRegisterMessage = (state: RootState) => state.register.registerMessage;
export const registerStateToProps = createSelector(
    [selectRegisterRequest, selectRegisterFailed, selectRegisterInfo, selectRegisterMessage],
    (registerRequest, registerFailed, registerInfo, registerMessage) => ({
        registerRequest,
        registerFailed,
        registerInfo,
        registerMessage
    })
);
export const useRegisterDispatch = useDispatch.withTypes<ThunkDispatch<RootState, unknown, RegisterActions>>();

const selectOrderRequest = (state: RootState) => state.order.orderRequest;
const selectOrderFailed = (state: RootState) => state.order.orderFailed;
const selectOrderInfo = (state: RootState) => state.order.orderInfo;
export const orderStateToProps = createSelector(
    [selectOrderRequest, selectOrderFailed, selectOrderInfo],
    (orderRequest, orderFailed, orderInfo) => ({
        orderRequest,
        orderFailed,
        orderInfo
    })
);
export const useOrderDispatch = useDispatch.withTypes<ThunkDispatch<RootState, unknown, OrderActions>>();

const selectIngredientDetail = (state: RootState) => state.ingredientDetails.ingredientDetails;
export const detailsSelector = createSelector(selectIngredientDetail, (selectedIngredient) => ({selectedIngredient}));
export const useDetailDispatch = useDispatch.withTypes<Dispatch<IngredientDetailActionTypes>>();

const selectDataRequest = (state: RootState) => state.data.dataRequest;
const selectDataFailed = (state: RootState) => state.data.dataFailed;
export const dataStateToProps = createSelector(
    [selectDataRequest, selectDataFailed],
    (dataRequest, dataFailed) => ({
        dataRequest,
        dataFailed
    })
);
const selectDataInfo = (state: RootState) => state.data.dataInfo;
export const dataInfoSelector = createSelector(selectDataInfo, (data) => ({data}));
export const useDataDispatch = useDispatch.withTypes<ThunkDispatch<RootState, unknown, DataActions>>();

const selectCart = (state: RootState) => state.cart.cartItems;
export const cartSelector = createSelector(selectCart, (cart) => ({cart}));
export const useCartDispatch = useDispatch.withTypes<Dispatch<CartActionTypes>>();

const selectTotalPrice = (state: RootState) => state.totalPrice.count;
export const totalPriceSelector = createSelector(selectTotalPrice, (totalPrice) => ({totalPrice}));
export const useTotalPriceDispatch = useDispatch.withTypes<Dispatch<TotalPriceActionTypes>>();
