import register from '../Authorization.module.css';
import {EmailInput, PasswordInput, Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {ChangeEvent, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {
    registerStateToProps,
    useAppSelector,
    useRegisterDispatch
} from "../../services/store";
import {getRegister} from "../../services/actions/registerActions";
import {UserAutorization, UserInfo} from "../../utils/types";
import {EMPTY_REGISTER_INFO} from "../../utils/data";

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

    const dispatchRegister = useRegisterDispatch();
    const {registerRequest, registerFailed, registerInfo} = useAppSelector(registerStateToProps);
    const handleRegister = () => {
        const user: UserAutorization = {email: email, password: password, name: name};
        const getRegisterThunk = getRegister(user);
        dispatchRegister(getRegisterThunk);
    };

    const navigate = useNavigate();

    const registerUser = () => {
        handleRegister();
        if (registerFailed) {
            let message: string = "Ошибка сети";
            if (registerInfo && 'message' in registerInfo) message += ": " + registerInfo.message;
            return alert((message));
        } else if (registerRequest) {
            return alert(('Загрузка...'));
        } else if (registerInfo === EMPTY_REGISTER_INFO) {
            return alert(('Ошибка: ' + registerInfo.message));
        } else {
            console.log("registerInfo - ", registerInfo);
            navigate('/login');
        }
    }

    return (
        <div className={register.content}>
            <p className="text text_type_main-medium">
                Регистрация
            </p>
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
                name={'Пароль'}
                extraClass={"mb-6 mt-3"}
            />
            <Button htmlType="button" type="primary" size="medium" extraClass={""} onClick={registerUser}>
                Зарегистрироваться
            </Button>
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