import orderCard from './OrderCard.module.css';
import {IIconData, IIngredient, IOrderFeedInfo} from "../../utils/types";
import {useEffect, useState} from "react";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {countOrderPrice, fulfilIngredient, getOrderNumberForCard, getRussianNameForStatus} from "../../utils/util";
import {dataInfoSelector, useAppSelector} from "../../services/store";
import {v4 as uuid_v4} from 'uuid';
import {useLocation, useNavigate} from "react-router-dom";

export interface IOrderCardProps {
    isStatusShown: boolean;
    orderInfo: IOrderFeedInfo;
}

function OrderCard({orderInfo, isStatusShown}: IOrderCardProps) {
    const [burgerPrice, setBurgerPrice] = useState<number>(480);
    const [ingredientList, setIngredientList] = useState<IIngredient[]>([]);
    const [ingredientCount, setIngredientCount] = useState<number>(0);

    const {data} = useAppSelector(dataInfoSelector);

    const [icons, setIcons] = useState<IIconData[]>([]);
    const visibleIconsCount = 6; // Количество видимых иконок
    const [isAllIconsVisible, setIconsVisible] = useState<boolean>();

    useEffect(() => {
        setIngredientList(orderInfo.ingredients.map((id: string) => fulfilIngredient(id, data)));
    }, []);

    useEffect(() => {
        setIngredientCount(ingredientList?.length || 0);
        setIcons(ingredientList.map((ingredient: IIngredient) => ({id: ingredient._id, src: ingredient.image_mobile})));
        setBurgerPrice(countOrderPrice(ingredientList));
    }, [ingredientList]);

    useEffect(() => {
        if (ingredientCount - visibleIconsCount > 0)
            setIconsVisible(true);
        else
            setIconsVisible(false);
    }, [ingredientCount]);

    const location = useLocation();
    const navigate = useNavigate();

    const openModal = (number: number): void => {
        navigate(`/profile/orders/${number}`, {state: {background: location}});
    };

    return (
        <div>
            <div className={orderCard.card} onClick={() => openModal(orderInfo.number)}>
                <div className={orderCard.line}>
                    <p className="text text_type_digits-default">#{getOrderNumberForCard(orderInfo.number)}</p>
                    <p className="text text_type_main-default text_color_inactive">
                        <FormattedDate date={new Date(orderInfo.createdAt)}/>
                    </p>
                </div>
                <p className="text text_type_main-medium mt-6">{orderInfo.name}</p>
                {isStatusShown && (
                    <p className="text text_type_main-default mt-2">{getRussianNameForStatus(orderInfo.status)}</p>)}
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
