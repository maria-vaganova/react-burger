import register from './Register.module.css';
import {EmailInput, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {ChangeEvent, useState} from "react";

function Register() {
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

    return (
        <div className={register.content}>
            <p className="text text_type_main-medium">
                Регистрация
            </p>
            <EmailInput
                onChange={onNameChange}
                value={name}
                placeholder={"Имя"}
                isIcon={false}
                extraClass={"mb-3 mt-6"}
            />
            <EmailInput
                onChange={onEmailChange}
                value={email}
                placeholder={"E-mail"}
                isIcon={false}
                extraClass={"mb-3 mt-3"}
            />
            <PasswordInput
                onChange={onPasswordChange}
                value={password}
                name={'password'}
                extraClass={"mb-6 mt-3"}
            />
            <Button htmlType="button" type="primary" size="medium" extraClass={""}>
                Зарегистрироваться
            </Button>
            <div className={"mt-20"}>
                <a className={"text text_type_main-default text_color_inactive mr-2"}>
                    Уже зарегистрированы?
                </a>
                <a className={"text text_type_main-default text_color_accent"}>
                    Войти
                </a>
            </div>
        </div>
    );
}

export default Register;