import resetStyles from '../Authorization.module.css';
import {EmailInput, Button, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {ChangeEvent, useState} from "react";
import {NavLink} from "react-router-dom";

function ResetPassword() {
    const [password, setPassword] = useState<string>('')
    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const [code, setCode] = useState<string>('')
    const onCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value)
    }

    return (
        <div className={resetStyles.content}>
            <p className="text text_type_main-medium">
                Восстановление пароля
            </p>
            <PasswordInput
                onChange={onPasswordChange}
                value={password}
                name={'Введите новый пароль'}
                extraClass={"mb-3 mt-6"}
            />
            <EmailInput
                onChange={onCodeChange}
                value={code}
                placeholder={"Введите код из письма"}
                isIcon={false}
                extraClass={"mb-6 mt-3"}
            />
            <Button htmlType="button" type="primary" size="medium" extraClass={""}>
                Сохранить
            </Button>
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