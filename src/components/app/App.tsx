import {useEffect, useState} from 'react';
import app from './App.module.css';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import {CartItem, DataState} from "../../utils/types";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useAppSelector, useDataDispatch} from "../../services/store";
import {getData} from "../../services/actions/dataActions";


function App() {
    // const [cart, setCart] = useState<CartItem[]>([]);

    const dispatch = useDataDispatch();
    const {dataRequest, dataFailed, dataInfo} = useAppSelector((state: { data: DataState }) => ({
        dataRequest: state.data.dataRequest,
        dataFailed: state.data.dataFailed,
        dataInfo: state.data.dataInfo
    }))

    useEffect(() => {
        dispatch(getData());

        if (dataFailed) {
            return alert(('Ошибка сети'));
        } else if (dataRequest) {
            return alert(('Загрузка...'));
        } else {
            console.log("orderInfo - ", dataInfo);
        }
    }, []);

    return (
        <div>
            <AppHeader/>
            <DndProvider backend={HTML5Backend}>
                <div className={app.constructorContainer}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </div>
            </DndProvider>
        </div>
    );
}

export default App;
