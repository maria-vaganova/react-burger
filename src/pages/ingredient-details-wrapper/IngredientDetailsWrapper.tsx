import {useLocation} from "react-router-dom";
import Modal from "../../components/modal/Modal";
import IngredientDetails from "../../components/ingredient-details/IngredientDetails";
import BurgerIngredients from "../../components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../../components/burger-constructor/BurgerConstructor";
import app from "../../components/app/App.module.css";

function IngredientDetailsWrapper() {
    const location = useLocation();
    const background = location.state?.background;

    if (!background) {
        return (
            <div>
                <IngredientDetails isModal={false}/>
            </div>
        );
    }

    return (
        <>
            <div className={app.constructorContainer}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </div>
            <Modal onClose={(): void => window.history.back()}>
                <IngredientDetails isModal={true}/>
            </Modal>
        </>
    );
}

export default IngredientDetailsWrapper;