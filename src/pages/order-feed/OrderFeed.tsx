import style from './OrderFeed.module.css';
import {IFeedInfo, IOrderFeedInfo} from "../../utils/types";
import OrderCard from "../../components/order-card/OrderCard";
import {v4 as uuid_v4} from "uuid";

function OrderFeed() {
    const order1: IOrderFeedInfo = {
        ingredients: ["643d69a5c3f7b9001cfa093d", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa094a", "643d69a5c3f7b9001cfa0949", "643d69a5c3f7b9001cfa0948", "643d69a5c3f7b9001cfa0945","643d69a5c3f7b9001cfa0946", "643d69a5c3f7b9001cfa0945"],
        _id: "", // Здесь пустая строка, так как в данных _id отсутствует
        status: "done",
        number: 1,
        name: "Death Star Starship Main бургер",
        createdAt: "2024-06-23T20:11:01.403Z",
        updatedAt: "2024-06-23T20:11:01.406Z"
    };

    const order2: IOrderFeedInfo = {
        ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0949", "643d69a5c3f7b9001cfa0945"],
        _id: "", // Здесь пустая строка, так как в данных _id отсутствует (а где присутствует?)
        status: "done",
        number: 3,
        name: "Death Star Starship Main бургер",
        createdAt: "2024-06-23T23:13:23.654Z",
        updatedAt: "2024-06-23T23:13:23.657Z"
    };

    const feedInfo: IFeedInfo = {
        success: true,
        orders: [order1, order2, order1, order2],
        total: 2,
        totalToday: 2
    };

    return (
        <div className={style.content}>
            <div className={style.scrollableContainer}>
                <div className={style.leftItems}>
                    {feedInfo.orders.map((order: IOrderFeedInfo) => {
                        return (
                            <OrderCard key={uuid_v4()} isStatusShown={false} orderInfo={order}/>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default OrderFeed;