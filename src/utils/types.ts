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

export interface IServerAnswer {
    request: boolean;
    failed: boolean;
}

export interface IServerMessage {
    message: IServerInfo;
}

export interface IServerInfo {
    message: string;
    success: boolean;
}

export interface IDataState extends IServerAnswer {
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

export interface IOrderState extends IServerAnswer {
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

export interface IRegisterState extends IServerAnswer, IServerMessage {
    registerInfo: IAuthorizationInfo;
}

export interface ILoginState extends IServerAnswer, IServerMessage {
    loginInfo: IAuthorizationInfo;
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

export interface IUserState extends IServerAnswer, IServerMessage {
    userInfo: ICurrentUserInfo;
}

export interface ICurrentUserInfo {
    success: boolean;
    user: IUserInfo;
}

export interface ITokenState extends IServerAnswer, IServerMessage {
    tokenInfo: ITokenInfo;
}

export interface ITokenInfo {
    success: boolean;
    accessToken: string;
    refreshToken: string;
}

export interface IPasswordState extends IServerAnswer, IServerMessage {
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
