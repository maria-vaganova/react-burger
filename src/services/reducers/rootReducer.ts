import {combineReducers, Reducer} from "redux";
import orderReducer from "./orderReducer";
import detailReducer from "./detailReducer";
import dataReducer from "./dataReducer";
import cartReducer from "./cartReducer";
import totalPriceReducer from "./totalPriceReducer";
import registerReducer from "./registerReducer";
import loginReducer from "./loginReducer";
import userReducer from "./userReducer";
import tokenReducer from "./tokenReducer";
import passwordReducer from "./passwordReducer";
import loadingReducer from "./loadingReducer";

export const rootReducer: Reducer = combineReducers({
    order: orderReducer,
    ingredientDetails: detailReducer,
    data: dataReducer,
    cart: cartReducer,
    totalPrice: totalPriceReducer,
    register: registerReducer,
    login: loginReducer,
    user: userReducer,
    token: tokenReducer,
    password: passwordReducer,
    loading: loadingReducer
})