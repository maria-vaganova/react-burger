import React from 'react';
import './IngredientCard.module.css';

export interface IngredientCardProps {
    id: string
}

function IngredientCard({id}: IngredientCardProps) {
    return (
        <div className="ingredient-card">id</div>
    );
}

export default IngredientCard;
