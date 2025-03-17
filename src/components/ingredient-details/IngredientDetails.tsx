import React from 'react';
import ingredientDetails from "./IngredientDetails.module.css";
import {useAppSelector} from "../../services/store";
import {useParams} from "react-router";
import {IIngredient} from "../../utils/types";
import NotFound404 from "../../pages/not-found/NotFound404";

interface IIngredientDetailsProps {
    isModal: boolean
}

function IngredientDetails({isModal}: IIngredientDetailsProps) {

    const {id} = useParams<{ id: string }>();
    const ingredients: IIngredient[] = useAppSelector((state) => state.data.dataInfo);

    const ingredientDetailInfo: IIngredient | undefined = ingredients.find((item: IIngredient): boolean => item._id === id);

    if (!ingredientDetailInfo) {
        return (
            <NotFound404/>
        );
    }

    const titleStyle: string = isModal
        ? "text text_type_main-large " + ingredientDetails.titleModal
        : "text text_type_main-large " + ingredientDetails.title;

    return (
        <div className={ingredientDetails.content}>
            <p className={titleStyle}>Детали ингредиента</p>
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