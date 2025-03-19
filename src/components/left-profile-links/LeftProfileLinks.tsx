import style from './LeftProfileLinks.module.css';
import {useEffect, useState} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {loginStateToProps, useAppSelector, useLogoutDispatch} from "../../services/store";
import {getLogout, TLogoutActions} from "../../services/actions/loginActions";
import {EMPTY_AUTHORIZATION_INFO, EMPTY_SERVER_INFO} from "../../utils/data";
import {Dispatch} from "redux";

function LeftProfileLinks() {
    const linkStyle: string = "text text_type_main-medium " + style.item;
    const navigate = useNavigate();
    const location = useLocation();

    const [sectionDescription, setSectionDescription] = useState<string>("");
    const [profileLinkStyle, setProfileLinkStyle] = useState<string>();
    const [ordersLinkStyle, setOrdersLinkStyle] = useState<string>();

    useEffect((): void => {
        switch (location.pathname) {
            case "/profile":
                setProfileLinkStyle(linkStyle + " text_color_primary");
                setOrdersLinkStyle(linkStyle + " text_color_inactive");
                setSectionDescription("В этом разделе вы можете изменить свои персональные данные");
                break;
            case "/profile/orders":
                setProfileLinkStyle(linkStyle + " text_color_inactive");
                setOrdersLinkStyle(linkStyle + " text_color_primary");
                setSectionDescription("В этом разделе вы можете просмотреть свою историю заказов");
                break;
            default:
                setSectionDescription("");
        }
    }, [location]);

    const dispatchLogout = useLogoutDispatch();
    const {loginRequest, loginFailed, loginInfo, loginMessage} = useAppSelector(loginStateToProps);
    const handleLogout = (): void => {
        const getLogoutThunk = getLogout();
        dispatchLogout(getLogoutThunk);
    };

    useEffect(() => {
        if (loginFailed) {
            let message: string = "Ошибка сети";
            if (loginMessage !== EMPTY_SERVER_INFO) {
                message += ": " + loginMessage.message;
            }
            alert(message);
        } else if (!loginRequest && loginInfo === EMPTY_AUTHORIZATION_INFO && loginMessage.success) {
            navigate('/login', {state: {from: location}});
        }
    }, [loginFailed, loginRequest, loginInfo, loginMessage, navigate]);

    return (
        <div className={style.content}>
            <NavLink to={"/profile"} className={profileLinkStyle}>
                Профиль
            </NavLink>
            <NavLink to={"/profile/orders"} className={ordersLinkStyle}>
                История заказов
            </NavLink>
            <a className={linkStyle + " text_color_inactive"} onClick={(e): void => {
                e.preventDefault();
                handleLogout();
            }}>
                Выход
            </a>
            <p className={"text text_type_main-default text_color_inactive mt-20"}>
                {sectionDescription}
            </p>
        </div>
    );
}

export default LeftProfileLinks;