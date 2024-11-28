import React from 'react';
import ModalOverlay from "../modal/ModalOverlay";
import Modal from "../modal/Modal";
import ingredientDetails from "./IngredientDetails.module.css";
import {Ingredient} from "../../utils/types";

interface IngredientDetailsProps {
    isOpen: boolean,
    closeModal: () => void,
    ingredient: Ingredient | undefined
}

function IngredientDetails({isOpen, closeModal, ingredient}: IngredientDetailsProps) {
    if (ingredient !== undefined) {
        return (
            <div>
                {isOpen && <ModalOverlay onClose={closeModal}/>}
                {isOpen && (
                    <Modal onClose={closeModal}>
                        <div className={ingredientDetails.content}>
                            <p className={"text text_type_main-large " + ingredientDetails.title}>Детали ингредиента</p>
                            <img alt={"Illustration"} src={ingredient.image_large}
                                 className={ingredientDetails.illustration}/>
                            <p className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</p>
                            <div className={ingredientDetails.info}>
                                <div className={ingredientDetails.nutrient}>
                                    <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                                    <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
                                </div>
                                <div className={ingredientDetails.nutrient}>
                                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                                    <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
                                </div>
                                <div className={ingredientDetails.nutrient}>
                                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                                    <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
                                </div>
                                <div className={ingredientDetails.nutrient}>
                                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                                    <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
                                </div>
                            </div>
                        </div>
                    </Modal>
                )}
            </div>
        );
    } else {
        alert("ingredient is undefined");
        return (<></>);
    }
}

export default IngredientDetails;