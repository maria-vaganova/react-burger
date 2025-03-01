import notFound from './NotFound404.module.css';
import PageNotFound from "../../images/404.svg";

function NotFound404() {
    return (
        <div className={notFound.main}>
            <img alt={"PageNotFound"} src={PageNotFound}/>
            <p className="text text_type_main-large mt-10">
                Страница не найдена
            </p>
        </div>
    );
}

export default NotFound404;