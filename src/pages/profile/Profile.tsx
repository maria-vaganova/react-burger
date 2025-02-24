import profile from './Profile.module.css';
import {EmailInput, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {ChangeEvent, useState} from "react";

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


    return (
        <div className={profile.content}>
            <div className={profile.leftItems}>
                <a className={"text text_type_main-large " + profile.leftItem}>
                    Профиль
                </a>
                <a className={"text text_type_main-large text_color_inactive " + profile.leftItem}>
                    История заказов
                </a>
                <a className={"text text_type_main-large text_color_inactive " + profile.leftItem}>
                    Выход
                </a>
                <a className={"text text_type_main-default text_color_inactive mt-20"}>
                    В этом разделе вы можете изменить свои персональные данные
                </a>
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