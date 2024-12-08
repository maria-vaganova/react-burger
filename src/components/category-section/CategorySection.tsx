import React from 'react';
import section from './CategorySection.module.css';
import {fulfilIngredient, getDataIdsWithType} from "../../utils/util";
import IngredientCard from "../ingredient-card/IngredientCard";
import {dataInfoSelector, useAppSelector, useDetailDispatch} from "../../services/store";
import {fulfilIngredientDetails} from "../../services/actions/detailActions";

export interface CategorySectionProps {
    id: string,
    name: string,
    type: string,
    openModal: () => void
}

function CategorySection({id, name, type, openModal}: CategorySectionProps) {
    const {data} = useAppSelector(dataInfoSelector);

    const dispatch = useDetailDispatch();
    const showIngredientDetails = (ingredientId: string) => {
        const getIngredientDetails = fulfilIngredientDetails(fulfilIngredient(ingredientId, data));
        dispatch(getIngredientDetails);
        openModal();
    }

    return (
        <div>
            <p id={id} className={"text text_type_main-medium"}>
                {name}
            </p>
            <div className={"mt-6 mb-10 mr-4 ml-4 " + section.ingredients}>
                {getDataIdsWithType(data)
                    .filter(elem => elem.type === type)
                    .map((elem) => (
                        <IngredientCard
                            id={elem.id}
                            key={elem.id}
                            onClick={() => showIngredientDetails(elem.id)}
                        />
                    ))}
            </div>
        </div>
    );
}

export default CategorySection;
