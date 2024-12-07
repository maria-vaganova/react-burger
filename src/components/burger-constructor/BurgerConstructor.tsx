import {useMemo, useState, useReducer, useEffect, useContext, useCallback} from 'react';
import constructor from './BurgerConstructor.module.css';
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {
    addIngredientToCart,
    fulfilIngredient,
    getBunFromCart,
    getDataIds,
    getIngredientTypeById,
    postOrder,
    restoreIngredientListFromCart
} from "../../utils/util";
import {Ingredient, TotalPriceState, TotalPriceAction, OrderInfo, CartItem} from "../../utils/types";
import OrderDetails from "../order-details/OrderDetails";
import {BUN_TYPE, EMPTY_ORDER_INFO} from "../../utils/data";
import {CartContext, OrderNumberContext} from "../../services/appContext";
import {useDrop} from "react-dnd";
import IndexedElement from "../indexed-element/IndexedElement";

export interface BurgerConstructorProps {
    data: Ingredient[]
}

function BurgerConstructor({data}: BurgerConstructorProps) {

    const initialState: TotalPriceState = {count: 0};
    const orderNumber = useContext(OrderNumberContext);
    const cartTotal = useContext(CartContext);

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(ingredient: CartItem) {
            handleDrop(ingredient.id);
        },
    });

    const handleDrop = (ingredientId: string) => {
        addIngredientToCart(cartTotal.cart, cartTotal.setCart, ingredientId, getIngredientTypeById(ingredientId, data));
    };

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

    const bun = getBunFromCart(cartTotal.cart, data);
    const [isOrderDetailsOpen, setOrderDetailsOpen] = useState(false);

    const cartList: Ingredient[] = useMemo(() => {
        if (cartTotal.cart) {
            return restoreIngredientListFromCart(cartTotal.cart, false, data);
        }
        return [];
    }, [cartTotal.cart, data]);
    useEffect(() => {
        totalPriceDispatcher({type: "reset"});
        cartTotal.cart.forEach(elem => {
            totalPriceDispatcher({type: "increment", ingredient: fulfilIngredient(elem.id, data)});
            if (elem.type === BUN_TYPE) {
                totalPriceDispatcher({type: "increment", ingredient: fulfilIngredient(elem.id, data)});
            }
        });
    }, [cartList, cartTotal.cart, data]);

    const openModal = () => {
        setOrderDetailsOpen(true);
    };

    const closeModal = () => {
        setOrderDetailsOpen(false);
    };

    const placeOrder = () => {
        getOrderInfo();
        openModal();
    }

    const getOrderInfo = (): OrderInfo => {
        postOrder(getDataIds(restoreIngredientListFromCart(cartTotal.cart, true, data)))
            .then(orderInfo => {
                orderNumber.setOrderNumber(orderInfo.order.number);
                return orderInfo;
            })
            .catch(error => {
                console.error('Error posting order:', error);
            });
        return EMPTY_ORDER_INFO;
    };

    const moveElement = useCallback((fromIndex: number, toIndex: number) => {
        const updatedList = [...cartTotal.cart];
        const [movedItem] = updatedList.splice(fromIndex, 1);
        updatedList.splice(toIndex, 0, movedItem);
        cartTotal.setCart(updatedList);
    }, [cartTotal])

    const renderCard = useCallback(
        (elem: CartItem, index: number) => {
            if (elem.type !== BUN_TYPE) {
                return (
                    <IndexedElement key={index} id={elem.id} ingredient={fulfilIngredient(elem.id, data)}
                                    index={elem.index}
                                    moveElement={moveElement}/>
                )
            }
        }, [data, moveElement],
    );

    return (
        <div style={{width: '600px'}}>
            {isOrderDetailsOpen && (
                <OrderDetails isOpen={isOrderDetailsOpen} closeModal={closeModal}/>
            )}
            <div className={constructor.main}>
                <div ref={dropTarget} className={constructor.scrollableContainer}>
                    <div className={constructor.cart}>
                        {bun && (<ConstructorElement
                            type="top"
                            isLocked={true}
                            text={bun.name + " (верх)"}
                            price={bun.price}
                            thumbnail={bun.image}
                            extraClass={constructor.bunItem}
                        />)}
                        {cartTotal.cart.map((elem, index) => renderCard(elem, index))}
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