import { Button } from "antd";
import React, { SyntheticEvent, useState } from "react";
import { useAdvert } from "../../entities/advert/model";
import { useShallow } from "zustand/react/shallow";
import { useUser } from "Auth/entities";
import { notification } from "antd";
import { HeartTwoTone, StarTwoTone } from "@ant-design/icons";

export interface IAddToFavoriteButtonProps {
    id: string | number;
    isFavorite?: boolean;
    onChange?: (isFavorite: boolean) => void;
    padding?: number;
    fontSize?: string;
}

/**
 * Фича для добавления/удаления обьявления из избранного
 * @returns 
 */
export const AddToFavoriteButton: React.FC<IAddToFavoriteButtonProps> = ({
    id,
    isFavorite,
    onChange,
    padding,
    fontSize
}) => {
    const { addToFavourite, deleteFromFavourite } = useAdvert(useShallow(state => ({addToFavourite: state.addToFavourite, deleteFromFavourite: state.deleteFromFavourite})));
    const { auth } = useUser(useShallow(state => ({auth: state.auth})));
    const [localFavorite, setLocalFavorite] = useState(isFavorite);

    const onButtonClickHandler = (e: SyntheticEvent) => {
        // не забываем что на внешний div карточки навешен onClick, который передается наверх, поэтому всегда останаваливаем всплытие
        e.stopPropagation();

        if (!auth) {
            notification.warning({message: 'Необходимо авторизоваться на сайте', placement: 'bottomRight'});
            return;
        }
        if (!localFavorite) {
            addToFavourite(id)
                .then(res => {
                    if (res) {
                        setLocalFavorite(res);
                        onChange?.(res);
                    }
                })
                .catch(() => {
                    notification.error({message: 'Ошибка', placement: 'bottomRight'});
                });
        }
        else {
            deleteFromFavourite(id)
                .then(res => {
                    if (res) {
                        setLocalFavorite(!res);
                        onChange?.(!res);
                    }
                })
                .catch(() => {
                    notification.error({message: 'Ошибка', placement: 'bottomRight'});
                });
        }
    }

    return (
        <div
            onClick={onButtonClickHandler}
            className={padding ? `p-${padding}` : 'p-2'}
        >
            <StarTwoTone twoToneColor={localFavorite ? '' : '#d9d9d9'}
                style={{fontSize: fontSize || '25px'}}/>
            
        </div>
    );
}
