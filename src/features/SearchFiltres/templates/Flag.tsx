import React from "react";
import { TChangeConfigProperty } from "../types";
import { CountriesAutoComplete } from "@/shared/ui/CountriesAutoComplete";

export const Flag: React.FC<{
    flag?: string | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    flag,
    changeConfigProperty
}) => {
    return (
        <>
            <p>Флаг</p>
            <CountriesAutoComplete
                value={flag || undefined}
                style={{width: '100%'}}
                placeholder='Выберите флаг'
                onChange={(value: string) => changeConfigProperty<string>('flag', value)}
                allowClear={true}
            />
        </>
    );
}
