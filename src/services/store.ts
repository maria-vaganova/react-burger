import {createStore, applyMiddleware, compose, StoreEnhancer, Dispatch} from 'redux';
import {thunk, ThunkDispatch} from 'redux-thunk';
import {rootReducer} from "./reducers/rootReducer";
import {useDispatch, useSelector} from "react-redux";
import {OrderActions} from "./actions/orderActions";
import {IngredientDetailActionTypes} from "./actions/detailActions";
import {DataActions} from "./actions/dataActions";
import {CartActionTypes} from "./actions/cartActions";
import {createSelector} from "@reduxjs/toolkit";
// первый редьюсер вместе с настройкой стора занял 7 (!)(!!!!) часов

const initialState = {};
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk) as StoreEnhancer));

export default store;

type AppStore = typeof store;
type RootState = ReturnType<AppStore['getState']>;

export const useAppSelector = useSelector.withTypes<RootState>();

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
