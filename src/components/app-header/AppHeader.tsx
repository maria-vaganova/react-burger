import React from "react";
import appHeader from './AppHeader.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
    return (
        <div className={appHeader.headerContainer}>
            <div className={appHeader.leftButtons + " mt-4 mb-4"}>
                <a className={"text text_type_main-default"}>
                    <div className={appHeader.buttonContent}>
                        <BurgerIcon type="primary" className={"ml-5 mr-2"}/>
                        Конструктор
                    </div>
                </a>
                <a className={"text text_type_main-default text_color_inactive ml-2"}>
                    <div className={appHeader.buttonContent}>
                        <ListIcon type="secondary" className={"ml-5 mr-2"}/>
                        Лента заказов
                    </div>
                </a>
            </div>
            <Logo className={appHeader.logo}/>
            <a className={"text text_type_main-default text_color_inactive " + appHeader.rightButton}>
                <div className={appHeader.buttonContent}>
                    <ProfileIcon type="secondary" className={"ml-5 mr-2"}/>
                    Личный кабинет
                </div>
            </a>
        </div>
    );
}

export default AppHeader;