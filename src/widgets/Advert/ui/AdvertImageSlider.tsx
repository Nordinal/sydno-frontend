import React from "react";
import { ImageSlider } from "@/shared/ui/ImageSlider";

export interface ISliderProps {
    images: string[];
    onChange?: (currentSlide: number) => void;
}

const IMAGE_ITEM_STYLES: React.CSSProperties = {
    height: '400px',
    width: '100%',
}

const SLIDER_STYLES: React.CSSProperties = {
    borderRadius: '12px',
    overflow: 'hidden'
}

const IMAGE_STYLES: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
}

export const AdvertImageSlider: React.FC<ISliderProps> = ({
    images,
    onChange,
}) => {
    return (
        <ImageSlider
            images={images}
            onChange={onChange}
            itemStyles={IMAGE_ITEM_STYLES}
            imageStyles={IMAGE_STYLES}
            styles={SLIDER_STYLES}
        />
    );
}
