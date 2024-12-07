import {createStore, applyMiddleware, compose, StoreEnhancer} from 'redux';
import {thunk, ThunkDispatch} from 'redux-thunk';
import {rootReducer} from "./reducers/rootReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {OrderActions} from "./actions/orderActions";
// первый редьюсер вместе с настройкой стора занял 7 (!)(!!!!) часов

const initialState = {};
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk) as StoreEnhancer));

export default store;

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type OrderDispatch = ThunkDispatch<RootState, unknown, OrderActions>;
export const useOrderDispatch: () => OrderDispatch = useDispatch;
