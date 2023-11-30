import React from 'react';
import { TChangeConfigProperty } from '../ui/SearhFiltres';
import { Input } from 'antd';

const PortAdress: React.FC<{
    port_adress_country?: string;
    port_adress_city?: string;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    port_adress_country,
    port_adress_city,
    changeConfigProperty
}) => {
  return (
    <div className='flex'>
        <div className="">
            <p>страна</p>
            <Input
                style={{width: '100%'}}
                value={port_adress_country}
                onChange={(event) => changeConfigProperty<string>('port_adress_country', event.target.value)}
            />
        </div>
        <div className="">
            <p>город</p>
            <Input
                style={{width: '100%'}}
                value={port_adress_city}
                onChange={(event) => changeConfigProperty<string>('port_adress_city', event.target.value)}
            />
        </div>
    </div>
  )
}

export default PortAdress;
