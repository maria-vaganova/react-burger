import {useEffect} from 'react';
import app from './App.module.css';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {dataStateToProps, useAppSelector, useDataDispatch} from "../../services/store";
import {getData} from "../../services/actions/dataActions";


function App() {
    const dispatch = useDataDispatch();
    const {dataRequest, dataFailed} = useAppSelector(dataStateToProps);

    useEffect(() => {
        dispatch(getData());

        if (dataFailed) {
            return alert(('Ошибка сети'));
        } else if (dataRequest) {
            return alert(('Загрузка...'));
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
