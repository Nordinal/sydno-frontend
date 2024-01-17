import { Input } from "antd";
import React from "react";
import { TChangeConfigProperty } from "../types";

export const ProjectNumber: React.FC<{
    project_number?: string | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    project_number,
    changeConfigProperty
}) => {
    return (
        <>
            <p>Номер проекта</p>
            <Input
                value={project_number || undefined}
                onChange={(event) => changeConfigProperty<string>('project_number', event.target.value)}
            />
        </>
    );
}
