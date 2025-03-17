import React from 'react';
import section from './CategorySection.module.css';
import {fulfilIngredient, getDataIdsWithType} from "../../utils/util";
import IngredientCard from "../ingredient-card/IngredientCard";
import {dataInfoSelector, useAppSelector, useDetailDispatch} from "../../services/store";
import {
    fulfilIngredientDetails,
    IShowIngredientDetailAction,
    TIngredientDetailActions
} from "../../services/actions/detailActions";
import {Dispatch} from "redux";

export interface ICategorySectionProps {
    id: string,
    name: string,
    type: string,
    openModal: (ingredientId: string) => void
}

function CategorySection({id, name, type, openModal}: ICategorySectionProps) {
    const {data} = useAppSelector(dataInfoSelector);

    const dispatch: Dispatch<TIngredientDetailActions> = useDetailDispatch();
    const showIngredientDetails: (ingredientId: string) => void = (ingredientId: string): void => {
        const getIngredientDetails: IShowIngredientDetailAction = fulfilIngredientDetails(fulfilIngredient(ingredientId, data));
        dispatch(getIngredientDetails);
        openModal(ingredientId);
    }

    return (
        <div>
            <p id={id} className={"text text_type_main-medium"}>
                {name}
            </p>
            <div className={"mt-6 mb-10 mr-4 ml-4 " + section.ingredients}>
                {getDataIdsWithType(data)
                    .filter((elem: { id: string; type: string }): boolean => elem.type === type)
                    .map((elem: { id: string; type: string }) => (
                        <IngredientCard
                            id={elem.id}
                            key={elem.id}
                            onClick={(): void => showIngredientDetails(elem.id)}
                        />
                    ))}
            </div>
        </div>
    );
}

export default CategorySection;
