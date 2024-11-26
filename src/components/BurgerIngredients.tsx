import React from 'react';
import ingredients from './BurgerIngredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from "./IngredientCard";
import {dataIds} from "../utils/data";

function BurgerIngredients() {
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
                        .filter(elem => elem.type === "bun")
                        .map(elem => (
                            <IngredientCard id={elem.id}/>
                        ))
                    }
                </div>
                <p id="sauce" className={"text text_type_main-medium"}>Соусы</p>
                <div className={"mt-6 mb-10 mr-4 ml-4 " + ingredients.ingredients}>
                    {dataIds
                        .filter(elem => elem.type === "sauce")
                        .map(elem => (
                            <IngredientCard id={elem.id}/>
                        ))
                    }
                </div>
                <p id="main" className={"text text_type_main-medium"}>Начинки</p>
                <div className={"mt-6 mb-10 mr-4 ml-4 " + ingredients.ingredients}>
                    {dataIds
                        .filter(elem => elem.type === "main")
                        .map(elem => (
                            <IngredientCard id={elem.id}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default BurgerIngredients;