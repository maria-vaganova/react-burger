import {useEffect, useState} from "react";
import style from './OrderFeed.module.css';
import {IFeedInfo, IOrderFeedInfo} from "../../utils/types";
import OrderCard from "../../components/order-card/OrderCard";
import {v4 as uuid_v4} from "uuid";
import {chunkNumberArray, getOrderNumberForCard} from "../../utils/util";
import {
    RootState,
    tokenStateToProps,
    useAppSelector,
    useGetAccessTokenDispatch,
    useLoadingDispatch
} from "../../services/store";
import {Dispatch} from "redux";
import {getAccessToken, TGetAccessTokenActions} from "../../services/actions/tokenActions";
import {ALL_SOCKET_ID, ALL_WS, EMPTY_FEED, EMPTY_SERVER_INFO} from "../../utils/data";
import {startLoading, stopLoading} from "../../services/actions/loadingActions";
import {useDispatch, useSelector} from "react-redux";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../../services/actions/wsActionTypes";
import WarningModal from "../../components/modal/WarningModal";

function OrderFeed() {
    const [currentToken, setCurrentToken] = useState<string>("");
    const [orderData, setOrderData] = useState<IFeedInfo>(EMPTY_FEED);

    const [doneOrderNumbers, setDoneOrderNumbers] = useState<number[][]>([]);
    const [pendingOrderNumbers, setPendingOrderNumbers] = useState<number[][]>([]);

    useEffect(() => {
        handleGetAccessToken()
    }, []);

    useEffect(() => {
        const doneOrders: number[] = orderData.orders
            .filter((order: IOrderFeedInfo) => order.status === 'done')
            .map((order: IOrderFeedInfo) => order.number);
        const pendingOrders: number[] = orderData.orders
            .filter((order: IOrderFeedInfo) => order.status === 'pending')
            .map((order: IOrderFeedInfo) => order.number);

        const doneChunks: number[][] = chunkNumberArray(doneOrders, 10);
        const pendingChunks: number[][] = chunkNumberArray(pendingOrders, 10);

        setDoneOrderNumbers(doneChunks);
        setPendingOrderNumbers(pendingChunks);
    }, [orderData])

    const [modalMessage, setModalMessage] = useState("");
    const [isMessageModalOpen, setMessageModalOpen] = useState(false);

    const openMessageModal = (message: string): void => {
        setModalMessage(message);
        setMessageModalOpen(true);
    };

    const closeMessageModal = (): void => {
        setMessageModalOpen(false);
        setModalMessage("");
    };

    const dispatchLoading = useLoadingDispatch();

    const {tokenRequest, tokenFailed, tokenInfo, tokenMessage} = useAppSelector(tokenStateToProps);
    const dispatchGetAccessToken = useGetAccessTokenDispatch();
    const handleGetAccessToken = (): void => {
        const getAccessTokenThunk: (dispatch: Dispatch<TGetAccessTokenActions>) => Promise<void> = getAccessToken();
        dispatchGetAccessToken(getAccessTokenThunk);

    };

    useEffect((): void => {
        if (tokenFailed) {
            let message: string = "Ошибка сети";
            if (tokenMessage !== EMPTY_SERVER_INFO) {
                message += ": " + tokenMessage.message;
            }
            dispatchLoading(stopLoading());
            openMessageModal(message);
        } else if (tokenRequest) {
            dispatchLoading(startLoading());
        } else if (!tokenRequest && tokenInfo.success) {
            dispatchLoading(stopLoading());
            setCurrentToken(tokenInfo.accessToken);
        }
    }, [tokenRequest, tokenFailed, tokenInfo, tokenMessage]);

    // websocket logic start
    const dispatch = useDispatch();
    const socketId = ALL_SOCKET_ID;
    const {wsConnected, messages, error} = useSelector(
        (state: RootState) => state.websocket[socketId] || {wsConnected: false}
    );

    useEffect(() => {
        if (messages) messages.map((msg: IFeedInfo) => (
            setOrderData(msg)
        ))
    }, [messages]);

    useEffect(() => {
        if (currentToken)
            dispatch({
                type: WS_CONNECTION_START,
                payload: {url: ALL_WS, accessToken: currentToken.replace("Bearer ", "")},
                socketId,
            });

        return () => {
            dispatch({type: WS_CONNECTION_CLOSED, payload: {code: 1000}, socketId});
        };
    }, [currentToken, dispatch]);

    useEffect(() => {
        if (error) {
            alert('Ошибка вебсокета: ' + error);
            dispatch({type: WS_CONNECTION_CLOSED, payload: {code: 1000}, socketId});
        }
    }, [error, dispatch]);
    // websocket logic end

    return (
        <div>
            {isMessageModalOpen && (
                <WarningModal closeModal={closeMessageModal} message={modalMessage}/>
            )}
            <div className={style.title}>
                <h1 className="text_type_main-large">Лента заказов</h1>
            </div>
            <div className={style.content}>
                <div className={style.leftItems}>
                    <div className={style.scrollableContainer}>
                        <div className={style.orderCardList}>
                            {orderData.orders.map((order: IOrderFeedInfo) => {
                                return (
                                    <OrderCard key={uuid_v4()} isStatusShown={false} orderInfo={order}/>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className={style.rightItems}>
                    <div className={style.scrollableContainer}>
                        <div className={style.statusData}>
                            <div className={style.statuses}>
                                <div className={style.listByStatus}>
                                    <p className="text text_type_main-medium">Готовы:</p>
                                    <div className={style.numberListContainer}>
                                        {doneOrderNumbers.map((chunk, index) => (
                                            <div key={`done-chunk-${index}`} className={style.numberList}>
                                                {chunk.map((number) => (
                                                    <p key={uuid_v4()}
                                                       className="text text_type_digits-default text_color_success">
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
                                <p className="text text_type_digits-large">{orderData.total}</p>
                            </div>
                            <div>
                                <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                                <p className="text text_type_digits-large">{orderData.totalToday}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderFeed;