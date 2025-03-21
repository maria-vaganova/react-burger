import {useMemo, useState, useEffect} from 'react';
import constructor from './BurgerConstructor.module.css';
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {
    fulfilIngredient,
    getBunFromCart,
    getDataIds,
    getIngredientTypeById,
    isUserAuthenticated,
    restoreIngredientListFromCart
} from "../../utils/util";
import {IIngredient, ICartItem} from "../../utils/types";
import OrderDetails from "../order-details/OrderDetails";
import {BUN_TYPE, DraggableTypes} from "../../utils/data";
import {useDrop} from "react-dnd";
import {clearOrderNumber, getOrderNumber, TOrderActions} from "../../services/actions/orderActions";
import {
    cartSelector,
    dataInfoSelector,
    orderStateToProps,
    totalPriceSelector,
    useAppSelector,
    useCartDispatch,
    useOrderDispatch,
    useTotalPriceDispatch
} from '../../services/store';
import {addIngredientToCart, TCartActions} from "../../services/actions/cartActions";
import {v4 as uuid_v4} from 'uuid';
import {increment, resetPrice, TTotalPriceActions} from "../../services/actions/totalPriceActions";
import IndexedContainer from "../indexed-container/IndexedContainer";
import {useLocation, useNavigate} from "react-router-dom";
import WarningModal from "../modal/WarningModal";

function BurgerConstructor() {

    const [modalMessage, setModalMessage] = useState("");
    const [isMessageModalOpen, setMessageModalOpen] = useState(false);

    const openMessageModal = (message: string): void => {
        setModalMessage(message);
        setMessageModalOpen(true);
    };

    const closeMessageModal = (): void => {
        setMessageModalOpen(false);
        setModalMessage("");
    };

    const {data} = useAppSelector(dataInfoSelector);
    const {cart} = useAppSelector(cartSelector);
    const {totalPrice} = useAppSelector(totalPriceSelector);

    const dispatchPrice = useTotalPriceDispatch();
    const incrementPrice = (ingredientId: string): void => {
        dispatchPrice(increment(fulfilIngredient(ingredientId, data)));
    }
    const resetTotalPrice = (): void => {
        dispatchPrice(resetPrice());
    }

    const dispatchCart = useCartDispatch();
    const addIngredient = (ingredientId: string): void => {
        dispatchCart(addIngredientToCart(ingredientId, getIngredientTypeById(ingredientId, data), uuid_v4()));
    }

    const dispatchOrder = useOrderDispatch();
    const {orderRequest, orderFailed, orderInfo} = useAppSelector(orderStateToProps);
    const handleOrder = (): void => {
        const ingredients: string[] = getDataIds(restoreIngredientListFromCart(cart, true, data));
        const getOrderNumberThunk = getOrderNumber(ingredients);
        dispatchOrder(getOrderNumberThunk);
    };
    const clearOrder = (): void => {
        const clearOrderNumberThunk = clearOrderNumber();
        dispatchOrder(clearOrderNumberThunk);
    };

    const [, dropTarget] = useDrop({
        accept: DraggableTypes.ADDED_ITEM,
        drop(ingredient: ICartItem): void {
            handleDrop(ingredient.id);
        },
    });

    const handleDrop = (ingredientId: string): void => {
        addIngredient(ingredientId);
    };

    const bun = getBunFromCart(cart, data);
    const [isOrderDetailsOpen, setOrderDetailsOpen] = useState(false);

    const cartList: IIngredient[] = useMemo((): IIngredient[] => {
        if (cart) {
            return restoreIngredientListFromCart(cart, false, data);
        }
        return [];
    }, [cart, data]);

    useEffect((): void => {
        resetTotalPrice();
        cart.forEach((elem: ICartItem): void => {
            incrementPrice(elem.id);
            if (elem.type === BUN_TYPE) {
                incrementPrice(elem.id);
            }
        });
    }, [cartList, cart, data]);

    const openModal = (): void => {
        setOrderDetailsOpen(true);
    };

    const closeModal = (): void => {
        setOrderDetailsOpen(false);
        clearOrder();
    };

    const navigate = useNavigate();
    const location = useLocation();

    const placeOrder = (): void => {
        const isAuthenticated: boolean = isUserAuthenticated();
        if (!isAuthenticated) {
            navigate("/login", {state: {background: location}})
            return;
        }
        if (cart.length === 0) {
            openMessageModal("Ошибка запроса: добавьте ингредиенты");
            return;
        }
        handleOrder();
    }

    useEffect((): void => {
        if (orderFailed) {
            openMessageModal('Ошибка сети');
        } else if (orderInfo.success) {
            console.log("orderInfo", orderInfo);
            openModal();
        }
    }, [orderRequest, orderFailed, orderInfo]);

    return (
        <div style={{width: '600px'}}>
            {isOrderDetailsOpen && (
                <OrderDetails isOpen={isOrderDetailsOpen} closeModal={closeModal} orderInfo={orderInfo}/>
            )}
            {isMessageModalOpen && (
                <WarningModal closeModal={closeMessageModal} message={modalMessage}/>
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
                        <IndexedContainer/>
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