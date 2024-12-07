import {Ingredient} from "../../utils/types";
import constructor from "../burger-constructor/BurgerConstructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {discardIngredientFromCart} from "../../utils/util";
import {useContext} from "react";
import {CartContext} from "../../services/appContext";
import {useDrag, useDrop} from "react-dnd";
import {DraggableTypes} from "../../utils/data";

export interface IndexedElementProps {
    ingredient: Ingredient,
    displayOrder: number,
    moveElement: (dragIndex: number, hoverIndex: number) => void
}

function IndexedElement({ingredient, displayOrder, moveElement}: IndexedElementProps) {
    const cartTotal = useContext(CartContext);

    const [, drag] = useDrag({
        type: DraggableTypes.SORTED_ITEM,
        item: {displayOrder},
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: DraggableTypes.SORTED_ITEM,
        hover(item: { displayOrder: number }) {
            if (item.displayOrder !== displayOrder) {
                moveElement(item.displayOrder, displayOrder);
                item.displayOrder = displayOrder; // Обновление позиции элемента
            }
        },
    });

    return (
        <div ref={(node) => drag(drop(node))} className={constructor.cartItemContent}>
            <DragIcon type="primary" className={"mr-2"}/>
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => discardIngredientFromCart(cartTotal.cart, cartTotal.setCart, displayOrder)}
            />
        </div>
    );
}

export default IndexedElement;