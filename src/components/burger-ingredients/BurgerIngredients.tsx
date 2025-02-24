import {useEffect, useState} from 'react';
import ingredients from './BurgerIngredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {BUN_TYPE, MAIN_TYPE, SAUCE_TYPE} from "../../utils/data";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import ModalOverlay from "../modal/ModalOverlay";
import Modal from "../modal/Modal";
import CategorySection from "../category-section/CategorySection";
import {useLocation, useParams, useNavigate} from "react-router-dom";

function BurgerIngredients() {
    const [current, setCurrent] = useState<string>(BUN_TYPE);
    const [isIngredientDetailsOpen, setIngredientDetailsOpen] = useState(false);

    const {id} = useParams<{ id: string }>();
    const location = useLocation();
    const navigate = useNavigate();

    const openModal = (ingredientId: string) => {
        navigate(`/ingredients/${ingredientId}`, {state: {background: location}});
        setIngredientDetailsOpen(true);
    };

    const closeModal = () => {
        navigate(-1);
        setIngredientDetailsOpen(false);
    };

    useEffect(() => {
        if (location.state && location.state.background) {
            setIngredientDetailsOpen(true);
        } else if (id) {
            setIngredientDetailsOpen(false);
        }
    }, [id, location]);

    const handleScroll = () => {
        const bun = document.getElementById("bun");
        const sauce = document.getElementById("sauce");
        const main = document.getElementById("main");

        if (!bun || !sauce || !main) {
            console.log("Элементы не найдены в DOM");
            return;
        }

        const bunRect = bun.getBoundingClientRect();
        const sauceRect = sauce.getBoundingClientRect();
        const mainRect = main.getBoundingClientRect();

        const scrollY = window.scrollY || window.pageYOffset;

        const offsets = {
            bun: bunRect.top + scrollY,
            sauce: sauceRect.top + scrollY,
            main: mainRect.top + scrollY,
        };

        type IngredientsKeys = "bun" | "sauce" | "main";
        const closestTab = Object.keys(offsets).reduce((closest, current) => {
            const closestValue = Math.abs(offsets[closest as IngredientsKeys]);
            const currentValue = Math.abs(offsets[current as IngredientsKeys]);
            return currentValue < closestValue ? current : closest;
        }, "bun" as IngredientsKeys);

        setCurrent(closestTab);
    };

    useEffect(() => {
        const container = document.getElementById('scrollable-container');
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    function setActiveTab(tabName: string) {
        setCurrent(tabName)
        const element = document.getElementById(tabName)
        element?.scrollIntoView({
            behavior: 'smooth'
        })
    }

    return (
        <div>
            {isIngredientDetailsOpen && <ModalOverlay onClose={closeModal}/>}
            {isIngredientDetailsOpen && (
                <Modal onClose={closeModal}>
                    <IngredientDetails/>
                </Modal>
            )}
            {id && !isIngredientDetailsOpen && <IngredientDetails/>}
            {!id && (
                <>
                    <h1 className="text_type_main-large mt-10 mb-5">Соберите бургер</h1>
                    <div style={{display: 'flex'}}>
                        <Tab value={BUN_TYPE}
                             active={current === BUN_TYPE}
                             onClick={() => setActiveTab(BUN_TYPE)}
                        >
                            Булки
                        </Tab>
                        <Tab value={SAUCE_TYPE}
                             active={current === SAUCE_TYPE}
                             onClick={() => setActiveTab(SAUCE_TYPE)}
                        >
                            Соусы
                        </Tab>
                        <Tab value={MAIN_TYPE}
                             active={current === MAIN_TYPE}
                             onClick={() => setActiveTab(MAIN_TYPE)}
                        >
                            Начинки
                        </Tab>
                    </div>
                    <div className={"mt-10 " + ingredients.scrollableContainer} id="scrollable-container">
                        <CategorySection id="bun"
                                         name="Булки"
                                         type={BUN_TYPE}
                                         openModal={(ingredientId: string) => openModal(ingredientId)}/>
                        <CategorySection id="sauce"
                                         name="Соусы"
                                         type={SAUCE_TYPE}
                                         openModal={(ingredientId: string) => openModal(ingredientId)}/>
                        <CategorySection id="main"
                                         name="Начинки"
                                         type={MAIN_TYPE}
                                         openModal={(ingredientId: string) => openModal(ingredientId)}/>
                    </div>
                </>
            )}
        </div>
    );
}

export default BurgerIngredients;