import React, {useMemo} from 'react';
import constructor from './BurgerConstructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {discardIngredientFromCart, fulfilIngredient, getBunFromCart, getCartSum} from "../../utils/util";
import {BUN_TYPE} from "../../utils/data";

export interface BurgerConstructorProps {
    cart: [{ id: string, type: string, count: number }] | undefined,
    setCart: Function
}

function BurgerConstructor({cart, setCart}: BurgerConstructorProps) {

    const bun = getBunFromCart(cart);
    let cartSum = getCartSum(cart);

    const cartList = useMemo(() => {
        if (cart) {
            return cart
                .filter(elem => elem.type !== BUN_TYPE)
                .flatMap(elem => {
                    const ingredient = fulfilIngredient(elem.id);
                    return Array.from({length: elem.count}, () => ({ingredient: ingredient}));
                });
        }
        return [];
    }, [cart]);

    return (
        <div style={{width: '600px'}}>
            <div className={constructor.main}>
                <div className={constructor.scrollableContainer}>
                    <div className={constructor.cart}>
                        {(bun !== undefined) ? (<ConstructorElement
                            type="top"
                            isLocked={true}
                            text={bun.name + " (верх)"}
                            price={bun.price}
                            thumbnail={bun.image}
                            extraClass={constructor.bunItem}
                        />) : <></>}
                        {cartList?.map((elem, index) => {
                            return (
                                <div key={index} className={constructor.cartItemContent}>
                                    <DragIcon type="primary" className={"mr-2"}/>
                                    <ConstructorElement
                                        key={index}
                                        text={elem.ingredient.name}
                                        price={elem.ingredient.price}
                                        thumbnail={elem.ingredient.image}
                                        handleClose={() => discardIngredientFromCart(cart, setCart, elem.ingredient._id)}
                                    />
                                </div>
                            )
                        })}
                        {bun && (<ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={bun.name + " (низ)"}
                            price={bun.price}
                            thumbnail={bun.image}
                            extraClass={constructor.bunItem}
                        />)}
                    </div>
                </div>
                <div className={constructor.orderSum}>
                    <p className="text text_type_digits-medium">{cartSum}</p>
                    <CurrencyIcon type="primary" className={"ml-2"}/>
                    <Button htmlType="button" type="primary" size="large" extraClass={"ml-10"}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default BurgerConstructor;