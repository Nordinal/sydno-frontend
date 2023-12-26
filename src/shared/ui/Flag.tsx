import React from "react";

export const Flag: React.FC<{
    alt?: string;
    country_code: string;
    width?: number;
    height?: number;
    styles?: React.CSSProperties;
    className?: string;
    onClick?: () => void;
}> = ({
    alt,
    country_code,
    width,
    height,
    styles,
    className,
    onClick,
}) => {
    return (
        <img
            alt={alt}
            width={width || 30}
            height={height || 20}
            src={'/flags/' + country_code + '.svg'}
            style={styles}
            className={className}
            onClick={onClick}
        />
    );
}
