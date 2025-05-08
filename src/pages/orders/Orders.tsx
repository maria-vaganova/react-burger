import style from './Orders.module.css';
import LeftProfileLinks from "../../components/left-profile-links/LeftProfileLinks";
import {IFeedInfo, IOrderFeedInfo} from "../../utils/types";
import OrderCard from "../../components/order-card/OrderCard";
import {useEffect, useState} from "react";
import {BASE_SOCKET_ID, EMPTY_FEED, EMPTY_SERVER_INFO} from "../../utils/data";
import {
    RootState,
    SocketActions,
    tokenStateToProps,
    useAppSelector,
    useGetAccessTokenDispatch,
    useLoadingDispatch,
    useSocketDispatch
} from "../../services/store";
import {Dispatch} from "redux";
import {getAccessToken, TGetAccessTokenActions} from "../../services/actions/tokenActions";
import {startLoading, stopLoading} from "../../services/actions/loadingActions";
import WarningModal from "../../components/modal/WarningModal";
import {startBaseSocket, stopBaseSocket} from "../../services/actions/socketActions";

function Orders() {
    const [currentToken, setCurrentToken] = useState<string>("");
    const [orderData, setOrderData] = useState<IFeedInfo>(EMPTY_FEED);

    useEffect(() => {
        handleGetAccessToken()
    }, []);

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
    const socketDispatch = useSocketDispatch();
    const {wsConnected, messages, error} = useAppSelector(
        (state: RootState) => state.websocket[BASE_SOCKET_ID] || {wsConnected: false}
    );
    const handleStartSocket = (): void => {
        const startSocketThunk: (dispatch: Dispatch<SocketActions>) => Promise<void> = startBaseSocket(currentToken);
        socketDispatch(startSocketThunk);
    };
    const handleStopSocket = (): void => {
        const stopSocketThunk: (dispatch: Dispatch<SocketActions>) => Promise<void> = stopBaseSocket();
        socketDispatch(stopSocketThunk);
    };

    useEffect(() => {
        if (messages) messages.map((msg: IFeedInfo) => (
            setOrderData(msg)
        ))
    }, [messages]);

    useEffect(() => {
        if (currentToken) handleStartSocket();
        return () => {
            handleStopSocket();
        };
    }, [currentToken, socketDispatch]);

    useEffect(() => {
        if (error) {
            openMessageModal('Ошибка вебсокета: ' + error);
            handleStopSocket();
        }
    }, [error, socketDispatch]);
    // websocket logic end

    return (
        <div>
            {isMessageModalOpen && (
                <WarningModal closeModal={closeMessageModal} message={modalMessage}/>
            )}
            <div className={style.content}>
                <div className={style.leftLinks}>
                    <LeftProfileLinks/>
                </div>
                <div className={style.scrollableContainer}>
                    <div className={style.centerItems}>
                        {orderData.orders.map((order: IOrderFeedInfo) => {
                            return (
                                <OrderCard key={order._id} isStatusShown={true} orderInfo={order}/>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orders;