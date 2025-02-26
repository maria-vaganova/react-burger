import profile from './Profile.module.css';
import {EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {ChangeEvent, useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {loginStateToProps, useAppSelector, useLogoutDispatch} from "../../services/store";
import {UserToLogIn} from "../../utils/types";
import {getLogout} from "../../services/actions/loginActions";
import {EMPTY_AUTHORIZATION_INFO, EMPTY_SERVER_INFO} from "../../utils/data";

function Profile() {
    const [name, setName] = useState<string>('')
    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const [email, setEmail] = useState<string>('')
    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const [password, setPassword] = useState<string>('')
    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const customStyle = "text text_type_main-medium " + profile.leftItem;
    const navigate = useNavigate();

    const dispatchLogout = useLogoutDispatch();
    const {loginRequest, loginFailed, loginInfo, loginMessage} = useAppSelector(loginStateToProps);
    const handleLogout = () => {
        const user: UserToLogIn = {email: email, password: password};
        const getLogoutThunk = getLogout(user);
        dispatchLogout(getLogoutThunk);
    };

    useEffect(() => {
        if (loginFailed) {
            let message: string = "Ошибка сети";
            if (loginMessage !== EMPTY_SERVER_INFO) {
                message += ": " + loginMessage.message;
            }
            alert(message);
        } else if (!loginRequest && loginInfo !== EMPTY_AUTHORIZATION_INFO) {
            navigate('/login');
        }
    }, [loginFailed, loginRequest, loginInfo, loginMessage, navigate]);

    return (
        <div className={profile.content}>
            <div className={profile.leftItems}>
                <NavLink to={"/profile"}
                         className={({isActive}) => customStyle + (isActive ? " text_color_primary" : " text_color_inactive")}>
                    Профиль
                </NavLink>
                <NavLink to={"/profile/orders"}
                         className={({isActive}) => customStyle + (isActive ? " text_color_primary" : " text_color_inactive")}>
                    История заказов
                </NavLink>
                <a className={"text text_type_main-medium text_color_inactive " + profile.leftItem} onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                }}>
                    Выход
                </a>
                <p className={"text text_type_main-default text_color_inactive mt-20"}>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
            <div className={profile.centerItems}>
                <EmailInput
                    onChange={onNameChange}
                    value={name}
                    placeholder="Имя"
                    isIcon={true}
                    extraClass="mb-2"
                />
                <EmailInput
                    onChange={onEmailChange}
                    value={email}
                    placeholder="Логин"
                    isIcon={true}
                    extraClass="mb-2"
                />
                <PasswordInput
                    onChange={onPasswordChange}
                    value={password}
                    name={'Пароль'}
                    icon="EditIcon"
                />
            </div>
        </div>
    );
}

export default Profile;