import React from 'react';
import './BurgerIngredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredients() {
    const [current, setCurrent] = React.useState('Булки');

    return (
        <div>
            <h1 className="text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div style={{display: 'flex'}}>
                <Tab value="one" active={current === 'Булки'} onClick={() => setCurrent('Булки')}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'Соусы'} onClick={() => setCurrent('Соусы')}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'Начинки'} onClick={() => setCurrent('Начинки')}>
                    Начинки
                </Tab>
            </div>
            <div className={"mt-10"}>
                <p className={"text text_type_main-medium"}>Булки</p>
                <div className={"mt-6 mb-10 mr-4 ml-4"}></div>
                <p className={"text text_type_main-medium"}>Соусы</p>
                <div className={"mt-6 mb-10 mr-4 ml-4"}></div>
                <p className={"text text_type_main-medium"}>Начинки</p>
                <div className={"mt-6 mb-10 mr-4 ml-4"}></div>
            </div>
        </div>
    );
}

export default BurgerIngredients;