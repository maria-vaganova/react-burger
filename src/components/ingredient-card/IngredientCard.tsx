import {useContext, useEffect, useState} from 'react';
import card from './IngredientCard.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {fulfilIngredient, getIngredientCountFromCartById} from "../../utils/util";
import {Ingredient} from "../../utils/types";
import {CartContext} from "../../services/appContext";
import {useDrag} from "react-dnd";

export interface IngredientCardProps {
    id: string,
    data: Ingredient[],
    onClick: () => void
}

function IngredientCard({id, data, onClick}: IngredientCardProps) {

    const [counter, setCounter] = useState(0);
    const ingredient: Ingredient = fulfilIngredient(id, data);
    const cartTotal = useContext(CartContext);

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: {id}
    });

    useEffect(() => {
        setCounter(getIngredientCountFromCartById(cartTotal.cart, id));
    }, [id, cartTotal.cart]);

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
