import React, { useEffect, useRef, useState } from "react";
import './styles.css';

export interface ISmallImageSlider {
    maxItems: number;
    items: string[];
    showLabels?: boolean;
    defaultIndex?: number;
    setIndex?: (index: number) => void;
    imageClass?: string;
    fallbackImageSrc?: string;
}

export const SmallImageSlider: React.FC<ISmallImageSlider> = ({ items, maxItems, defaultIndex = 0, showLabels = true, fallbackImageSrc = '', imageClass }) => {
    const [activeIndex, setActiveIndex] = useState<number>(defaultIndex);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        setActiveIndex(defaultIndex);
    }, [showLabels]);

    const onImageErrorLoad = () => {
        if (imageRef.current) {
            imageRef.current.onerror = () => {
                if (imageRef.current) {
                    imageRef.current.src = fallbackImageSrc;
                }
            }
        }
    }

    const onMouseMoveHandler = (index: number) => {
        setActiveIndex(index);
    }

    return (
        <div className="sudno-SmallImageSlider flex items-center">
            <img
                ref={imageRef}
                src={items[activeIndex]}
                className={'sudno-SmallImageSlider-image ' + imageClass}
                onError={onImageErrorLoad}
                alt=""
            />
            <div
                className="sudno-SmallImageSlider-backgroundItems"
                style={{
                    opacity: showLabels ? 1 : 0
                }}
            >
                {items && items.map((_, index) => (
                    <div
                        key={_.toString()}
                        onMouseMove={() => onMouseMoveHandler(index)}
                        style={{ width: `calc(100%/${items.length})` }}
                        className="sudno-SmallImageSlider-backgroundItems-label-wrapper flex items-end"
                    >
                        <div
                            className={'sudno-SmallImageSlider-backgroundItems-label ' + (index === activeIndex ? 'active' : '')}
                        >
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
