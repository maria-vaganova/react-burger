import React from 'react';
import app from './App.module.css';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../BurgerIngredients";

function App() {
    return (
        <div>
            <AppHeader/>
            {/*<div>*/}
            <div className={app.constructorContainer}>
                <BurgerIngredients />
                <BurgerIngredients />
            </div>
        </div>
    );
}

export default App;
