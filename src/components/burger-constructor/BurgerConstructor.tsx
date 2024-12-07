import {useMemo, useState, useEffect, useCallback} from 'react';
import constructor from './BurgerConstructor.module.css';
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {
    fulfilIngredient,
    getBunFromCart,
    getDataIds,
    getIngredientTypeById,
    restoreIngredientListFromCart
} from "../../utils/util";
import {Ingredient, CartItem} from "../../utils/types";
import OrderDetails from "../order-details/OrderDetails";
import {BUN_TYPE, DraggableTypes} from "../../utils/data";
import {useDrop} from "react-dnd";
import IndexedElement from "../indexed-element/IndexedElement";
import {clearOrderNumber, getOrderNumber} from "../../services/actions/orderActions";
import {
    cartSelector,
    dataInfoSelector,
    orderStateToProps, totalPriceSelector,
    useAppSelector,
    useCartDispatch,
    useOrderDispatch, useTotalPriceDispatch
} from '../../services/store';
import {addIngredientToCart, moveItems} from "../../services/actions/cartActions";
import {v4 as uuid_v4} from 'uuid';
import {increment, resetPrice} from "../../services/actions/totalPriceActions";

function BurgerConstructor() {
    const {data} = useAppSelector(dataInfoSelector);
    const {cart} = useAppSelector(cartSelector);
    const {totalPrice} = useAppSelector(totalPriceSelector);

    const dispatchPrice = useTotalPriceDispatch();
    const incrementPrice = (ingredientId: string) => {
        dispatchPrice(increment(fulfilIngredient(ingredientId, data)));
    }
    const resetTotalPrice = () => {
        dispatchPrice(resetPrice());
    }

    const dispatchCart = useCartDispatch();
    const addIngredient = (ingredientId: string) => {
        dispatchCart(addIngredientToCart(ingredientId, getIngredientTypeById(ingredientId, data), uuid_v4()));
    }
    const moveItem = (fromIndex: number, toIndex: number) => {
        dispatchCart(moveItems(fromIndex, toIndex));
    }

    const dispatchOrder = useOrderDispatch();
    const {orderRequest, orderFailed, orderInfo} = useAppSelector(orderStateToProps);
    const handleOrder = () => {
        const ingredients = getDataIds(restoreIngredientListFromCart(cart, true, data));
        const getOrderNumberThunk = getOrderNumber(ingredients);
        dispatchOrder(getOrderNumberThunk);
    };
    const clearOrder = () => {
        const clearOrderNumberThunk = clearOrderNumber();
        dispatchOrder(clearOrderNumberThunk);
    };

    const [, dropTarget] = useDrop({
        accept: DraggableTypes.ADDED_ITEM,
        drop(ingredient: CartItem) {
            handleDrop(ingredient.id);
        },
    });

    const handleDrop = (ingredientId: string) => {
        addIngredient(ingredientId);
    };

    const bun = getBunFromCart(cart, data);
    const [isOrderDetailsOpen, setOrderDetailsOpen] = useState(false);

    const cartList: Ingredient[] = useMemo(() => {
        if (cart) {
            return restoreIngredientListFromCart(cart, false, data);
        }
        return [];
    }, [cart, data]);

    useEffect(() => {
        resetTotalPrice();
        cart.forEach(elem => {
            incrementPrice(elem.id);
            if (elem.type === BUN_TYPE) {
                incrementPrice(elem.id);
            }
        });
    }, [cartList, cart, data]);

    const openModal = () => {
        setOrderDetailsOpen(true);
    };

    const closeModal = () => {
        setOrderDetailsOpen(false);
        clearOrder();
    };

    const placeOrder = () => {
        handleOrder();
        if (orderFailed) {
            return alert(('Ошибка сети'));
        } else if (orderRequest) {
            return alert(('Загрузка...'));
        } else {
            console.log("orderInfo - ", orderInfo);
            openModal();
        }
    }

    const moveElement = useCallback((fromIndex: number, toIndex: number) => {
        moveItem(fromIndex, toIndex);
    }, [cart])

    const renderCard = (elem: CartItem) => {
        if (elem.type !== BUN_TYPE) {
            return (
                <IndexedElement key={elem.key}
                                ingredient={fulfilIngredient(elem.id, data)}
                                displayOrder={elem.displayOrder}
                                moveElement={moveElement}
                />
            )
        }
    }

    return (
        <div style={{width: '600px'}}>
            {isOrderDetailsOpen && (
                <OrderDetails isOpen={isOrderDetailsOpen} closeModal={closeModal} orderInfo={orderInfo}/>
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
                        {cart.map((elem) => renderCard(elem))}
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
                    <p className="text text_type_digits-medium">{totalPrice}</p>
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