import {useLocation} from "react-router-dom";
import Modal from "../../components/modal/Modal";
import IngredientDetails from "../../components/ingredient-details/IngredientDetails";

function IngredientDetailsWrapper() {
    const location = useLocation();
    const background = location.state && location.state.background;

    return (
        <div>
            {background ? (
                <Modal onClose={() => window.history.back()}>
                    <IngredientDetails isModal={true}/>
                </Modal>
            ) : (
                <div>
                    <IngredientDetails isModal={false}/>
                </div>
            )}
        </div>
    );
}

export default IngredientDetailsWrapper;