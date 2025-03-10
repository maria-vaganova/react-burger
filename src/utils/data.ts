import {AuthorizationInfo, CurrentUserInfo, IngredientDetailInfo, OrderInfo, ServerInfo, TokenInfo} from "./types";

export const BUN_TYPE = "bun";
export const SAUCE_TYPE = "sauce";
export const MAIN_TYPE = "main";

export const BASE_URL = 'https://norma.nomoreparties.space/api/';
export const DATA_URL = BASE_URL + 'ingredients';
export const ORDER_POST_URL = BASE_URL + 'orders';
export const LOGIN_URL = BASE_URL + 'auth/login';
export const LOGOUT_URL = BASE_URL + 'auth/logout';
export const REGISTER_URL = BASE_URL + 'auth/register';
export const TOKEN_URL = BASE_URL + 'auth/token';
export const USER_URL = BASE_URL + 'auth/user';
export const FORGOT_PASSWORD_URL = BASE_URL + 'password-reset';
export const RESET_PASSWORD_URL = BASE_URL + 'password-reset/reset';

export const DraggableTypes = {
    SORTED_ITEM: "card",
    ADDED_ITEM: "ingredient"
}

export const POST_PASSWORD = "POST_PASSWORD";
export const POST_PASSWORD_SUCCESS = "POST_PASSWORD_SUCCESS";
export const POST_PASSWORD_FAILED = "POST_PASSWORD_FAILED";
export const GET_TOKEN = "GET_TOKEN";
export const GET_TOKEN_FAILED = "GET_TOKEN_FAILED";
export const GET_TOKEN_SUCCESS = "GET_TOKEN_SUCCESS";
export const SET_USER = "SET_USER";
export const SET_USER_FAILED = "SET_USER_FAILED";
export const SET_USER_SUCCESS = "SET_USER_SUCCESS";
export const GET_USER = "GET_USER";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const POST_LOGIN = "POST_LOGIN";
export const POST_LOGIN_FAILED = "POST_LOGIN_FAILED";
export const POST_LOGIN_SUCCESS = "POST_LOGIN_SUCCESS";
export const POST_LOGOUT = "POST_LOGOUT";
export const POST_REGISTER = "POST_REGISTER";
export const POST_REGISTER_FAILED = "POST_REGISTER_FAILED";
export const POST_REGISTER_SUCCESS = "POST_REGISTER_SUCCESS";
export const GET_ORDER_NUMBER = "GET_ORDER_NUMBER";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";
export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";
export const SHOW_INGREDIENT_DETAILS = "SHOW_INGREDIENT_DETAILS";
export const CLEAR_INGREDIENT_DETAILS = "CLEAR_INGREDIENT_DETAILS";
export const GET_DATA = "GET_DATA";
export const GET_DATA_FAILED = "GET_DATA_FAILED";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DISCARD_INGREDIENT = "DISCARD_INGREDIENT";
export const MOVE_ITEMS = "MOVE_ITEMS";
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const RESET = "RESET";

export const FORGOT_PASSWORD_VISITED_TAG = "forgotPasswordVisited";
export const REFRESH_TOKEN_STORAGE_TAG = "refreshToken";
export const EMPTY_REFRESH_TOKEN = "EMPTY_REFRESH_TOKEN";

export const EMPTY_CURRENT_USER_INFO: CurrentUserInfo = {
    success: false,
    user: {
        email: "",
        name: ""
    }
};

export const EMPTY_AUTHORIZATION_INFO: AuthorizationInfo = {
    success: false,
    accessToken: "",
    refreshToken: "",
    user: {
        email: "",
        name: ""
    }
};

export const EMPTY_TOKEN_INFO: TokenInfo = {
    success: false,
    accessToken: "",
    refreshToken: ""
};

export const EMPTY_SERVER_INFO: ServerInfo = {
    success: false,
    message: "Empty message"
}

export const AUTHORIZED_SERVER_INFO: ServerInfo = {
    success: true,
    message: "Authorization completed"
}

export const EMPTY_ORDER_INFO: OrderInfo = {
    name: "Ingredient ids must be provided",
    order: {number: 0},
    success: false
};

export const EMPTY_INGREDIENT_DETAILS: IngredientDetailInfo = {
    image_large: "none",
    name: "Ingredient must be provided",
    calories: 0,
    proteins: 0,
    fat: 0,
    carbohydrates: 0
};

export const BACKUP_DATA_LIST = [
    {
        "_id": "60666c42cc7b410027a1a9b1",
        "name": "Краторная булка N-200i",
        "type": "bun",
        "proteins": 80,
        "fat": 24,
        "carbohydrates": 53,
        "calories": 420,
        "price": 1255,
        "image": "https://code.s3.yandex.net/react/code/bun-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
        "__v": 0
    },
    {
        "_id": "60666c42cc7b410027a1a9b5",
        "name": "Говяжий метеорит (отбивная)",
        "type": "main",
        "proteins": 800,
        "fat": 800,
        "carbohydrates": 300,
        "calories": 2674,
        "price": 3000,
        "image": "https://code.s3.yandex.net/react/code/meat-04.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
        "__v": 0
    },
    {
        "_id": "60666c42cc7b410027a1a9b7",
        "name": "Соус Spicy-X",
        "type": "sauce",
        "proteins": 30,
        "fat": 20,
        "carbohydrates": 40,
        "calories": 30,
        "price": 90,
        "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
        "__v": 0
    }
];
