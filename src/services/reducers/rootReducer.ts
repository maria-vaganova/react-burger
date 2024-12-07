import {combineReducers} from "redux";
import orderReducer from "./orderReducer";
import detailReducer from "./detailReducer";
import dataReducer from "./dataReducer";

export const rootReducer = combineReducers({
    order: orderReducer,
    ingredientDetails: detailReducer,
    data: dataReducer,
})