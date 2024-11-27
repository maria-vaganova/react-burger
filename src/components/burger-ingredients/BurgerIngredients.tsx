import React from 'react';
import ingredients from './BurgerIngredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from "../ingredient-card/IngredientCard";
import {BUN_TYPE, MAIN_TYPE, SAUCE_TYPE} from "../../utils/data";
import {Ingredient} from "../../utils/types";
import {getDataIds} from "../../utils/util";

export interface BurgerIngredientsProps {
    cart: [{ id: string, type: string, count: number }] | undefined,
    setCart: Function,
    data: Ingredient[]
}

function BurgerIngredients({cart, setCart, data}: BurgerIngredientsProps) {
    const [current, setCurrent] = React.useState<string>(BUN_TYPE);

    function setActiveTab(tabName: string) {
        setCurrent(tabName)
        const element = document.getElementById(tabName)
        element?.scrollIntoView({
            behavior: 'smooth'
        })
    }

    function getCardList(type: string) {
        return getDataIds(data)
            .filter(elem => elem.type === type)
            .map((elem) => (
                <IngredientCard id={elem.id} key={elem.id} cart={cart} setCart={setCart} data={data}/>
            ))
    }

    return (
        <div>
            <h1 className="text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div style={{display: 'flex'}}>
                <Tab value={BUN_TYPE} active={current === BUN_TYPE} onClick={() => {
                    setActiveTab(BUN_TYPE)
                }}>
                    Булки
                </Tab>
                <Tab value={SAUCE_TYPE} active={current === SAUCE_TYPE} onClick={() => {
                    setActiveTab(SAUCE_TYPE)
                }}>
                    Соусы
                </Tab>
                <Tab value={MAIN_TYPE} active={current === MAIN_TYPE} onClick={() => {
                    setActiveTab(MAIN_TYPE)
                }}>
                    Начинки
                </Tab>
            </div>
            <div className={"mt-10 " + ingredients.scrollableContainer}>
                <p id="bun" className={"text text_type_main-medium"}>Булки</p>
                <div className={"mt-6 mb-10 mr-4 ml-4 " + ingredients.ingredients}>
                    {getCardList(BUN_TYPE)}
                </div>
                <p id="sauce" className={"text text_type_main-medium"}>Соусы</p>
                <div className={"mt-6 mb-10 mr-4 ml-4 " + ingredients.ingredients}>
                    {getCardList(SAUCE_TYPE)}
                </div>
                <p id="main" className={"text text_type_main-medium"}>Начинки</p>
                <div className={"mt-6 mb-10 mr-4 ml-4 " + ingredients.ingredients}>
                    {getCardList(MAIN_TYPE)}
                </div>
            </div>
        </div>
    );
}

export default BurgerIngredients;