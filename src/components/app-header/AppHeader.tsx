import React from "react";
import appHeader from './AppHeader.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";

function AppHeader() {
    return (
        <div className={appHeader.headerContainer}>
            <div className={appHeader.leftButtons + " mt-4 mb-4"}>
                <NavLink to={"/"} className={appHeader.navLink}>
                    {({isActive}) => (
                        <div className={appHeader.buttonContent}>
                            <BurgerIcon type={isActive ? "primary" : "secondary"} className={"ml-5 mr-2"}/>
                            <p className={"text text_type_main-default " + (isActive ? "text_color_primary" : "text_color_inactive")}>
                                Конструктор
                            </p>
                        </div>
                    )}
                </NavLink>
                <NavLink to={"/order-list"} className={appHeader.navLink + " ml-2"}>
                    {({isActive}) => (
                        <div className={appHeader.buttonContent}>
                            <ListIcon type={isActive ? "primary" : "secondary"} className={"ml-5 mr-2"}/>
                            <p className={"text text_type_main-default " + (isActive ? "text_color_primary" : "text_color_inactive")}>
                                Лента заказов
                            </p>
                        </div>
                    )}
                </NavLink>
            </div>
            <Logo className={appHeader.logo}/>
            <NavLink to={"/profile"} className={appHeader.navLink + " " + appHeader.rightButton}>
                {({isActive}) => (
                    <div className={appHeader.buttonContent}>
                        <ProfileIcon type={isActive ? "primary" : "secondary"} className={"ml-5 mr-2"}/>
                        <p className={"text text_type_main-default " + (isActive ? "text_color_primary" : "text_color_inactive")}>
                            Личный кабинет
                        </p>
                    </div>
                )}
            </NavLink>
        </div>
    );
}

export default AppHeader;