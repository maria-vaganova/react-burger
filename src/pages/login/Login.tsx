import login from '../Authorization.module.css';
import {EmailInput, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {ChangeEvent, useEffect, useState} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {
    loginStateToProps,
    useAppSelector,
    useLoginDispatch
} from "../../services/store";
import {IUserToLogIn} from "../../utils/types";
import {EMPTY_AUTHORIZATION_INFO, EMPTY_SERVER_INFO} from "../../utils/data";
import {getLogin, TLoginActions} from "../../services/actions/loginActions";
import {Dispatch} from "redux";
import WarningModal from "../../components/modal/WarningModal";

function Login() {
    const [email, setEmail] = useState<string>('')
    const onEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value)
    }
    const [password, setPassword] = useState<string>('')
    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value)
    }

    const [modalMessage, setModalMessage] = useState("");
    const [isMessageModalOpen, setMessageModalOpen] = useState(false);

    const openMessageModal = (message: string): void => {
        setModalMessage(message);
        setMessageModalOpen(true);
    };

    const closeMessageModal = (): void => {
        setMessageModalOpen(false);
        setModalMessage("");
    };

    const dispatchLogin = useLoginDispatch();
    const {loginRequest, loginFailed, loginInfo, loginMessage} = useAppSelector(loginStateToProps);
    const handleLogin = (): void => {
        const user: IUserToLogIn = {email: email, password: password};
        const getLoginThunk: (dispatch: Dispatch<TLoginActions>) => Promise<void> = getLogin(user);
        dispatchLogin(getLoginThunk);
    };

    const navigate = useNavigate();
    const location = useLocation();

    useEffect((): void => {
        if (loginFailed) {
            let message: string = "Ошибка сети";
            if (loginMessage !== EMPTY_SERVER_INFO) {
                message += ": " + loginMessage.message;
            }
            openMessageModal(message);
        } else if (!loginRequest && loginInfo !== EMPTY_AUTHORIZATION_INFO) {
            const targetPath: string = location.state?.from?.pathname || '/';
            if (location.pathname !== targetPath)
                navigate(targetPath);
        }
    }, [loginFailed, loginRequest, loginInfo, loginMessage, navigate]);

    return (
        <div>
            {isMessageModalOpen && (
                <WarningModal closeModal={closeMessageModal} message={modalMessage}/>
            )}
            <div className={login.content}>
                <p className="text text_type_main-medium">
                    Вход
                </p>
                <form className={login.form}
                      onSubmit={(e): void => {
                          e.preventDefault();
                          handleLogin();
                      }}>
                    <EmailInput
                        onChange={onEmailChange}
                        value={email}
                        placeholder={"E-mail"}
                        isIcon={false}
                        extraClass={"mb-3 mt-6"}
                        name={"email"}
                    />
                    <PasswordInput
                        onChange={onPasswordChange}
                        value={password}
                        placeholder={"Пароль"}
                        extraClass={"mb-6 mt-3"}
                        name={"password"}
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
        </div>
    );
}

export default Login;