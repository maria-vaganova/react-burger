import style from './Orders.module.css';
import LeftProfileLinks from "../../components/left-profile-links/LeftProfileLinks";
import {IFeedInfo, IOrderFeedInfo} from "../../utils/types";
import OrderCard from "../../components/order-card/OrderCard";
import {useEffect, useState} from "react";
import {BASE_SOCKET_ID, BASE_WS, EMPTY_FEED, EMPTY_SERVER_INFO} from "../../utils/data";
import {
    RootState,
    tokenStateToProps,
    useAppSelector,
    useGetAccessTokenDispatch,
    useLoadingDispatch
} from "../../services/store";
import {Dispatch} from "redux";
import {getAccessToken, TGetAccessTokenActions} from "../../services/actions/tokenActions";
import {startLoading, stopLoading} from "../../services/actions/loadingActions";
import {useDispatch, useSelector} from "react-redux";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../../services/actions/wsActionTypes";
import WarningModal from "../../components/modal/WarningModal";

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
    const dispatch = useDispatch();
    const socketId = BASE_SOCKET_ID;
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
                payload: {url: BASE_WS, accessToken: currentToken.replace("Bearer ", "")},
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