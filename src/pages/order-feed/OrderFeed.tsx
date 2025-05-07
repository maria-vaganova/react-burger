import {useEffect, useState} from "react";
import style from './OrderFeed.module.css';
import {IFeedInfo, IOrderFeedInfo} from "../../utils/types";
import OrderCard from "../../components/order-card/OrderCard";
import {v4 as uuid_v4} from "uuid";
import {chunkNumberArray, getOrderNumberForCard} from "../../utils/util";

const order1: IOrderFeedInfo = {
    ingredients: ["643d69a5c3f7b9001cfa093d", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa094a", "643d69a5c3f7b9001cfa0949", "643d69a5c3f7b9001cfa0948", "643d69a5c3f7b9001cfa0945", "643d69a5c3f7b9001cfa0946", "643d69a5c3f7b9001cfa0945"],
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
    status: "pending",
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

function OrderFeed() {

    const [doneOrderNumbers, setDoneOrderNumbers] = useState<number[][]>([]);
    const [pendingOrderNumbers, setPendingOrderNumbers] = useState<number[][]>([]);

    useEffect(() => {
        const doneOrders = feedInfo.orders
            .filter(order => order.status === 'done')
            .map(order => order.number);
        const pendingOrders = feedInfo.orders
            .filter(order => order.status === 'pending')
            .map(order => order.number);


        const doneChunks = chunkNumberArray(doneOrders, 10);
        const pendingChunks = chunkNumberArray(pendingOrders, 10);

        setDoneOrderNumbers(doneChunks);
        setPendingOrderNumbers(pendingChunks);
    }, [])

    return (
        <div>
            <div className={style.title}>
                <h1 className="text_type_main-large">Лента заказов</h1>
            </div>
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
                <div className={style.rightItems}>
                    <div className={style.statuses}>
                        <div className={style.listByStatus}>
                            <p className="text text_type_main-medium">Готовы:</p>
                            <div className={style.numberListContainer}>
                                {doneOrderNumbers.map((chunk, index) => (
                                    <div key={`done-chunk-${index}`} className={style.numberList}>
                                        {chunk.map((number) => (
                                            <p key={uuid_v4()} className="text text_type_digits-default text_color_success">
                                                {getOrderNumberForCard(number)}
                                            </p>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={style.listByStatus}>
                            <p className="text text_type_main-medium">В работе:</p>
                            <div className={style.numberList}>
                                {pendingOrderNumbers.map((chunk, index) => (
                                    <div key={`pending-chunk-${index}`} className={style.numberList}>
                                        {chunk.map((number) => (
                                            <p key={uuid_v4()} className="text text_type_digits-default">
                                                {getOrderNumberForCard(number)}
                                            </p>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text text_type_main-medium">Выполнено за всё время:</p>
                        <p className="text text_type_digits-large">{feedInfo.total}</p>
                    </div>
                    <div>
                        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                        <p className="text text_type_digits-large">{feedInfo.totalToday}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderFeed;