import React from "react";
import './AppHeader.css';
import {BurgerIcon, Button, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
    return (
        <div className={"header-container"}>
            <div className={"left-buttons mt-4 mb-4"}>
                <Button htmlType={"button"} type="secondary">
                    <div className={"button-content"}>
                        <BurgerIcon type="primary" className={"ml-5 mr-2"}/>
                        Конструктор
                    </div>
                </Button>
                <Button htmlType={"button"} type="secondary" disabled={true} extraClass={"ml-2"}>
                    <div className={"button-content"}>
                        <ListIcon type="secondary" className={"ml-5 mr-2"}/>
                        Лента заказов
                    </div>
                </Button>
            </div>
            <Logo className={"logo"}/>
            <Button htmlType={"button"} type="secondary" disabled={true} extraClass={"right-button"}>
                <div className={"button-content"}>
                    <ProfileIcon type="secondary" className={"ml-5 mr-2"}/>
                    Личный кабинет
                </div>
            </Button>
        </div>
    );
}

export default AppHeader;