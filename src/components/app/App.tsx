import {useEffect} from 'react';
import app from './App.module.css';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {dataStateToProps, useAppSelector, useDataDispatch} from "../../services/store";
import {getData} from "../../services/actions/dataActions";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import IngredientDetailsWrapper from "../../pages/ingredient-details-wrapper/IngredientDetailsWrapper";
import NotFound404 from "../../pages/not-found/NotFound404";
import Login from "../../pages/login/Login";


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
        <BrowserRouter>
            <div>
                <AppHeader/>
                <DndProvider backend={HTML5Backend}>
                    <Routes>
                        <Route path="/" element={
                            <div className={app.constructorContainer}>
                                <BurgerIngredients/>
                                <BurgerConstructor/>
                            </div>
                        }/>
                        <Route path="/ingredients/:id" element={<IngredientDetailsWrapper/>}/>
                        <Route path="/login" element={<Login/>}/>

                        <Route path="*" element={<NotFound404/>}/>
                    </Routes>
                </DndProvider>
            </div>
        </BrowserRouter>
    );
}

export default App;
