import React from 'react';
import constructor from './BurgerConstructor.module.css';
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor() {

    return (
        <div className={constructor.main}>
            <div className={constructor.scrollableContainer}>

            </div>
            <div className={constructor.orderSum}>
                <p className="text text_type_digits-medium">1234567890</p>
                <CurrencyIcon type="primary" className={"ml-2"}/>
                <Button htmlType="button" type="primary" size="large" extraClass={"ml-10"}>
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}

export default BurgerConstructor;