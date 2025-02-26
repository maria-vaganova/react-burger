import profile from './Profile.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {ChangeEvent, useEffect, useState} from "react";
import LeftProfileLinks from "../../components/left-profile-links/LeftProfileLinks";
import {
    tokenStateToProps,
    useAppSelector, useGetAccessTokenDispatch,
    useGetUserDispatch,
    userStateToProps,
    useSetUserDispatch
} from "../../services/store";
import {UserAuthorization} from "../../utils/types";
import {getUserInfo, setUserInfo} from "../../services/actions/userActions";
import {EMPTY_SERVER_INFO} from "../../utils/data";
import {getAccessToken} from "../../services/actions/tokenActions";

function Profile() {
    const [currentToken, setCurrentToken] = useState<string>("");
    const [retrying, setRetrying] = useState(false); // only one retry
    const [lastAction, setLastAction] = useState<'get' | 'submit' | null>(null);

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

    const {tokenRequest, tokenFailed, tokenInfo, tokenMessage} = useAppSelector(tokenStateToProps);
    const dispatchGetAccessToken = useGetAccessTokenDispatch();
    const handleGetAccessToken = () => {
        const getAccessTokenThunk = getAccessToken();
        dispatchGetAccessToken(getAccessTokenThunk);
    };

    useEffect(() => {
        if (tokenFailed) {
            let message: string = "tokenFailed Ошибка сети";
            if (tokenMessage !== EMPTY_SERVER_INFO) {
                message += ": " + tokenMessage.message;
            }
            alert(message);
        } else if (!tokenRequest && tokenInfo.success) {
            setCurrentToken(tokenInfo.accessToken);
        }
    }, [tokenRequest, tokenFailed, tokenInfo, tokenMessage]);

    const {userRequest, userFailed, userInfo, userMessage} = useAppSelector(userStateToProps);

    const dispatchGetUser = useGetUserDispatch();
    const handleGetUser = () => {
        setLastAction("get")
        const getUserInfoThunk = getUserInfo(currentToken);
        dispatchGetUser(getUserInfoThunk);
    };

    const dispatchSetUser = useSetUserDispatch();
    const handleSubmit = () => {
        setLastAction("submit")
        const user: UserAuthorization = {email: email, password: password, name: name};
        const setUserInfoThunk = setUserInfo(user, currentToken);
        dispatchSetUser(setUserInfoThunk);
    };

    useEffect(() => {
        if (!currentToken || currentToken === "") {
            handleGetAccessToken();
        } else {
            handleGetUser();
        }
    }, []);

    useEffect(() => {
        if (userFailed && (userMessage?.message === "jwt expired" || userMessage?.message === "You should be authorised")) {
            const retryFunction = lastAction === 'get' ? handleGetUser : handleSubmit;
            if (retryFunction) {
                retryWithNewToken(retryFunction);
            }
        }
    }, [userFailed, userMessage]);

    useEffect(() => {
        if (userFailed && userMessage?.message !== "jwt expired") {
            let message: string = "userFailed Ошибка сети";
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

    const retryWithNewToken = async (requestFunction: () => void) => {
        if (retrying) return;
        setRetrying(true);

        try {
            await handleGetAccessToken();
            requestFunction();
        } catch (error) {
            alert("Не удалось обновить данные. Пожалуйста, попробуйте позже.");
        } finally {
            setRetrying(false);
        }
    };

    const [hasChanges, setChanges] = useState<boolean>(false);

    const handleReset = () => {
        setName(previousName);
        setEmail(previousEmail);
        setPassword(previousPassword);
        setChanges(false);
    }

    useEffect(() => {
        if (name === previousName && email === previousEmail && password === previousPassword)
            setChanges(false);
        else setChanges(true);
    }, [name, email, password]);

    useEffect(() => {
        handleReset();
    }, [previousName, previousEmail, previousPassword]);

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