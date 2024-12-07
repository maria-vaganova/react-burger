import {useContext, useEffect, useState} from 'react';
import card from './IngredientCard.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {fulfilIngredient, getIngredientCountFromCartById} from "../../utils/util";
import {CartState, DataState, Ingredient} from "../../utils/types";
import {useDrag} from "react-dnd";
import {DraggableTypes} from "../../utils/data";
import {useAppSelector} from "../../services/store";

export interface IngredientCardProps {
    id: string,
    onClick: () => void
}

function IngredientCard({id, onClick}: IngredientCardProps) {
    const {data} = useAppSelector((state: { data: DataState }) => ({
        data: state.data.dataInfo
    }));

    const [counter, setCounter] = useState(0);
    const ingredient: Ingredient = fulfilIngredient(id, data);
    const {cart} = useAppSelector((state: { cart: CartState }) => ({
        cart: state.cart.cartItems
    }))

    const [, dragRef] = useDrag({
        type: DraggableTypes.ADDED_ITEM,
        item: {id}
    });

    useEffect(() => {
        setCounter(getIngredientCountFromCartById(cart, id));
    }, [id, cart]);

    return (
        <div className={card.ingredientCard} onClick={onClick}>
            <div>
                {counter > 0 && (
                    <Counter count={counter} size="default" extraClass={card.counter}/>
                )}
                <img ref={dragRef} className={"ml-4 mr-4"} src={ingredient.image} alt=""/>
                <div className={card.priceContent}>
                    <p className={"text text_type_digits-default"}>{ingredient.price}</p>
                    <CurrencyIcon type="primary" className={"ml-1"}/>
                </div>
            </div>
            <div className={"text_type_main-small " + card.cardLabel}>{ingredient.name}</div>
        </div>
    );
}

export default IngredientCard;
