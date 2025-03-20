import orderCard from './OrderCard.module.css';
import {IIconData, IIngredient, IOrderFeedInfo} from "../../utils/types";
import {useEffect, useState} from "react";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {fulfilIngredient, getOrderNumberForCard, getRussianNameForStatus} from "../../utils/util";
import {dataInfoSelector, useAppSelector} from "../../services/store";
import {v4 as uuid_v4} from 'uuid';

export interface IOrderCardProps {
    isStatusShown: boolean;
    orderInfo: IOrderFeedInfo;
}

function OrderCard({orderInfo, isStatusShown}: IOrderCardProps) {
    const [orderNumber, setOrderNumber] = useState<string>("none");
    const [orderDate, setOrderDate] = useState<string>("never");
    const [burgerName, setBurgerName] = useState<string>("Death Star Starship Main бургер");
    const [status, setStatus] = useState<string>("none");
    const [burgerPrice, setBurgerPrice] = useState<number>(480);
    const [ingredientList, setIngredientList] = useState<IIngredient[]>([]);
    const [ingredientCount, setIngredientCount] = useState<number>(0);

    const {data} = useAppSelector(dataInfoSelector);

    const [icons, setIcons] = useState<IIconData[]>([]);
    const visibleIconsCount = 6; // Количество видимых иконок
    const [isAllIconsVisible, setIconsVisible] = useState<boolean>();

    useEffect(() => {
        setOrderNumber(getOrderNumberForCard(orderInfo.number));
        setOrderDate(orderInfo.createdAt);
        // ??? setBurgerName();
        if (isStatusShown) setStatus(getRussianNameForStatus(orderInfo.status));
        setIngredientList(orderInfo.ingredients.map((id: string) => fulfilIngredient(id, data)));
    }, []);

    useEffect(() => {
        setIngredientCount(ingredientList?.length || 0);
        let price = 0;
        ingredientList.forEach((ingredient: IIngredient) => {
            price += ingredient.price;
        });
        setIcons(ingredientList.map((ingredient: IIngredient) => ({id: ingredient._id, src: ingredient.image_mobile})));
        setBurgerPrice(price);
    }, [ingredientList]);

    useEffect(() => {
        if (ingredientCount - visibleIconsCount > 0)
            setIconsVisible(true);
        else
            setIconsVisible(false);
    }, [ingredientCount]);

    return (
        <div>
            <div className={orderCard.card}>
                <div className={orderCard.line}>
                    <p className="text text_type_digits-default">#{orderNumber}</p>
                    <p className="text text_type_main-default text_color_inactive">
                        <FormattedDate date={new Date(orderDate)}/>
                    </p>
                </div>
                <p className="text text_type_main-medium mt-6">{burgerName}</p>
                {isStatusShown && (<p className="text text_type_main-default mt-2">{status}</p>)}
                <div className={orderCard.ingredientLine + " mt-6"}>
                    <div>
                        <div className={orderCard.iconList}>
                            {icons.slice(0, visibleIconsCount).map((icon, index) => (
                                <div key={uuid_v4()} className={orderCard.iconItem} data-index={index}>
                                    {isAllIconsVisible && (index === visibleIconsCount - 1) &&
                                        <p className={orderCard.span + " text text_type_main-default"}
                                           data-index={visibleIconsCount}>
                                            +{ingredientCount - visibleIconsCount}
                                        </p>
                                    }
                                    <img className={orderCard.img} src={icon.src} alt="Icon"/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={orderCard.priceLine}>
                        <p className="text text_type_digits-default">{burgerPrice}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderCard;
