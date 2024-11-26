import React from 'react';
import app from './App.module.css';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor";

function App() {
    return (
        <div>
            <AppHeader/>
            <div className={app.constructorContainer}>
                <BurgerIngredients />
                <BurgerConstructor />
            </div>
        </div>
    );
}

export default App;
