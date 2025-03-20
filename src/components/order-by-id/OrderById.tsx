import {IOrderFeedInfo} from "../../utils/types";
import style from "../../pages/orders/Orders.module.css";
import orderCard from "../order-card/OrderCard.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";

export interface IOrderByIdProps {
    isModal: boolean;
}

function OrderById({isModal}: IOrderByIdProps) {

    return (
        <div>
            <p className="text text_type_digits-default">#000456</p>
            <p className="text text_type_main-medium mt-6">Привет пока</p>
            <p className="text text_type_main-default mt-2 text_color_accent">Выполнен</p>
            <p className="text text_type_main-medium mt-2">Состав:</p>
            <div className={style.scrollableContainer}>
            </div>
            <div>
                <p className="text text_type_main-default text_color_inactive">
                    <FormattedDate date={new Date("2024-06-23T23:13:23.654Z")}/>
                </p>
                <div className={orderCard.priceLine}>
                    <p className="text text_type_digits-default">510</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    );

}

export default OrderById;