import forgotStyles from './ForgotPassword.module.css';
import {EmailInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {ChangeEvent, useState} from "react";

function ForgotPassword() {
    const [email, setEmail] = useState<string>('')
    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    return (
        <div className={forgotStyles.content}>
            <p className="text text_type_main-medium">
                Восстановление пароля
            </p>
            <EmailInput
                onChange={onEmailChange}
                value={email}
                placeholder={"Укажите e-mail"}
                isIcon={false}
                extraClass={"mb-3 mt-3"}
            />
            <Button htmlType="button" type="primary" size="medium" extraClass={""}>
                Восстановить
            </Button>
            <div className={"mt-20"}>
                <a className={"text text_type_main-default text_color_inactive mr-2"}>
                    Вспомнили пароль?
                </a>
                <a className={"text text_type_main-default text_color_accent"}>
                    Войти
                </a>
            </div>
        </div>
    );
}

export default ForgotPassword;