import {useContext} from 'react';
import Modal from "../modal/Modal";
import Done from "../../images/done.svg";
import orderDetails from './OrderDetails.module.css';
import {OrderNumberContext} from "../../services/appContext";

export interface OrderDetailsProps {
    isOpen: boolean,
    closeModal: () => void
}

function OrderDetails({isOpen, closeModal}: OrderDetailsProps) {
    const orderNumber = useContext(OrderNumberContext);
    return (
        <div>
            {isOpen && (
                <Modal onClose={closeModal}>
                    <div className={orderDetails.content}>
                        <p className="text text_type_digits-large">{orderNumber.orderNumber}</p>
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
