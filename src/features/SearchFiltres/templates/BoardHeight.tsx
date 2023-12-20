import React from 'react';
import { TChangeConfigProperty } from '../ui/SearhFiltres';
import { InputNumber } from 'antd';

const BoardHeight: React.FC<{
    min_board_height?: number | null;
    max_board_height?: number | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    min_board_height,
    max_board_height,
    changeConfigProperty
}) => {
  return (
    <div>
        <p>Высота борта</p>
        <InputNumber
            value={min_board_height}
            min={0.05}
            max={74}
            step={0.01}
            onChange={(value) => changeConfigProperty<number | undefined>('min_board_height', value || undefined)}
            formatter={(value) => value ? `${value} м` : ''}
        />
        <InputNumber
            value={max_board_height}
            min={0.05}
            max={74}
            step={0.01}
            onChange={(value) => changeConfigProperty<number | undefined>('max_board_height', value || undefined)}
            formatter={(value) => value ? `${value} м` : ''}
        />
    </div>
  )
}

export default BoardHeight;
