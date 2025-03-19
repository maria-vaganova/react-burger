import {IIngredient} from "../../utils/types";
import element from "./IndexedElement.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import {DraggableTypes} from "../../utils/data";
import {useCartDispatch} from "../../services/store";
import {discardIngredientFromCart, TCartActions} from "../../services/actions/cartActions";
import {Dispatch} from "redux";

export interface IIndexedElementProps {
    ingredient: IIngredient,
    displayOrder: number,
    moveElement: (dragIndex: number, hoverIndex: number) => void
}

function IndexedElement({ingredient, displayOrder, moveElement}: IIndexedElementProps) {
    const dispatch: Dispatch<TCartActions> = useCartDispatch();
    const discardIngredient: (displayOrder: number) => void = (displayOrder: number): void => {
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
        hover(item: { displayOrder: number }): void {
            if (item.displayOrder !== displayOrder) {
                moveElement(item.displayOrder, displayOrder);
                item.displayOrder = displayOrder; // Обновление позиции элемента
            }
        },
    });

    return (
        <div ref={(node: HTMLDivElement | null) => drag(drop(node))} className={element.cartItemContent}>
            <DragIcon type="primary" className={"mr-2"}/>
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={(): void => discardIngredient(displayOrder)}
            />
        </div>
    );
}

export default IndexedElement;