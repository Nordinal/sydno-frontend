import React, { useEffect, useRef, useState } from "react";
import './styles.css';

export interface IMenuBurger {
    color?: string;
    width?: string;
    height?: string;
    status?: boolean;
    onChange?: (status: boolean) => void;
}

/**
 * Кнопка бургер-меню
 * @author Бурцев И.А.
 * @returns 
 */
export const MenuBurger: React.FC<IMenuBurger> = ({
    color,
    width,
    height,
    status,
    onChange
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [localStatus, setLocalStatus] = useState(status);

    useEffect(() => {
        ref.current?.style.setProperty('--burger-color', color || 'white');
    }, [color]);

    const handleClick = () => {
        if (!localStatus) {
            ref.current?.classList.add('sudno-MenuBurger-active');
            ref.current?.classList.remove('sudno-MenuBurger-disable');
            setLocalStatus(true);
            onChange?.(true);
        } else {
            ref.current?.classList.remove('sudno-MenuBurger-active');
            ref.current?.classList.add('sudno-MenuBurger-disable');
            setLocalStatus(false);
            onChange?.(false);
        }
    }

    return (
        <div
            ref={ref}
            onClick={handleClick}
            className="sudno-MenuBurger"
            style={{
                width: width || '30px',
                height: height || '24px'
            }}
        >
            <div></div>
        </div>
    );
}
