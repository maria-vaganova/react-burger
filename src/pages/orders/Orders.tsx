import style from './Orders.module.css';
import LeftProfileLinks from "../../components/left-profile-links/LeftProfileLinks";
import {IFeedInfo, IOrderFeedInfo} from "../../utils/types";
import OrderCard from "../../components/order-card/OrderCard";
import {v4 as uuid_v4} from "uuid";

function Orders() {
    const order1: IOrderFeedInfo = {
        ingredients: ["643d69a5c3f7b9001cfa093d", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa094a", "643d69a5c3f7b9001cfa0949", "643d69a5c3f7b9001cfa0948", "643d69a5c3f7b9001cfa0945","643d69a5c3f7b9001cfa0946", "643d69a5c3f7b9001cfa0945"],
        _id: "", // Здесь пустая строка, так как в данных _id отсутствует
        status: "done",
        number: 1,
        createdAt: "2024-06-23T20:11:01.403Z",
        updatedAt: "2024-06-23T20:11:01.406Z"
    };

    const order2: IOrderFeedInfo = {
        ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0949", "643d69a5c3f7b9001cfa0945"],
        _id: "", // Здесь пустая строка, так как в данных _id отсутствует
        status: "done",
        number: 3,
        createdAt: "2024-06-23T23:13:23.654Z",
        updatedAt: "2024-06-23T23:13:23.657Z"
    };

// Заполняем данные для IFeedInfo
    const feedInfo: IFeedInfo = {
        success: true,
        orders: [order1, order2, order1, order2], // Массив заказов
        total: 2,
        totalToday: 2
    };


    return (
        <div className={style.content}>
            <div className={style.leftLinks}>
                <LeftProfileLinks/>
            </div>
            <div className={style.scrollableContainer}>
                <div className={style.centerItems}>
                    {feedInfo.orders.map((order: IOrderFeedInfo) => {
                        return (
                            <OrderCard key={uuid_v4()} isStatusShown={true} orderInfo={order}/>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Orders;