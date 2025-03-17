import register from '../Authorization.module.css';
import {EmailInput, PasswordInput, Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {ChangeEvent, useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {
    registerStateToProps,
    useAppSelector,
    useRegisterDispatch
} from "../../services/store";
import {getRegister, TRegisterActions} from "../../services/actions/registerActions";
import {IUserAuthorization} from "../../utils/types";
import {EMPTY_AUTHORIZATION_INFO, EMPTY_SERVER_INFO} from "../../utils/data";
import {Dispatch} from "redux";

function Register() {
    const [name, setName] = useState<string>('')
    const onNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value)
    }
    const [email, setEmail] = useState<string>('')
    const onEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value)
    }
    const [password, setPassword] = useState<string>('')
    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value)
    }

    const dispatchRegister = useRegisterDispatch();
    const {registerRequest, registerFailed, registerInfo, registerMessage} = useAppSelector(registerStateToProps);
    const handleRegister: () => void = (): void => {
        const user: IUserAuthorization = {email: email, password: password, name: name};
        const getRegisterThunk: (dispatch: Dispatch<TRegisterActions>) => Promise<void> = getRegister(user);
        dispatchRegister(getRegisterThunk);
    };

    const navigate = useNavigate();

    useEffect((): void => {
        if (registerFailed) {
            let message: string = "Ошибка сети";
            if (registerMessage !== EMPTY_SERVER_INFO) {
                message += ": " + registerMessage.message;
            }
            alert(message);
        } else if (!registerRequest && registerInfo !== EMPTY_AUTHORIZATION_INFO) {
            navigate('/');
        }
    }, [registerFailed, registerRequest, registerInfo, registerMessage, navigate]);

    return (
        <div className={register.content}>
            <p className="text text_type_main-medium">
                Регистрация
            </p>
            <form className={register.form}
                  onSubmit={(e): void => {
                      e.preventDefault();
                      handleRegister();
                  }}>
                <Input
                    type={'text'}
                    onChange={onNameChange}
                    value={name}
                    placeholder={"Имя"}
                    extraClass={"mb-3 mt-6"}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
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
                    placeholder={"Пароль"}
                    extraClass={"mb-6 mt-3"}
                />
                <Button htmlType="submit" type="primary" size="medium">
                    Зарегистрироваться
                </Button>
            </form>
            <div className={"mt-20"}>
                <a className={"text text_type_main-default text_color_inactive mr-2"}>
                    Уже зарегистрированы?
                </a>
                <NavLink to={"/login"}
                         className={"text text_type_main-default text_color_accent " + register.navLink}>
                    Войти
                </NavLink>
            </div>
        </div>
    );
}

export default Register;