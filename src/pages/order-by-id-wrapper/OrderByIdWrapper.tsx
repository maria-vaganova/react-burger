import {useLocation} from "react-router-dom";
import Modal from "../../components/modal/Modal";
import OrderById from "../../components/order-by-id/OrderById";
import Orders from "../orders/Orders";

function OrderByIdWrapper() {
    const location = useLocation();
    const background = location.state?.background;

    console.log("Background:", background);

    if (!background) {
        return (
            <div>
                <OrderById isModal={false}/>
            </div>
        );
    }

    return (
        <>
            <Orders/>
            <Modal onClose={(): void => window.history.back()}>
                <OrderById isModal={true}/>
            </Modal>
        </>
    );
}

export default OrderByIdWrapper;