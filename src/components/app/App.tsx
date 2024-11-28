import React, {useEffect, useState} from 'react';
import app from './App.module.css';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import {Ingredient} from "../../utils/types";
import {fetchData} from '../../utils/util';

function App() {
    const [cart, setCart] = useState<[{ id: string, type: string, count: number }]>();
    const [data, setData] = useState<Ingredient[]>([]);

    useEffect(() => {
        fetchData()
            .then((data) => {
                setData(data);
            })
            .catch(error => {
                alert(error);
            });
    }, []);

    return (
        <div>
            <AppHeader/>
            <div className={app.constructorContainer}>
                <BurgerIngredients data={data} cart={cart} setCart={setCart}/>
                <BurgerConstructor data={data} cart={cart} setCart={setCart}/>
            </div>
        </div>
    );
}

export default App;
