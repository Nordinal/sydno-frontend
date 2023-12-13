import { Input } from "antd";
import React from "react";
import { TChangeConfigProperty } from "../types";

const ProjectNumber: React.FC<{
    project_number?: string;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    project_number,
    changeConfigProperty
}) => {
    return (
        <>
            <p>Номер проекта</p>
            <Input
                value={project_number}
                onChange={(event) => changeConfigProperty<string>('project_number', event.target.value)}
            />
        </>
    );
}

export default ProjectNumber;
