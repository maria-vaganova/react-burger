import {useContext, useEffect, useState} from 'react';
import card from './IngredientCard.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {addIngredientToCart, fulfilIngredient} from "../../utils/util";
import {Ingredient} from "../../utils/types";
import {CartContext} from "../../services/appContext";

export interface IngredientCardProps {
    id: string,
    data: Ingredient[],
    onClick: () => void
}

function IngredientCard({id, data, onClick}: IngredientCardProps) {

    const [counter, setCounter] = useState(0);
    const ingredient: Ingredient = fulfilIngredient(id, data);
    const cartTotal = useContext(CartContext);

    useEffect(() => {
        const index = cartTotal.cart.findIndex(elem => elem.id === id);
        if (index === undefined || index === -1) {
            setCounter(0);
        } else {
            setCounter(cartTotal.cart[index].count);
        }
    }, [id, cartTotal.cart]);

    return (
        <div className={card.ingredientCard} onClick={onClick}
             onContextMenu={(e) => {
                 e.preventDefault();
                 setCounter(counter + 1);
                 addIngredientToCart(cartTotal.cart, cartTotal.setCart, ingredient._id, ingredient.type);
             }}
        >
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
