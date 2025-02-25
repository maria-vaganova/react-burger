export interface Ingredient {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}

export interface TotalPriceState {
    count: number;
}

export interface TotalPriceAction {
    type: "increment" | "decrement" | "reset";
    ingredient?: Ingredient;
}

export interface OrderInfo {
    name: string;
    order: Order;
    success: boolean;
}

export interface Order {
    number: number;
}

export interface CartItem {
    id: string;
    type: string;
    displayOrder: number;
    key: string;
}

export interface OrderState {
    orderRequest: boolean;
    orderFailed: boolean;
    orderInfo: OrderInfo;
}

export interface RegisterState {
    registerRequest: boolean;
    registerFailed: boolean;
    registerInfo: AuthorizationInfo | DeniedInfo;
}

export interface DeniedInfo {
    message: string;
    success: boolean;
}

export interface AuthorizationInfo {
    success: string;
    accessToken: string;
    refreshToken: string;
    user: UserInfo;
}

export interface UserInfo {
    email: string;
    name: string;
}

export interface UserToLogIn {
    email: string;
    password: string;
}

export interface UserAuthorization {
    email: string;
    password: string;
    name: string;
}

export interface LoginState {
    loginRequest: boolean;
    loginFailed: boolean;
    loginInfo: AuthorizationInfo | DeniedInfo;
}

export interface DataState {
    dataRequest: boolean;
    dataFailed: boolean;
    dataInfo: Ingredient[];
}

export interface IngredientDetailInfo {
    image_large: string;
    name: string;
    calories: number;
    proteins: number;
    fat: number;
    carbohydrates: number;
}

export interface IngredientDetailState {
    ingredientDetails: IngredientDetailInfo;
}

export interface CartState {
    cartItems: CartItem[];
}