import forgotStyles from '../Authorization.module.css';
import {EmailInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {ChangeEvent, useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {
    passwordStateToProps,
    useAppSelector,
    usePostPasswordDispatch
} from "../../services/store";
import {askToResetPassword, TPostPasswordActions} from "../../services/actions/passwordActions";
import {EMPTY_SERVER_INFO, FORGOT_PASSWORD_VISITED_TAG} from "../../utils/data";
import {Dispatch} from "redux";

function ForgotPassword() {
    const [email, setEmail] = useState<string>('')
    const onEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value)
    }

    const {passwordRequest, passwordFailed, passwordMessage} = useAppSelector(passwordStateToProps);
    const dispatchResetPassword = usePostPasswordDispatch();
    const handleResetPassword = (): void => {
        const getResetPasswordThunk: (dispatch: Dispatch<TPostPasswordActions>) => Promise<void> = askToResetPassword(email);
        dispatchResetPassword(getResetPasswordThunk);
    };

    const navigate = useNavigate();

    useEffect((): void => {
        sessionStorage.setItem(FORGOT_PASSWORD_VISITED_TAG, 'false');
    }, []);

    useEffect((): void => {
        if (passwordFailed) {
            let message: string = "Ошибка сети";
            if (passwordMessage !== EMPTY_SERVER_INFO) {
                message += ": " + passwordMessage.message;
            }
            alert(message);
        } else if (!passwordRequest && passwordMessage.success) {
            sessionStorage.setItem(FORGOT_PASSWORD_VISITED_TAG, 'true');
            navigate("/reset-password");
        }
    }, [passwordFailed, passwordRequest, passwordMessage, navigate]);

    return (
        <div className={forgotStyles.content}>
            <p className="text text_type_main-medium">
                Восстановление пароля
            </p>
            <form className={forgotStyles.form} onSubmit={(e): void => {
                e.preventDefault();
                handleResetPassword();
            }}>
                <EmailInput
                    onChange={onEmailChange}
                    value={email}
                    placeholder={"Укажите e-mail"}
                    isIcon={false}
                    extraClass={"mb-6 mt-6"}
                />
                <Button htmlType="submit" type="primary" size="medium" extraClass={""}>
                    Восстановить
                </Button>
            </form>
            <div className={"mt-20"}>
                <a className={"text text_type_main-default text_color_inactive mr-2"}>
                    Вспомнили пароль?
                </a>
                <NavLink to={"/login"}
                         className={"text text_type_main-default text_color_accent " + forgotStyles.navLink}>
                    Войти
                </NavLink>
            </div>
        </div>
    );
}

export default ForgotPassword;