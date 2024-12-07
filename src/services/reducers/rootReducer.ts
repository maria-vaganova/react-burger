import {combineReducers} from "redux";
import orderReducer from "./orderReducer";
import detailReducer from "./detailReducer";

export const rootReducer = combineReducers({
    order: orderReducer,
    ingredientDetails: detailReducer,
})