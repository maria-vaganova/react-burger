import Modal from "../modal/Modal";
import Done from "../../images/done.svg";
import orderDetails from './OrderDetails.module.css';
import {OrderInfo} from "../../utils/types";

export interface OrderDetailsProps {
    isOpen: boolean,
    closeModal: () => void,
    orderInfo: OrderInfo
}

function OrderDetails({isOpen, closeModal, orderInfo}: OrderDetailsProps) {
    const number = orderInfo ? orderInfo.order.number : 0;
    console.log("orderInfo - ", orderInfo);
    return (
        <div>
            {isOpen && (
                <Modal onClose={closeModal}>
                    <div className={orderDetails.content}>
                        <p className="text text_type_digits-large">{number}</p>
                        <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
                        <img alt={"Done"} src={Done} className={"mt-15 mb-15"}/>
                        <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
                        <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на
                            орбитальной станции</p>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default OrderDetails;
