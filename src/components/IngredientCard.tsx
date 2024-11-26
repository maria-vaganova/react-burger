import React from 'react';
import card from './IngredientCard.module.css';
import {dataList} from "../utils/data";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export interface IngredientCardProps {
    id: string
}

function IngredientCard({id}: IngredientCardProps) {

    let ingredient = dataList.find(item => item._id === id);
    const [counter, setCounter] = React.useState(0);

    if (ingredient === undefined) {
        ingredient = {
            _id: "0",
            name: "Не найдено",
            type: "none",
            proteins: 0,
            fat: 0,
            carbohydrates: 0,
            calories: 0,
            price: 0,
            image: "none",
            image_mobile: "none",
            image_large: "none",
            __v: 0
        }
    }

    return (
        <div className={card.ingredientCard}
             onClick={() => setCounter(counter + 1)}
             onContextMenu={() => {
                 if (counter > 0) setCounter(counter - 1)
             }}>
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
