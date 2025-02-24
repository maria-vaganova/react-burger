import login from './Login.module.css';
import {EmailInput, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {ChangeEvent, useState} from "react";

function Login() {
    const [email, setEmail] = useState<string>('')
    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const [password, setPassword] = useState<string>('')
    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    return (
        <div className={login.content}>
            <p className="text text_type_main-medium">
                Вход
            </p>
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
                name={'password'}
                extraClass={"mb-6 mt-3"}
            />
            <Button htmlType="button" type="primary" size="medium" extraClass={""}>
                Войти
            </Button>
            <div className={"mt-20"}>
                <a className={"text text_type_main-default text_color_inactive mr-2"}>
                    Вы - новый пользователь?
                </a>
                <a className={"text text_type_main-default text_color_accent"}>
                    Зарегистрироваться
                </a>
            </div>
            <div className={"mt-4"}>
                <a className={"text text_type_main-default text_color_inactive mr-2"}>
                    Забыли пароль?
                </a>
                <a className={"text text_type_main-default text_color_accent"}>
                    Восстановить пароль
                </a>
            </div>
        </div>
    );
}

export default Login;