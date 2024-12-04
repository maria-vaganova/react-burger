import React, {useState} from 'react';
import ingredients from './BurgerIngredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from "../ingredient-card/IngredientCard";
import {BUN_TYPE, MAIN_TYPE, SAUCE_TYPE} from "../../utils/data";
import {Ingredient} from "../../utils/types";
import {fulfilIngredient, getDataIdsWithType} from "../../utils/util";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import ModalOverlay from "../modal/ModalOverlay";
import Modal from "../modal/Modal";

export interface BurgerIngredientsProps {
    cart: [{ id: string, type: string, count: number }] | undefined,
    setCart: Function,
    data: Ingredient[]
}

function BurgerIngredients({cart, setCart, data}: BurgerIngredientsProps) {
    const [current, setCurrent] = useState<string>(BUN_TYPE);
    const [isIngredientDetailsOpen, setIngredientDetailsOpen] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState<Ingredient>();

    const openModal = (ingredientId: string) => {
        setIngredientDetailsOpen(true);
        setSelectedIngredient(fulfilIngredient(ingredientId, data));
    };

    const closeModal = () => {
        setIngredientDetailsOpen(false);
    };

    function setActiveTab(tabName: string) {
        setCurrent(tabName)
        const element = document.getElementById(tabName)
        element?.scrollIntoView({
            behavior: 'smooth'
        })
    }

    function getCardList(type: string) {
        return getDataIdsWithType(data)
            .filter(elem => elem.type === type)
            .map((elem) => (
                <IngredientCard
                    id={elem.id}
                    key={elem.id}
                    cart={cart}
                    setCart={setCart}
                    data={data}
                    onClick={() => openModal(elem.id)}
                />
            ))
    }

    return (
        <div>
            {isIngredientDetailsOpen && <ModalOverlay onClose={closeModal}/>}
            {isIngredientDetailsOpen && (
                <Modal onClose={closeModal}>
                    <IngredientDetails ingredient={selectedIngredient}/>
                </Modal>
            )}
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