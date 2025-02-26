import profile from './Profile.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {ChangeEvent, useEffect, useState} from "react";
import LeftProfileLinks from "../../components/left-profile-links/LeftProfileLinks";
import {
    useAppSelector,
    useGetUserDispatch,
    userStateToProps,
    useSetUserDispatch
} from "../../services/store";
import {UserAuthorization} from "../../utils/types";
import {getUserInfo, setUserInfo} from "../../services/actions/userActions";
import {EMPTY_SERVER_INFO} from "../../utils/data";

function Profile() {
    const token: string = "";

    const [previousName, setPreviousName] = useState<string>("");
    const [previousEmail, setPreviousEmail] = useState<string>("");
    const [previousPassword, setPreviousPassword] = useState<string>("");

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

    const {userRequest, userFailed, userInfo, userMessage} = useAppSelector(userStateToProps);

    const dispatchGetUser = useGetUserDispatch();
    const handleGetUser = () => {
        // initialize token
        const getUserInfoThunk = getUserInfo(token);
        dispatchGetUser(getUserInfoThunk);
    };

    const dispatchSetUser = useSetUserDispatch();
    const handleSubmit = () => {
        // initialize token
        const user: UserAuthorization = {email: email, password: password, name: name};
        const setUserInfoThunk = setUserInfo(user, token);
        dispatchSetUser(setUserInfoThunk);
    };

    useEffect(() => {
        handleGetUser();
    }, []);

    useEffect(() => {
        if (userFailed) {
            let message: string = "Ошибка сети";
            if (userMessage !== EMPTY_SERVER_INFO) {
                message += ": " + userMessage.message;
            }
            alert(message);
        } else if (!userRequest && userInfo.success) {
            setPreviousName(userInfo.user.name);
            setPreviousEmail(userInfo.user.email);
            setPreviousPassword(password);
        }
    }, [userRequest, userFailed, userInfo, userMessage]);

    const [hasChanges, setChanges] = useState<boolean>(false);

    useEffect(() => {
        if (name === previousName && email === previousEmail && password === previousPassword)
            setChanges(false);
        else setChanges(true);
    }, [name, email, password]);

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
                    type={"text"}
                    onChange={onNameChange}
                    value={name}
                    placeholder={"Имя"}
                    extraClass={"mb-2"}
                    icon={"EditIcon"}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                />
                <EmailInput
                    onChange={onEmailChange}
                    value={email}
                    placeholder={"Логин"}
                    isIcon={true}
                    extraClass={"mb-2"}
                />
                <PasswordInput
                    onChange={onPasswordChange}
                    value={password}
                    placeholder={"Пароль"}
                    icon={"EditIcon"}
                />
                <div className={hasChanges ? profile.justButtons : profile.hiddenButtons}>
                    <Button htmlType={"reset"} type={"secondary"} size={"medium"} disabled={!hasChanges}
                            onClick={handleReset}>
                        Отмена
                    </Button>
                    <Button htmlType={"submit"} type={"primary"} size={"medium"} disabled={!hasChanges}>
                        Сохранить
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Profile;