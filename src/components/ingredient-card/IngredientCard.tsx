import React, {useEffect, useState} from 'react';
import card from './IngredientCard.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {fulfilIngredient} from "../../utils/util";
import {Ingredient} from "../../utils/types";

export interface IngredientCardProps {
    id: string,
    cart: [{ id: string, type: string, count: number }] | undefined,
    setCart: Function,
    data: Ingredient[],
    onClick: () => void
}

function IngredientCard({id, cart, setCart, data, onClick}: IngredientCardProps) {

    const [counter, setCounter] = useState(0);
    const ingredient: Ingredient = fulfilIngredient(id, data);

    useEffect(() => {
        const index = cart?.findIndex(elem => elem.id === id);
        if (cart === undefined || index === undefined || index === -1) {
            setCounter(0);
        } else {
            setCounter(cart[index].count);
        }
    }, [id, cart]);

    return (
        <div className={card.ingredientCard} onClick={onClick}>
            <div>
                {counter > 0 && (
                    <Counter count={counter} size="default" extraClass={card.counter}/>
                )}
                <img className={"ml-4 mr-4"} src={ingredient.image} alt=""/>
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
