import React from "react";
import appHeader from './AppHeader.module.css';
import {BurgerIcon, Button, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
    return (
        <div className={appHeader.headerContainer}>
            <div className={appHeader.leftButtons + " mt-4 mb-4"}>
                <Button htmlType={"button"} type="secondary">
                    <div className={appHeader.buttonContent}>
                        <BurgerIcon type="primary" className={"ml-5 mr-2"}/>
                        Конструктор
                    </div>
                </Button>
                <Button htmlType={"button"} type="secondary" disabled={true} extraClass={"ml-2"}>
                    <div className={appHeader.buttonContent}>
                        <ListIcon type="secondary" className={"ml-5 mr-2"}/>
                        Лента заказов
                    </div>
                </Button>
            </div>
            <Logo className={appHeader.logo}/>
            <Button htmlType={"button"} type="secondary" disabled={true} extraClass={appHeader.rightButton}>
                <div className={appHeader.buttonContent}>
                    <ProfileIcon type="secondary" className={"ml-5 mr-2"}/>
                    Личный кабинет
                </div>
            </Button>
        </div>
    );
}

export default AppHeader;