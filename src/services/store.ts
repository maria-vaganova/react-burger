import {createStore, applyMiddleware, compose, StoreEnhancer, Dispatch} from 'redux';
import {thunk, ThunkDispatch} from 'redux-thunk';
import {rootReducer} from "./reducers/rootReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {OrderActions} from "./actions/orderActions";
import {IngredientDetailActionTypes} from "./actions/detailActions";
import {DataActions} from "./actions/dataActions";
import {CartActionTypes} from "./actions/cartActions";
// первый редьюсер вместе с настройкой стора занял 7 (!)(!!!!) часов

const initialState = {};
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk) as StoreEnhancer));

export default store;

type AppStore = typeof store;
type RootState = ReturnType<AppStore['getState']>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useOrderDispatch: () => ThunkDispatch<RootState, unknown, OrderActions> = useDispatch;
export const useDetailDispatch: () => Dispatch<IngredientDetailActionTypes> = useDispatch;
export const useDataDispatch: () => ThunkDispatch<RootState, unknown, DataActions> = useDispatch;
export const useCartDispatch: () => Dispatch<CartActionTypes> = useDispatch;
