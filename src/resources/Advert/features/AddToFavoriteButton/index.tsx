import { Button } from "antd";
import React, { SyntheticEvent, useState } from "react";
import { useAdvert } from "../../entities/advert/model";
import { useShallow } from "zustand/react/shallow";
import { useUser } from "Auth/entities";
import { notification } from "antd";

export interface IAddToFavoriteButtonProps {
    id: string | number;
    isFavorite?: boolean;
    onChange?: (isFavorite: boolean) => void;
}

/**
 * Фича для добавления/удаления обьявления из избранного
 * @returns 
 */
export const AddToFavoriteButton: React.FC<IAddToFavoriteButtonProps> = ({
    id,
    isFavorite,
    onChange
}) => {
    const { addToFavourite, deleteFromFavourite } = useAdvert(useShallow(state => ({addToFavourite: state.addToFavourite, deleteFromFavourite: state.deleteFromFavourite})));
    const { auth } = useUser(useShallow(state => ({auth: state.auth})));
    const [localFavorite, setLocalFavorite] = useState(isFavorite);
    const [isLoading, setIsLoading] = useState(false);

    const onButtonClickHandler = (e: SyntheticEvent) => {
        // не забываем что на внешний div карточки навешен onClick, который передается наверх, поэтому всегда останаваливаем всплытие
        e.stopPropagation();

        if (!auth) {
            notification.warning({message: 'Необходимо авторизоваться на сайте', placement: 'bottomRight'});
            return;
        }
        if (!localFavorite) {
            setIsLoading(true);
            addToFavourite(id).then(res => {
                if (res) {
                    notification.success({message: 'Добавлено в "Избранные"', placement: 'bottomRight'});
                    setLocalFavorite(res);
                    onChange?.(res);
                } else {
                    notification.error({message: 'Ошибка', placement: 'bottomRight'});
                }
                setIsLoading(false);
            });
        }
        else {
            setIsLoading(true);
            deleteFromFavourite(id).then(res => {
                if (res) {
                    notification.success({message: 'Удалено из "Избранные"', placement: 'bottomRight'});
                    setLocalFavorite(!res);
                    onChange?.(!res);
                } else {
                    notification.error({message: 'Ошибка', placement: 'bottomRight'});
                }
                setIsLoading(false);
            });
        }
    }

    return (
        <Button
            type="primary"
            onClick={onButtonClickHandler}
        >
            {localFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        </Button>
    );
}
