import {combineReducers} from "redux";
import orderReducer from "./orderReducer";
import detailReducer from "./detailReducer";
import dataReducer from "./dataReducer";
import cartReducer from "./cartReducer";
import totalPriceReducer from "./totalPriceReducer";
import registerReducer from "./registerReducer";
import loginReducer from "./loginReducer";

export const rootReducer = combineReducers({
    order: orderReducer,
    ingredientDetails: detailReducer,
    data: dataReducer,
    cart: cartReducer,
    totalPrice: totalPriceReducer,
    register: registerReducer,
    login: loginReducer
})