import React from 'react';
import ingredientDetails from "./IngredientDetails.module.css";
import {IngredientDetailInfo} from "../../utils/types";

interface IngredientDetailsProps {
    ingredientDetailInfo: IngredientDetailInfo
}

function IngredientDetails({ingredientDetailInfo}: IngredientDetailsProps) {
    return (
        <div className={ingredientDetails.content}>
            <p className={"text text_type_main-large " + ingredientDetails.title}>Детали ингредиента</p>
            <img alt={"Illustration"} src={ingredientDetailInfo.image_large}
                 className={ingredientDetails.illustration}/>
            <p className="text text_type_main-medium mt-4 mb-8">{ingredientDetailInfo.name}</p>
            <div className={ingredientDetails.info}>
                <div className={ingredientDetails.nutrient}>
                    <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredientDetailInfo.calories}</p>
                </div>
                <div className={ingredientDetails.nutrient}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredientDetailInfo.proteins}</p>
                </div>
                <div className={ingredientDetails.nutrient}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredientDetailInfo.fat}</p>
                </div>
                <div className={ingredientDetails.nutrient}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredientDetailInfo.carbohydrates}</p>
                </div>
            </div>
        </div>
    );
}

export default IngredientDetails;