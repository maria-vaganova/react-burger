import style from "./OrderById.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredient, IIngredientForShow, IOrderFeedInfo} from "../../utils/types";
import {useEffect, useState} from "react";
import {
    convertIngredients,
    countOrderPrice,
    fulfilIngredient,
    getOrderNumberForCard,
    getRussianNameForStatus
} from "../../utils/util";
import {useParams} from "react-router";
import {
    dataInfoSelector,
    orderStateToProps,
    useAppSelector,
    useLoadingDispatch,
    useOrderDispatch
} from "../../services/store";
import {EMPTY_ORDER_FEED_INFO} from "../../utils/data";
import {Dispatch} from "redux";
import {startLoading, stopLoading} from "../../services/actions/loadingActions";
import {getOrderByNumber, TOrderActions} from "../../services/actions/orderActions";
import Warning from "../../images/warning.svg";

export interface IOrderByIdProps {
    isModal: boolean;
}

function OrderById({isModal}: IOrderByIdProps) {
    const {number} = useParams<{ number: string }>();
    const {data} = useAppSelector(dataInfoSelector);

    const [orderNotFound, setOrderNotFound] = useState<boolean>(true);

    const [orderFeedInfo, setOrderFeedInfo] = useState<IOrderFeedInfo>(EMPTY_ORDER_FEED_INFO);

    const [price, setPrice] = useState<number>();
    const [ingredientList, setIngredientList] = useState<IIngredient[]>([]);
    const [ingredientForShowList, setIngredientForShowList] = useState<IIngredientForShow[]>([]);

    useEffect(() => {
        handleOrder(number || "0");
    }, []);

    useEffect(() => {
        setIngredientList(orderFeedInfo.ingredients.map((id: string) => fulfilIngredient(id, data)));
    }, [orderFeedInfo, data]);

    useEffect(() => {
        setPrice(countOrderPrice(ingredientList));
        setIngredientForShowList(convertIngredients(ingredientList));
    }, [ingredientList]);

    const {orderRequest, orderFailed, orderInfo} = useAppSelector(orderStateToProps);
    const dispatchOrder = useOrderDispatch();
    const handleOrder = (id: string): void => {
        const getOrderByNumberThunk: (dispatch: Dispatch<TOrderActions>) => Promise<void> = getOrderByNumber(id);
        dispatchOrder(getOrderByNumberThunk);
    };

    const dispatchLoading = useLoadingDispatch();

    useEffect((): void => {
        if (orderFailed) {
            setOrderNotFound(true);
            dispatchLoading(stopLoading());
        } else if (orderRequest) {
            dispatchLoading(startLoading());
        } else if (!orderRequest) {
            dispatchLoading(stopLoading());
            if ("orders" in orderInfo) {
                if (orderInfo.orders[0]) {
                    setOrderFeedInfo(orderInfo.orders[0]);
                    setOrderNotFound(false);
                }
            }
        }
    }, [orderRequest, orderFailed, orderInfo]);

    return (
        orderNotFound ? (
            <div className={isModal ? style.errorContentModal : style.errorContent}>
                <img alt={"Warning"} src={Warning}/>
                <p className="text text_type_main-default">Ошибка загрузки информации о заказе с
                    id {number || "0"}</p>
            </div>
        ) : (
            <div className={isModal ? style.centerModal : style.center}>
                <div className={style.content}>
                    <p className={"text text_type_digits-default " + (isModal ? style.modalTitleText : style.centerText)}>
                        #{getOrderNumberForCard(orderFeedInfo.number)}
                    </p>
                    <p className="text text_type_main-medium mt-10">{orderFeedInfo.name}</p>
                    <p className="text text_type_main-default mt-3 text_color_success">{getRussianNameForStatus(orderFeedInfo.status)}</p>
                    <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>
                    <div className={style.scrollableContainer}>
                        <div className={style.ingredientContent}>
                            {ingredientForShowList.map((ingredient: IIngredientForShow) => (
                                <div className={style.ingredientLine}>
                                    <div className={style.iconItem}>
                                        <img className={style.img}
                                             src={ingredient.image_mobile}
                                             alt="Icon"/>
                                    </div>
                                    <div className={style.ingredientName}>
                                        <p className="text text_type_main-default">{ingredient.name}</p>
                                    </div>
                                    <div className={style.priceLine}>
                                        <p className="text text_type_digits-default">{ingredient.count} x {ingredient.price}</p>
                                        <CurrencyIcon type="primary"/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={style.bottomLine + " mt-10" + (isModal && " mb-10")}>
                        <div className={style.line}>
                            <p className="text text_type_main-default text_color_inactive">
                                <FormattedDate date={new Date(orderFeedInfo.createdAt)}/>
                            </p>
                            <div className={style.priceLine}>
                                <p className="text text_type_digits-default">{price}</p>
                                <CurrencyIcon type="primary"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );

}

export default OrderById;