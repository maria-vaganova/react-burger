import profile from './Profile.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {ChangeEvent, useEffect, useState} from "react";
import LeftProfileLinks from "../../components/left-profile-links/LeftProfileLinks";

function Profile() {
    const previousName = "";
    const previousEmail = "";
    const previousPassword = "";

    const [hasChanges, setChanges] = useState<boolean>(false);

    const [name, setName] = useState<string>(previousName)
    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const [email, setEmail] = useState<string>(previousEmail)
    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const [password, setPassword] = useState<string>(previousPassword)
    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    useEffect(() => {
        if (name === previousName && email === previousEmail && password === previousPassword)
            setChanges(false);
        else setChanges(true);
    }, [name, email, password]);

    const handleSubmit = () => {
        // реализация будет позже
    }

    const handleReset = () => {
        setName(previousName);
        setEmail(previousEmail);
        setPassword(previousPassword);
        setChanges(false);
    }

    return (
        <div className={profile.content}>
            <LeftProfileLinks/>
            <form className={profile.centerItems} onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                <Input
                    type={'text'}
                    onChange={onNameChange}
                    value={name}
                    placeholder={"Имя"}
                    extraClass={"mb-2"}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                />
                <EmailInput
                    onChange={onEmailChange}
                    value={email}
                    placeholder={"Логин"}
                    isIcon={true}
                    extraClass="mb-2"
                />
                <PasswordInput
                    onChange={onPasswordChange}
                    value={password}
                    placeholder={"Пароль"}
                    icon="EditIcon"
                />
                <div className={hasChanges ? profile.justButtons : profile.hiddenButtons}>
                    <Button htmlType="reset" type="secondary" size="medium" disabled={!hasChanges} onClick={handleReset}>
                        Отмена
                    </Button>
                    <Button htmlType="submit" type="primary" size="medium" disabled={!hasChanges}>
                        Сохранить
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Profile;