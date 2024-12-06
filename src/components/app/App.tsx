import React, {useEffect, useState} from 'react';
import app from './App.module.css';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import {Ingredient} from "../../utils/types";
import {fetchData} from '../../utils/util';
import {OrderNumberContext} from "../../services/appContext";

function App() {
    const [cart, setCart] = useState<[{ id: string, type: string, count: number }]>();
    const [data, setData] = useState<Ingredient[]>([]);
    const [orderNumber, setOrderNumber] = useState(0);

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
            <OrderNumberContext.Provider value={{orderNumber, setOrderNumber}}>
                <AppHeader/>
                <div className={app.constructorContainer}>
                    <BurgerIngredients data={data} cart={cart} setCart={setCart}/>
                    <BurgerConstructor data={data} cart={cart} setCart={setCart}/>
                </div>
            </OrderNumberContext.Provider>
        </div>
    );
}

export default App;
