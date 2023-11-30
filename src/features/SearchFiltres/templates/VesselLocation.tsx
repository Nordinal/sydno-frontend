import React from 'react';
import { TChangeConfigProperty } from '../ui/SearhFiltres';
import { Input } from 'antd';

const VesselLocation: React.FC<{
    vessel_location_country?: string;
    vessel_location_city?: string;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    vessel_location_country,
    vessel_location_city,
    changeConfigProperty
}) => {
  return (
    <div className='flex'>
        <div className="">
            <p>страна</p>
            <Input
                style={{width: '100%'}}
                value={vessel_location_country}
                onChange={(event) => changeConfigProperty<string>('vessel_location_country', event.target.value)}
            />
        </div>
        <div className="">
            <p>город</p>
            <Input
                style={{width: '100%'}}
                value={vessel_location_city}
                onChange={(event) => changeConfigProperty<string>('vessel_location_city', event.target.value)}
            />
        </div>
    </div>
  )
}

export default VesselLocation;
