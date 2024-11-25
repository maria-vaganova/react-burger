import React from 'react';
import './App.module.css';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../BurgerIngredients";

function App() {
    return (
        <div>
            <AppHeader/>
            <div className={"constructor-container"}>
                <BurgerIngredients />
                <BurgerIngredients />
            </div>
        </div>
    );
}

export default App;
