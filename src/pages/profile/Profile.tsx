import profile from './Profile.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {ChangeEvent, useEffect, useState} from "react";
import LeftProfileLinks from "../../components/left-profile-links/LeftProfileLinks";
import {
    tokenStateToProps,
    useAppSelector, useGetAccessTokenDispatch,
    useGetUserDispatch, useLoadingDispatch,
    userStateToProps,
    useSetUserDispatch
} from "../../services/store";
import {IUserAuthorization} from "../../utils/types";
import {getUserInfo, setUserInfo, TSetUserActions} from "../../services/actions/userActions";
import {EMPTY_SERVER_INFO} from "../../utils/data";
import {getAccessToken, TGetAccessTokenActions} from "../../services/actions/tokenActions";
import {Dispatch} from "redux";
import WarningModal from "../../components/modal/WarningModal";
import {startLoading, stopLoading} from "../../services/actions/loadingActions";

function Profile() {
    const [modalMessage, setModalMessage] = useState("");
    const [isMessageModalOpen, setMessageModalOpen] = useState(false);

    const openMessageModal = (message: string): void => {
        setModalMessage(message);
        setMessageModalOpen(true);
    };

    const closeMessageModal = (): void => {
        setMessageModalOpen(false);
        setModalMessage("");
    };

    const [currentToken, setCurrentToken] = useState<string>("");
    const [retrying, setRetrying] = useState(false); // only one retry
    const [lastAction, setLastAction] = useState<'get' | 'submit' | null>(null);

    const [previousName, setPreviousName] = useState<string>("");
    const [previousEmail, setPreviousEmail] = useState<string>("");
    const [previousPassword, setPreviousPassword] = useState<string>("");

    const [name, setName] = useState<string>(previousName)
    const onNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value)
    }
    const [email, setEmail] = useState<string>(previousEmail)
    const onEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value)
    }
    const [password, setPassword] = useState<string>(previousPassword)
    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value)
    }

    const {tokenRequest, tokenFailed, tokenInfo, tokenMessage} = useAppSelector(tokenStateToProps);
    const dispatchGetAccessToken = useGetAccessTokenDispatch();
    const handleGetAccessToken = (): void => {
        const getAccessTokenThunk: (dispatch: Dispatch<TGetAccessTokenActions>) => Promise<void> = getAccessToken();
        dispatchGetAccessToken(getAccessTokenThunk);
    };

    const dispatchLoading = useLoadingDispatch();

    useEffect((): void => {
        if (tokenFailed) {
            let message: string = "Ошибка сети";
            if (tokenMessage !== EMPTY_SERVER_INFO) {
                message += ": " + tokenMessage.message;
            }
            dispatchLoading(stopLoading());
            openMessageModal(message);
        } else if (tokenRequest) {
            dispatchLoading(startLoading());
        } else if (!tokenRequest && tokenInfo.success) {
            dispatchLoading(stopLoading());
            setCurrentToken(tokenInfo.accessToken);
        }
    }, [tokenRequest, tokenFailed, tokenInfo, tokenMessage]);

    const {userRequest, userFailed, userInfo, userMessage} = useAppSelector(userStateToProps);

    const dispatchGetUser = useGetUserDispatch();
    const handleGetUser = (): void => {
        setLastAction("get")
        const getUserInfoThunk: (dispatch: Dispatch<TSetUserActions>) => Promise<void> = getUserInfo(currentToken);
        dispatchGetUser(getUserInfoThunk);
    };

    const dispatchSetUser = useSetUserDispatch();
    const handleSubmit = (): void => {
        setLastAction("submit")
        const user: IUserAuthorization = {email: email, password: password, name: name};
        const setUserInfoThunk: (dispatch: Dispatch<TSetUserActions>) => Promise<void> = setUserInfo(user, currentToken);
        dispatchSetUser(setUserInfoThunk);
    };

    useEffect((): void => {
        if (!currentToken || currentToken === "") {
            handleGetAccessToken();
        }
    }, []);

    useEffect((): void => {
        if (currentToken) handleGetUser();
    }, [currentToken]);

    useEffect((): void => {
        if (userFailed && (userMessage?.message === "jwt expired" || userMessage?.message === "You should be authorised")) {
            const retryFunction: () => void = lastAction === 'get' ? handleGetUser : handleSubmit;
            if (retryFunction) {
                retryWithNewToken(retryFunction);
            }
        }
    }, [userFailed, userMessage]);

    useEffect((): void => {
        if (userFailed && userMessage?.message !== "jwt expired") {
            let message: string = "Ошибка сети";
            if (userMessage !== EMPTY_SERVER_INFO) {
                message += ": " + userMessage.message;
            }
            dispatchLoading(stopLoading());
            openMessageModal(message);
        }  else if (userRequest) {
            dispatchLoading(startLoading());
        } else if (!userRequest && userInfo.success) {
            dispatchLoading(stopLoading());
            setPreviousName(userInfo.user.name);
            setPreviousEmail(userInfo.user.email);
            setPreviousPassword(password);
        }
    }, [userRequest, userFailed, userInfo, userMessage]);

    const retryWithNewToken = async (requestFunction: () => void): Promise<void> => {
        if (retrying) return;
        setRetrying(true);

        try {
            await handleGetAccessToken();
            requestFunction();
        } catch (error) {
            openMessageModal("Не удалось обновить данные. Пожалуйста, попробуйте позже.");
        } finally {
            setRetrying(false);
        }
    };

    const [hasChanges, setChanges] = useState<boolean>(false);

    const handleReset = (): void => {
        setName(previousName);
        setEmail(previousEmail);
        setPassword(previousPassword);
        setChanges(false);
    }

    useEffect((): void => {
        if (name === previousName && email === previousEmail && password === previousPassword)
            setChanges(false);
        else setChanges(true);
    }, [name, email, password]);

    useEffect((): void => {
        handleReset();
    }, [previousName, previousEmail, previousPassword]);

    return (
        <div>
            {isMessageModalOpen && (
                <WarningModal closeModal={closeMessageModal} message={modalMessage}/>
            )}
            <div className={profile.content}>
                <LeftProfileLinks/>
                <form className={profile.centerItems} onSubmit={(e): void => {
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
        </div>
    );
}

export default Profile;