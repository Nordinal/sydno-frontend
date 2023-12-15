import React from 'react';
import { TChangeConfigProperty } from '../ui/SearhFiltres';
import { Col, Input, Row } from 'antd';
import { CountriesAutoComplete } from '@/shared/ui/CountriesAutoComplete';
import { RegionAutoComplete } from '@/shared/ui/RegionAutoComplete';

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
    <>
        <p>Местонахождение судна</p>
        <Row>
            <Col span={12}>
                <p>страна</p>
                <CountriesAutoComplete
                    value={vessel_location_country}
                    style={{width: '100%'}}
                    placeholder='Выберите страну'
                    onChange={(value) => changeConfigProperty<string>('vessel_location_country', value)}
                    allowClear={true}
                />
            </Col>
            <Col span={12}>
                <p>город</p>
                <RegionAutoComplete
                    value={vessel_location_city}
                    style={{width: '100%'}}
                    allowClear={true}
                    onChange={({city}) => changeConfigProperty<string>('vessel_location_city', city)}
                />
                {/* <Input
                    style={{width: '100%'}}
                    value={vessel_location_city}
                    onChange={(event) => changeConfigProperty<string>('vessel_location_city', event.target.value)}
                /> */}
            </Col>
        </Row>
    </>
  )
}

export default VesselLocation;
