import {useEffect, useState} from 'react';
import app from './App.module.css';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {
    dataStateToProps, loginStateToProps,
    useAppSelector,
    useDataDispatch
} from "../../services/store";
import {getData} from "../../services/actions/dataActions";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import IngredientDetailsWrapper from "../../pages/ingredient-details-wrapper/IngredientDetailsWrapper";
import NotFound404 from "../../pages/not-found/NotFound404";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
import ForgotPassword from "../../pages/forgot-password/ForgotPassword";
import ResetPassword from "../../pages/reset-password/ResetPassword";
import Profile from "../../pages/profile/Profile";
import ProtectedRouteElement from "../protected-route/ProtectedRouteElement";


function App() {
    const dataDispatch = useDataDispatch();
    const {dataRequest, dataFailed} = useAppSelector(dataStateToProps);

    useEffect(() => {
        dataDispatch(getData());

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
                        <Route path="/login" element={
                            <ProtectedRouteElement isAuthorizedRedirect={true}>
                                <Login/>
                            </ProtectedRouteElement>}
                        />
                        <Route path="/register" element={
                            <ProtectedRouteElement isAuthorizedRedirect={true}>
                                <Register/>
                            </ProtectedRouteElement>}
                        />
                        <Route path="/forgot-password" element={
                            <ProtectedRouteElement isAuthorizedRedirect={true}>
                                <ForgotPassword/>
                            </ProtectedRouteElement>}
                        />
                        <Route path="/reset-password" element={
                            <ProtectedRouteElement isAuthorizedRedirect={true}>
                                <ResetPassword/>
                            </ProtectedRouteElement>}
                        />
                        <Route path="/profile" element={
                            <ProtectedRouteElement redirectPath={"/login"}>
                                <Profile/>
                            </ProtectedRouteElement>}
                        />

                        <Route path="*" element={<NotFound404/>}/>
                    </Routes>
                </DndProvider>
            </div>
        </BrowserRouter>
    );
}

export default App;
