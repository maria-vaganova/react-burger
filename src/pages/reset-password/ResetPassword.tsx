import resetStyles from '../Authorization.module.css';
import {Button, PasswordInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {ChangeEvent, useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {passwordStateToProps, useAppSelector, usePostPasswordDispatch} from "../../services/store";
import {getNewPassword} from "../../services/actions/passwordActions";
import {EMPTY_SERVER_INFO} from "../../utils/data";
import {ResetPasswordInfo} from "../../utils/types";

function ResetPassword() {
    const [password, setPassword] = useState<string>('')
    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const [code, setCode] = useState<string>('')
    const onCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value)
    }

    const navigate = useNavigate();
    const visitedForgotPassword = sessionStorage.getItem('forgotPasswordVisited') === 'true';
    useEffect(() => {
        if (!visitedForgotPassword)
            navigate("/forgot-password");
    }, [visitedForgotPassword]);

    const {passwordRequest, passwordFailed, passwordMessage} = useAppSelector(passwordStateToProps);
    const dispatchResetPassword = usePostPasswordDispatch();
    const handleResetPassword = () => {
        const data: ResetPasswordInfo = {token: code, password: password};
        const getResetPasswordThunk = getNewPassword(data);
        dispatchResetPassword(getResetPasswordThunk);
    };

    useEffect(() => {
        if (code !== "")
            if (passwordFailed) {
                let message: string = "Ошибка сети";
                if (passwordMessage !== EMPTY_SERVER_INFO) {
                    message += ": " + passwordMessage.message;
                }
                alert(message);
            } else if (!passwordRequest && passwordMessage.success) {
                sessionStorage.setItem('forgotPasswordVisited', 'false');
                navigate("/login");
            }
    }, [passwordFailed, passwordRequest, passwordMessage, navigate]);

    return (
        <div className={resetStyles.content}>
            <p className="text text_type_main-medium">
                Восстановление пароля
            </p>
            <form className={resetStyles.form} onSubmit={(e) => {
                e.preventDefault();
                handleResetPassword();
            }}>
                <PasswordInput
                    onChange={onPasswordChange}
                    value={password}
                    name={'Введите новый пароль'}
                    extraClass={"mb-3 mt-6"}
                />
                <Input
                    type={"text"}
                    onChange={onCodeChange}
                    value={code}
                    placeholder={"Введите код из письма"}
                    extraClass={"mb-6 mt-3"}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                />
                <Button htmlType="submit" type="primary" size="medium" extraClass={""}>
                    Сохранить
                </Button>
            </form>
            <div className={"mt-20"}>
                <a className={"text text_type_main-default text_color_inactive mr-2"}>
                    Вспомнили пароль?
                </a>
                <NavLink to={"/login"}
                         className={"text text_type_main-default text_color_accent " + resetStyles.navLink}>
                    Войти
                </NavLink>
            </div>
        </div>
    );
}

export default ResetPassword;