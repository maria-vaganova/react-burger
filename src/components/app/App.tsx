import React from 'react';
import app from './App.module.css';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";

function App() {
    const [cart, setCart] = React.useState<[{ id: string, type: string, count: number }]>();

    return (
        <div>
            <AppHeader/>
            <div className={app.constructorContainer}>
                <BurgerIngredients cart={cart} setCart={setCart}/>
                <BurgerConstructor cart={cart} setCart={setCart}/>
            </div>
        </div>
    );
}

export default App;
