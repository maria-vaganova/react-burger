import style from './Orders.module.css';
import NotFound404 from "../not-found/NotFound404";
import LeftProfileLinks from "../../components/left-profile-links/LeftProfileLinks";

function Orders() {
    return (
        <div className={style.content}>
            <LeftProfileLinks/>
            <div className={style.centerItems}>
                <NotFound404/>
            </div>
        </div>
    );
}

export default Orders;