import {Ingredient} from "../../utils/types";
import element from "./IndexedElement.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import {DraggableTypes} from "../../utils/data";
import {useCartDispatch} from "../../services/store";
import {discardIngredientFromCart} from "../../services/actions/cartActions";

export interface IndexedElementProps {
    ingredient: Ingredient,
    displayOrder: number,
    moveElement: (dragIndex: number, hoverIndex: number) => void
}

function IndexedElement({ingredient, displayOrder, moveElement}: IndexedElementProps) {
    const dispatch = useCartDispatch();
    const discardIngredient = (displayOrder: number) => {
        dispatch(discardIngredientFromCart(displayOrder));
    }

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
        <div ref={(node) => drag(drop(node))} className={element.cartItemContent}>
            <DragIcon type="primary" className={"mr-2"}/>
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => discardIngredient(displayOrder)}
            />
        </div>
    );
}

export default IndexedElement;