import styles from './not-found.module.css';
import PageNotFound from "../../images/404.svg";

function NotFound404() {
    return (
        <div className={styles.main}>
            <img alt={"PageNotFound"} src={PageNotFound}/>
        </div>
    );
}

export default NotFound404;