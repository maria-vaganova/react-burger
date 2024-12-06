import {useEffect, useState} from 'react';
import app from './App.module.css';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import {CartItem, Ingredient} from "../../utils/types";
import {fetchData} from '../../utils/util';
import {OrderNumberContext, CartContext} from "../../services/appContext";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {
    const [cart, setCart] = useState<CartItem[]>([]);
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
                <CartContext.Provider value={{cart, setCart}}>
                    <AppHeader/>
                    <DndProvider backend={HTML5Backend}>
                        <div className={app.constructorContainer}>
                            <BurgerIngredients data={data}/>
                            <BurgerConstructor data={data}/>
                        </div>
                    </DndProvider>
                </CartContext.Provider>
            </OrderNumberContext.Provider>
        </div>
    );
}

export default App;
