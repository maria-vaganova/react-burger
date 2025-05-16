import {useEffect, useState} from 'react';
import app from './App.module.css';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {
    dataStateToProps,
    loadingSelector,
    useAppSelector,
    useDataDispatch,
    useLoadingDispatch
} from "../../services/store";
import {getData} from "../../services/actions/dataActions";
import {startLoading, stopLoading} from "../../services/actions/loadingActions";
import {HashRouter, Route, Routes} from "react-router-dom";
import IngredientDetailsWrapper from "../../pages/ingredient-details-wrapper/IngredientDetailsWrapper";
import NotFound404 from "../../pages/not-found/NotFound404";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
import ForgotPassword from "../../pages/forgot-password/ForgotPassword";
import ResetPassword from "../../pages/reset-password/ResetPassword";
import Profile from "../../pages/profile/Profile";
import ProtectedRouteElement from "../protected-route/ProtectedRouteElement";
import Orders from "../../pages/orders/Orders";
import WarningModal from "../modal/WarningModal";
import OrderByIdWrapper from "../../pages/order-by-id-wrapper/OrderByIdWrapper";
import Loader from "../loader/Loader";
import OrderFeed from "../../pages/order-feed/OrderFeed";

function App() {
    const dataDispatch = useDataDispatch();
    const {dataRequest, dataFailed} = useAppSelector(dataStateToProps);
    const {loading} = useAppSelector(loadingSelector);

    const dispatchLoading = useLoadingDispatch();

    const [modalMessage, setModalMessage] = useState("");
    const [isMessageModalOpen, setMessageModalOpen] = useState(false);

    const openModal = (message: string): void => {
        setModalMessage(message);
        setMessageModalOpen(true);
    };

    const closeModal = (): void => {
        setMessageModalOpen(false);
        setModalMessage("");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dataDispatch(getData());
                dispatchLoading(stopLoading());
            } catch (error) {
                dispatchLoading(stopLoading());
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (dataFailed) {
            dispatchLoading(stopLoading());
            openModal("Ошибка сети: не удалось получить данные");
        } else if (dataRequest) {
            dispatchLoading(startLoading());
        }
    }, [dataFailed, dataRequest]);

    return (
        <HashRouter>
            {loading && (
                <Loader/>
            )}
            {isMessageModalOpen && (
                <WarningModal closeModal={closeModal} message={modalMessage}/>
            )}
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

                        <Route path="/feed/" element={<OrderFeed/>}/>
                        <Route path="/feed/:number" element={<OrderByIdWrapper/>}/>

                        <Route path="/login" element={
                            <ProtectedRouteElement redirectPath={"/"} isAuthorizedRedirect={true}>
                                <Login/>
                            </ProtectedRouteElement>}
                        />
                        <Route path="/register" element={
                            <ProtectedRouteElement redirectPath={"/"} isAuthorizedRedirect={true}>
                                <Register/>
                            </ProtectedRouteElement>}
                        />
                        <Route path="/forgot-password" element={
                            <ProtectedRouteElement redirectPath={"/"} isAuthorizedRedirect={true}>
                                <ForgotPassword/>
                            </ProtectedRouteElement>}
                        />
                        <Route path="/reset-password" element={
                            <ProtectedRouteElement redirectPath={"/"} isAuthorizedRedirect={true}>
                                <ResetPassword/>
                            </ProtectedRouteElement>}
                        />
                        <Route path="/profile" element={
                            <ProtectedRouteElement redirectPath={"/login"} isAuthorizedRedirect={false}>
                                <Profile/>
                            </ProtectedRouteElement>}
                        />
                        <Route path={'/profile/orders'} element={
                            <ProtectedRouteElement redirectPath={"/login"} isAuthorizedRedirect={false}>
                                <Orders/>
                            </ProtectedRouteElement>}
                        />
                        <Route path={'/profile/orders/:number'} element={
                            <ProtectedRouteElement redirectPath={"/login"} isAuthorizedRedirect={false}>
                                <OrderByIdWrapper/>
                            </ProtectedRouteElement>}
                        />

                        <Route path="*" element={<NotFound404/>}/>
                    </Routes>
                </DndProvider>
            </div>
        </HashRouter>
    );
}

export default App;
