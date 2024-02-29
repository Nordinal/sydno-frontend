import { Button } from 'antd';
import React, { SyntheticEvent, useState } from 'react';
import { useAdvert } from '../../entities/advert/model';
import { useShallow } from 'zustand/react/shallow';
import { useUser } from 'Auth/entities';
import { notification } from 'antd';
import { StarFilled } from '@ant-design/icons';
import s from './styles.module.css';

export interface IAddToFavoriteButtonProps {
    id: string | number;
    isFavorite?: boolean;
    onChange?: (isFavorite: boolean) => void;
    className?: string;
}

/**
 * Фича для добавления/удаления обьявления из избранного
 * @returns
 */
export const FavoriteButton: React.FC<IAddToFavoriteButtonProps> = ({ id, isFavorite, onChange, className }) => {
    const { addToFavourite, deleteFromFavourite } = useAdvert(
        useShallow((state) => ({
            addToFavourite: state.addToFavourite,
            deleteFromFavourite: state.deleteFromFavourite
        }))
    );
    const { auth } = useUser(useShallow((state) => ({ auth: state.auth })));
    const [localFavorite, setLocalFavorite] = useState(isFavorite);
    const [animated, setAnimated] = useState(false);

    const clickHandler = (e: SyntheticEvent) => {
        e.stopPropagation();

        if (!auth) {
            notification.warning({ message: 'Необходимо авторизоваться на сайте', placement: 'bottomRight' });
            return;
        }
        if (!localFavorite) {
            setAnimated(true);
            setLocalFavorite(!localFavorite);
            addToFavourite(id)
                .then((res) => onChange?.(res))
                .catch(() => {
                    notification.error({ message: 'Ошибка', placement: 'bottomRight' });
                });
        } else {
            setAnimated(false);
            setLocalFavorite(!localFavorite);
            deleteFromFavourite(id)
                .then((res) => onChange?.(!res))
                .catch(() => {
                    notification.error({ message: 'Ошибка', placement: 'bottomRight' });
                });
        }
    };

    return (
        <div
            title='Добавить в избранное'
            onClick={clickHandler}
            className={s['favorite-button__container'] + ' ' + className}
        >
            <StarFilled
                className={
                    (localFavorite ? s['favorite-button__star_favorite'] : s['favorite-button__star_unfavorite']) + ' ' + 
                    (animated ? s['favorite-button__star_animate'] : '')
                }
            />
            {animated
                ? (
                    <StarFilled
                        className={s['favorite-button__star_two_animate']}
                    />
                )
                : null
            }
        </div>
    );
};
