import React, {useMemo, useState, useReducer, useEffect} from 'react';
import constructor from './BurgerConstructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {
    discardIngredientFromCart, fulfilIngredient, getBunFromCart, getDataIds, postOrder, restoreIngredientListFromCart
} from "../../utils/util";
import {Ingredient, TotalPriceState, TotalPriceAction} from "../../utils/types";
import OrderDetails from "../order-details/OrderDetails";

export interface BurgerConstructorProps {
    cart: [{ id: string, type: string, count: number }] | undefined,
    setCart: Function,
    data: Ingredient[]
}

function BurgerConstructor({cart, setCart, data}: BurgerConstructorProps) {

    const initialState: TotalPriceState = {count: 0};

    function reducer(state: TotalPriceState, action: TotalPriceAction): any {
        switch (action.type) {
            case "reset":
                return {count: 0};
            case "increment":
                return {count: action.ingredient ? state.count + action.ingredient.price : state.count};
            case "decrement":
                return {count: action.ingredient ? state.count - action.ingredient.price : state.count};
            default:
                throw new Error(`Wrong type of action: ${action.type}`);
        }
    }

    const [totalPriceState, totalPriceDispatcher] = useReducer(reducer, initialState);

    const bun = getBunFromCart(cart, data);
    const [isOrderDetailsOpen, setOrderDetailsOpen] = useState(false);

    const cartList: Ingredient[] = useMemo(() => {
        if (cart) {
            return restoreIngredientListFromCart(cart, false, data);
        }
        return [];
    }, [cart, data]);

    useEffect(() => {
        totalPriceDispatcher({type: "reset"});
        cart?.forEach(elem => {
            for (let i = 0; i < elem.count; i++) {
                totalPriceDispatcher({type: "increment", ingredient: fulfilIngredient(elem.id, data)});
            }
        });
    }, [cartList]);

    const openModal = () => {
        setOrderDetailsOpen(true);
    };

    const closeModal = () => {
        setOrderDetailsOpen(false);
    };

    const placeOrder = () => {
        postOrder(getDataIds(restoreIngredientListFromCart(cart, true, data)))
            .then(orderInfo => {
                console.log('Order successful:', orderInfo);
            })
            .catch(error => {
                console.error('Error posting order:', error);
            });
    };

    return (
        <div style={{width: '600px'}}>
            {isOrderDetailsOpen && (
                <OrderDetails isOpen={isOrderDetailsOpen} closeModal={closeModal}/>
            )}
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
                                        text={elem.name}
                                        price={elem.price}
                                        thumbnail={elem.image}
                                        handleClose={() => discardIngredientFromCart(cart, setCart, elem._id)}
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
                    <p className="text text_type_digits-medium">{totalPriceState.count}</p>
                    <CurrencyIcon type="primary" className={"ml-2"}/>
                    <Button htmlType="button" type="primary" size="large" extraClass={"ml-10"} onClick={placeOrder}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default BurgerConstructor;