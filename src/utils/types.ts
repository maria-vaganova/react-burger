export interface IIngredient {
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

export interface IDataState {
    dataRequest: boolean;
    dataFailed: boolean;
    dataInfo: IIngredient[];
}

export interface ITotalPriceState {
    count: number;
}

export interface ICartState {
    cartItems: ICartItem[];
}

export interface ICartItem {
    id: string;
    type: string;
    displayOrder: number;
    key: string;
}

export interface IOrderState {
    orderRequest: boolean;
    orderFailed: boolean;
    orderInfo: IOrderInfo;
}

export interface IOrderInfo {
    name: string;
    order: IOrder;
    success: boolean;
}

export interface IOrder {
    number: number;
}

export interface IRegisterState {
    registerRequest: boolean;
    registerFailed: boolean;
    registerInfo: IAuthorizationInfo;
    registerMessage: IServerInfo;
}

export interface ILoginState {
    loginRequest: boolean;
    loginFailed: boolean;
    loginInfo: IAuthorizationInfo;
    loginMessage: IServerInfo;
}

export interface IServerInfo {
    message: string;
    success: boolean;
}

export interface IAuthorizationInfo {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: IUserInfo;
}

export interface IUserInfo {
    email: string;
    name: string;
}

export interface IUserToLogIn {
    email: string;
    password: string;
}

export interface IUserAuthorization {
    email: string;
    password: string;
    name: string;
}

export interface IUserState {
    userRequest: boolean;
    userFailed: boolean;
    userInfo: ICurrentUserInfo;
    userMessage: IServerInfo;
}

export interface ICurrentUserInfo {
    success: boolean;
    user: IUserInfo;
}

export interface ITokenState {
    tokenRequest: boolean;
    tokenFailed: boolean;
    tokenInfo: ITokenInfo;
    tokenMessage: IServerInfo;
}

export interface ITokenInfo {
    success: boolean;
    accessToken: string;
    refreshToken: string;
}

export interface IPasswordState {
    passwordRequest: boolean;
    passwordFailed: boolean;
    passwordMessage: IServerInfo;
}

export interface IResetPasswordInfo {
    password: string;
    token: string;
}

export interface IIngredientDetailInfo {
    image_large: string;
    name: string;
    calories: number;
    proteins: number;
    fat: number;
    carbohydrates: number;
}

export interface IIngredientDetailState {
    ingredientDetails: IIngredientDetailInfo;
}
