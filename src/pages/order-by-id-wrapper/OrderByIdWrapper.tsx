import {useLocation} from "react-router-dom";
import Modal from "../../components/modal/Modal";
import OrderById from "../../components/order-by-id/OrderById";
import Orders from "../orders/Orders";
import OrderFeed from "../order-feed/OrderFeed";

function OrderByIdWrapper() {
    const location = useLocation();
    const background = location.state?.background;

    if (!background) {
        return (
            <div>
                <OrderById isModal={false}/>
            </div>
        );
    }

    return (
        <>
            {(background.pathname === "/feed") && <OrderFeed/>}
            {(background.pathname === "/profile/orders") && <Orders/>}
            <Modal onClose={(): void => window.history.back()}>
                <OrderById isModal={true}/>
            </Modal>
        </>
    );
}

export default OrderByIdWrapper;