import {
    IAuthorizationInfo,
    ICurrentUserInfo,
    IIngredient,
    IIngredientDetailInfo,
    IOrderInfo,
    IServerInfo,
    ITokenInfo
} from "./types";


export const BUN_TYPE: string = "bun";
export const SAUCE_TYPE: string = "sauce";
export const MAIN_TYPE: string = "main";

export const BASE_WS: string = 'wss://norma.nomoreparties.space/orders';
export const ALL_WS: string = BASE_WS + '/all';
export const BASE_URL: string = 'https://norma.nomoreparties.space/api/';
export const DATA_URL: string = BASE_URL + 'ingredients';
export const ORDER_POST_URL: string = BASE_URL + 'orders';
export const LOGIN_URL: string = BASE_URL + 'auth/login';
export const LOGOUT_URL: string = BASE_URL + 'auth/logout';
export const REGISTER_URL: string = BASE_URL + 'auth/register';
export const TOKEN_URL: string = BASE_URL + 'auth/token';
export const USER_URL: string = BASE_URL + 'auth/user';
export const FORGOT_PASSWORD_URL: string = BASE_URL + 'password-reset';
export const RESET_PASSWORD_URL: string = BASE_URL + 'password-reset/reset';

export const DraggableTypes = {
    SORTED_ITEM: "card",
    ADDED_ITEM: "ingredient"
}

export const POST_PASSWORD: string = "POST_PASSWORD";
export const POST_PASSWORD_SUCCESS: string = "POST_PASSWORD_SUCCESS";
export const POST_PASSWORD_FAILED: string = "POST_PASSWORD_FAILED";
export const GET_TOKEN: string = "GET_TOKEN";
export const GET_TOKEN_FAILED: string = "GET_TOKEN_FAILED";
export const GET_TOKEN_SUCCESS: string = "GET_TOKEN_SUCCESS";
export const SET_USER: string = "SET_USER";
export const SET_USER_FAILED: string = "SET_USER_FAILED";
export const SET_USER_SUCCESS: string = "SET_USER_SUCCESS";
export const GET_USER: string = "GET_USER";
export const GET_USER_FAILED: string = "GET_USER_FAILED";
export const GET_USER_SUCCESS: string = "GET_USER_SUCCESS";
export const POST_LOGIN: string = "POST_LOGIN";
export const POST_LOGIN_FAILED: string = "POST_LOGIN_FAILED";
export const POST_LOGIN_SUCCESS: string = "POST_LOGIN_SUCCESS";
export const POST_LOGOUT: string = "POST_LOGOUT";
export const POST_REGISTER: string = "POST_REGISTER";
export const POST_REGISTER_FAILED: string = "POST_REGISTER_FAILED";
export const POST_REGISTER_SUCCESS: string = "POST_REGISTER_SUCCESS";
export const GET_ORDER_NUMBER: string = "GET_ORDER_NUMBER";
export const GET_ORDER_NUMBER_FAILED: string = "GET_ORDER_NUMBER_FAILED";
export const GET_ORDER_NUMBER_SUCCESS: string = "GET_ORDER_NUMBER_SUCCESS";
export const SHOW_INGREDIENT_DETAILS: string = "SHOW_INGREDIENT_DETAILS";
export const CLEAR_INGREDIENT_DETAILS: string = "CLEAR_INGREDIENT_DETAILS";
export const GET_DATA: string = "GET_DATA";
export const GET_DATA_FAILED: string = "GET_DATA_FAILED";
export const GET_DATA_SUCCESS: string = "GET_DATA_SUCCESS";
export const ADD_INGREDIENT: string = "ADD_INGREDIENT";
export const DISCARD_INGREDIENT: string = "DISCARD_INGREDIENT";
export const MOVE_ITEMS: string = "MOVE_ITEMS";
export const INCREMENT: string = "INCREMENT";
export const DECREMENT: string = "DECREMENT";
export const RESET: string = "RESET";
export const LOADING_START = 'LOADING_START';
export const LOADING_STOP = 'LOADING_STOP';
export const BASE_SOCKET_ID = 'BASE_SOCKET_ID';
export const ALL_SOCKET_ID = 'ALL_SOCKET_ID';

export const FORGOT_PASSWORD_VISITED_TAG: string = "forgotPasswordVisited";
export const REFRESH_TOKEN_STORAGE_TAG: string = "refreshToken";
export const EMPTY_REFRESH_TOKEN: string = "EMPTY_REFRESH_TOKEN";

export const EMPTY_CURRENT_USER_INFO: ICurrentUserInfo = {
    success: false,
    user: {
        email: "",
        name: ""
    }
};

export const EMPTY_AUTHORIZATION_INFO: IAuthorizationInfo = {
    success: false,
    accessToken: "",
    refreshToken: "",
    user: {
        email: "",
        name: ""
    }
};

export const EMPTY_TOKEN_INFO: ITokenInfo = {
    success: false,
    accessToken: "",
    refreshToken: ""
};

export const EMPTY_SERVER_INFO: IServerInfo = {
    success: false,
    message: "Empty message"
}

export const AUTHORIZED_SERVER_INFO: IServerInfo = {
    success: true,
    message: "Authorization completed"
}

export const EMPTY_ORDER_INFO: IOrderInfo = {
    name: "Ingredient ids must be provided",
    order: {number: 0},
    success: false
};

export const EMPTY_INGREDIENT_DETAILS: IIngredientDetailInfo = {
    image_large: "none",
    name: "Ingredient must be provided",
    calories: 0,
    proteins: 0,
    fat: 0,
    carbohydrates: 0
};

export const BACKUP_DATA_LIST: IIngredient[] = [
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
