import React from "react";
import { Carousel,  } from "antd";
import { CarouselEffect, DotPosition } from "antd/lib/carousel";

export interface IImageSliderProps {
    images: string[];
    itemStyles?: React.CSSProperties;
    imageStyles?: React.CSSProperties;
    onChange?: (currentSlide: number) => void;
    effect?: CarouselEffect;
    dotPosition?: DotPosition;
    styles?: React.CSSProperties;
}

export const ImageSlider: React.FC<IImageSliderProps> = ({
    images,
    itemStyles,
    imageStyles,
    onChange,
    effect,
    dotPosition,
    styles
}) => {
    return (
        <Carousel
            afterChange={onChange}
            effect={effect}
            dotPosition={dotPosition}
            style={styles}
        >
            {images.map((image) => (
                <div>
                    <div style={itemStyles}>
                        <img
                            src={image}
                            style={imageStyles}
                        />
                    </div>
                </div>
            ))}
        </Carousel>
    );
}
