import React, { useEffect, useState } from "react";
import './styles.css';

export interface ISmallImageSlider {
    maxColItems: number;
    items: string[];
    showLabels?: boolean;
    defaultIndex?: number;
    setIndex?: (index: number) => void;
}

const SmallImageSlider: React.FC<ISmallImageSlider> = ({ items, maxColItems, defaultIndex = 0, showLabels = true }) => {
    const [activeIndex, setActiveIndex] = useState<number>(defaultIndex);

    useEffect(() => {
        setActiveIndex(defaultIndex);
    }, [showLabels]);

    const onMouseMoveHandler = (index: number) => {
        setActiveIndex(index);
    }

    return (
        <div className="sudno-SmallImageSlider flex items-center">
            <img
                className="sudno-SmallImageSlider-image"
                src={items[activeIndex]}
            />
            <div className="sudno-SmallImageSlider-backgroundItems" style={{
                opacity: showLabels ? 1 : 0
            }}>
                {items && items.map((_, index) => (
                    <div
                        key={_.toString()}
                        onMouseMove={() => onMouseMoveHandler(index)}
                        style={{width: `calc(100%/${items.length})`}}
                        className="sudno-SmallImageSlider-backgroundItems-label-wrapper flex items-end"
                    >
                        <div className={'sudno-SmallImageSlider-backgroundItems-label ' + (index === activeIndex ? 'active' : '')}></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SmallImageSlider;
