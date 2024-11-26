import React from 'react';
import ingredients from './BurgerIngredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from "./IngredientCard";
import {BUN_TYPE, dataIds, MAIN_TYPE, SAUCE_TYPE} from "../utils/data";

export interface BurgerIngredientsProps {
    cart: [{ id: string, type: string, count: number }] | undefined,
    setCart: Function
}

function BurgerIngredients({cart, setCart}: BurgerIngredientsProps) {
    const [current, setCurrent] = React.useState('Булки');

    return (
        <div>
            <h1 className="text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div style={{display: 'flex'}}>
                <Tab value="one" active={current === 'Булки'} onClick={() => {
                    setCurrent('Булки')
                    const element = document.getElementById('bun')
                    element?.scrollIntoView({
                        behavior: 'smooth'
                    })
                }}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'Соусы'} onClick={() => {
                    setCurrent('Соусы')
                    const element = document.getElementById('sauce')
                    element?.scrollIntoView({
                        behavior: 'smooth'
                    });
                }}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'Начинки'} onClick={() => {
                    setCurrent('Начинки')
                    const element = document.getElementById('main')
                    element?.scrollIntoView({
                        behavior: 'smooth'
                    })
                }}>
                    Начинки
                </Tab>
            </div>
            <div className={"mt-10 " + ingredients.scrollableContainer}>
                <p id="bun" className={"text text_type_main-medium"}>Булки</p>
                <div className={"mt-6 mb-10 mr-4 ml-4 " + ingredients.ingredients}>
                    {dataIds
                        .filter(elem => elem.type === BUN_TYPE)
                        .map(elem => (
                            <IngredientCard id={elem.id} cart={cart} setCart={setCart}/>
                        ))
                    }
                </div>
                <p id="sauce" className={"text text_type_main-medium"}>Соусы</p>
                <div className={"mt-6 mb-10 mr-4 ml-4 " + ingredients.ingredients}>
                    {dataIds
                        .filter(elem => elem.type === SAUCE_TYPE)
                        .map(elem => (
                            <IngredientCard id={elem.id} cart={cart} setCart={setCart}/>
                        ))
                    }
                </div>
                <p id="main" className={"text text_type_main-medium"}>Начинки</p>
                <div className={"mt-6 mb-10 mr-4 ml-4 " + ingredients.ingredients}>
                    {dataIds
                        .filter(elem => elem.type === MAIN_TYPE)
                        .map(elem => (
                            <IngredientCard id={elem.id} cart={cart} setCart={setCart}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default BurgerIngredients;