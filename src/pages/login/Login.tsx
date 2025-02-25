import login from '../Authorization.module.css';
import {EmailInput, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {ChangeEvent, useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {
    loginStateToProps,
    useAppSelector,
    useLoginDispatch
} from "../../services/store";
import {UserToLogIn} from "../../utils/types";
import {EMPTY_AUTHORIZATION_INFO} from "../../utils/data";
import {getLogin} from "../../services/actions/loginActions";

function Login() {
    const [email, setEmail] = useState<string>('')
    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const [password, setPassword] = useState<string>('')
    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const dispatchLogin = useLoginDispatch();
    const {loginRequest, loginFailed, loginInfo} = useAppSelector(loginStateToProps);
    const handleLogin = () => {
        const user: UserToLogIn = {email: email, password: password};
        const getLoginThunk = getLogin(user);
        dispatchLogin(getLoginThunk);
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (loginFailed) {
            let message: string = "Ошибка сети";
            if (loginInfo && 'message' in loginInfo) {
                message += ": " + loginInfo.message;
            }
            alert(message);
        } else if (!loginRequest && loginInfo !== EMPTY_AUTHORIZATION_INFO) {
            navigate('/');
        }
    }, [loginFailed, loginRequest, loginInfo, navigate]);

    return (
        <div className={login.content}>
            <p className="text text_type_main-medium">
                Вход
            </p>
            <form className={login.form}
                  onSubmit={(e) => {
                      e.preventDefault();
                      handleLogin();
                  }}>
                <EmailInput
                    onChange={onEmailChange}
                    value={email}
                    placeholder={"E-mail"}
                    isIcon={false}
                    extraClass={"mb-3 mt-6"}
                />
                <PasswordInput
                    onChange={onPasswordChange}
                    value={password}
                    placeholder={"Пароль"}
                    extraClass={"mb-6 mt-3"}
                />
                <Button htmlType="submit" type="primary" size="medium">
                    Войти
                </Button>
            </form>
            <div className={"mt-20"}>
                <a className={"text text_type_main-default text_color_inactive mr-2"}>
                    Вы - новый пользователь?
                </a>
                <NavLink to={"/register"}
                         className={"text text_type_main-default text_color_accent " + login.navLink}>
                    Зарегистрироваться
                </NavLink>
            </div>
            <div className={"mt-4"}>
                <a className={"text text_type_main-default text_color_inactive mr-2"}>
                    Забыли пароль?
                </a>
                <NavLink to={"/forgot-password"}
                         className={"text text_type_main-default text_color_accent " + login.navLink}>
                    Восстановить пароль
                </NavLink>
            </div>
        </div>
    );
}

export default Login;