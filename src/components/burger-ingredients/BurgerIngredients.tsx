import {useEffect, useState} from 'react';
import ingredients from './BurgerIngredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {BUN_TYPE, MAIN_TYPE, SAUCE_TYPE} from "../../utils/data";
import CategorySection from "../category-section/CategorySection";
import {Outlet, useLocation, useNavigate} from "react-router-dom";

function BurgerIngredients() {
    const [current, setCurrent] = useState<string>(BUN_TYPE);

    const location = useLocation();
    const navigate = useNavigate();

    const openModal = (ingredientId: string): void => {
        navigate(`/ingredients/${ingredientId}`, {state: {background: location}});
    };

    const handleScroll = (): void => {
        const bun: HTMLElement | null = document.getElementById("bun");
        const sauce: HTMLElement | null = document.getElementById("sauce");
        const main: HTMLElement | null = document.getElementById("main");

        if (!bun || !sauce || !main) {
            console.log("Элементы не найдены в DOM");
            return;
        }

        const bunRect = bun.getBoundingClientRect();
        const sauceRect = sauce.getBoundingClientRect();
        const mainRect = main.getBoundingClientRect();

        const scrollY: number = window.scrollY || window.pageYOffset;

        const offsets = {
            bun: bunRect.top + scrollY,
            sauce: sauceRect.top + scrollY,
            main: mainRect.top + scrollY,
        };

        type IngredientsKeys = "bun" | "sauce" | "main";
        const closestTab: string = Object.keys(offsets).reduce((closest: string, current: string): string => {
            const closestValue: number = Math.abs(offsets[closest as IngredientsKeys]);
            const currentValue: number = Math.abs(offsets[current as IngredientsKeys]);
            return currentValue < closestValue ? current : closest;
        }, "bun" as IngredientsKeys);

        setCurrent(closestTab);
    };

    useEffect((): () => void => {
        const container: HTMLElement | null = document.getElementById('scrollable-container');
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        return (): void => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    function setActiveTab(tabName: string): void {
        setCurrent(tabName)
        const element: HTMLElement | null = document.getElementById(tabName)
        element?.scrollIntoView({
            behavior: 'smooth'
        })
    }

    return (
        <div>
            <Outlet/>
            <h1 className="text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div style={{display: 'flex'}}>
                <Tab value={BUN_TYPE}
                     active={current === BUN_TYPE}
                     onClick={(): void => setActiveTab(BUN_TYPE)}
                >
                    Булки
                </Tab>
                <Tab value={SAUCE_TYPE}
                     active={current === SAUCE_TYPE}
                     onClick={(): void => setActiveTab(SAUCE_TYPE)}
                >
                    Соусы
                </Tab>
                <Tab value={MAIN_TYPE}
                     active={current === MAIN_TYPE}
                     onClick={(): void => setActiveTab(MAIN_TYPE)}
                >
                    Начинки
                </Tab>
            </div>
            <div className={"mt-10 " + ingredients.scrollableContainer} id="scrollable-container">
                <CategorySection id="bun"
                                 name="Булки"
                                 type={BUN_TYPE}
                                 openModal={(ingredientId: string): void => openModal(ingredientId)}/>
                <CategorySection id="sauce"
                                 name="Соусы"
                                 type={SAUCE_TYPE}
                                 openModal={(ingredientId: string): void => openModal(ingredientId)}/>
                <CategorySection id="main"
                                 name="Начинки"
                                 type={MAIN_TYPE}
                                 openModal={(ingredientId: string): void => openModal(ingredientId)}/>
            </div>
        </div>
    );
}

export default BurgerIngredients;