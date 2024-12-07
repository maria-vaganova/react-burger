import {useMemo, useState, useReducer, useEffect, useContext, useCallback} from 'react';
import constructor from './BurgerConstructor.module.css';
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {
    fulfilIngredient,
    getBunFromCart,
    getDataIds,
    getIngredientTypeById,
    restoreIngredientListFromCart
} from "../../utils/util";
import {
    Ingredient,
    TotalPriceState,
    TotalPriceAction,
    CartItem,
    OrderState,
    DataState,
    CartState
} from "../../utils/types";
import OrderDetails from "../order-details/OrderDetails";
import {BUN_TYPE, DraggableTypes} from "../../utils/data";
import {useDrop} from "react-dnd";
import IndexedElement from "../indexed-element/IndexedElement";
import {getOrderNumber} from "../../services/actions/orderActions";
import {useAppSelector, useCartDispatch, useOrderDispatch} from '../../services/store';
import {addIngredientToCart, moveItems} from "../../services/actions/cartActions";

function BurgerConstructor() {
    const {data} = useAppSelector((state: { data: DataState }) => ({
        data: state.data.dataInfo
    }))
    const initialState: TotalPriceState = {count: 0};
    const {cart} = useAppSelector((state: { cart: CartState }) => ({
        cart: state.cart.cartItems
    }))

    const dispatchCart = useCartDispatch();
    const addIngredient = (ingredientId: string) => {
        dispatchCart(addIngredientToCart(cart, ingredientId, getIngredientTypeById(ingredientId, data)));
        console.log("addIngredientToCart", cart, ingredientId);
    }
    const moveItem = (fromIndex: number, toIndex: number) => {
        dispatchCart(moveItems(cart, fromIndex, toIndex));
    }

    const dispatch = useOrderDispatch();
    const {orderRequest, orderFailed, orderInfo} = useAppSelector((state: { order: OrderState }) => ({
        orderRequest: state.order.orderRequest,
        orderFailed: state.order.orderFailed,
        orderInfo: state.order.orderInfo
    }))
    const handleOrder = () => {
        const ingredients = getDataIds(restoreIngredientListFromCart(cart, true, data));
        const getOrderNumberThunk = getOrderNumber(ingredients);
        dispatch(getOrderNumberThunk);
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
        cart.forEach(elem => {
            totalPriceDispatcher({type: "increment", ingredient: fulfilIngredient(elem.id, data)});
            if (elem.type === BUN_TYPE) {
                totalPriceDispatcher({type: "increment", ingredient: fulfilIngredient(elem.id, data)});
            }
        });
    }, [cartList, cart, data]);

    const openModal = () => {
        setOrderDetailsOpen(true);
    };

    const closeModal = () => {
        setOrderDetailsOpen(false);
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

    const renderCard = useCallback(
        (elem: CartItem, index: number) => {
            if (elem.type !== BUN_TYPE) {
                return (
                    <IndexedElement key={index}
                                    ingredient={fulfilIngredient(elem.id, data)}
                                    displayOrder={elem.displayOrder}
                                    moveElement={moveElement}
                    />
                )
            }
        }, [data, moveElement],
    );

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
                        {cart.map((elem, index) => renderCard(elem, index))}
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