import {BUN_TYPE} from "../../utils/data";
import IndexedElement from "../indexed-element/IndexedElement";
import container from "./IndexedContainer.module.css";
import {fulfilIngredient} from "../../utils/util";
import {cartSelector, dataInfoSelector, useAppSelector, useCartDispatch} from "../../services/store";
import {useCallback} from "react";
import {moveItems} from "../../services/actions/cartActions";

function IndexedContainer() {
    const {cart} = useAppSelector(cartSelector);
    const {data} = useAppSelector(dataInfoSelector);

    const dispatchCart = useCartDispatch();
    const moveItem = (fromIndex: number, toIndex: number) => {
        dispatchCart(moveItems(fromIndex, toIndex));
    }

    const moveElement = useCallback((fromIndex: number, toIndex: number) => {
        moveItem(fromIndex, toIndex);
    }, [cart])

    return (
        <div className={container.cart}>
            {cart.map((elem) => {
                if (elem.type !== BUN_TYPE) {
                    return (
                        <IndexedElement key={elem.key}
                                        ingredient={fulfilIngredient(elem.id, data)}
                                        displayOrder={elem.displayOrder}
                                        moveElement={moveElement}
                        />
                    )
                }
            })}
        </div>
    );
}

export default IndexedContainer;