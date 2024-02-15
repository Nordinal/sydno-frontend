import React from 'react';
import { TChangeConfigProperty } from '../types';
import { Col, Row } from 'antd';
import { CountriesSelector, RegionSelector } from 'SydnoComponents/selectors';

export const VesselLocation: React.FC<{
    vessel_location_country?: string | null;
    vessel_location_city?: string | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({ vessel_location_country, vessel_location_city, changeConfigProperty }) => {
    return (
        <>
            <p>Местонахождение судна</p>
            <Row>
                <Col span={12}>
                    <p style={{ width: '98%' }}>страна</p>
                    <CountriesSelector
                        value={vessel_location_country || undefined}
                        style={{ width: '98%' }}
                        placeholder='Выберите страну'
                        onChange={(value: string) => changeConfigProperty<string>('vessel_location_country', value)}
                        allowClear={true}
                    />
                </Col>
                <Col span={12}>
                    <p style={{ width: '98%', marginLeft: '2%' }}>город</p>
                    <RegionSelector
                        value={(vessel_location_city as any) || undefined}
                        style={{ width: '98%', marginLeft: '2%' }}
                        allowClear={true}
                        onChange={({ city }: any) => changeConfigProperty<string>('vessel_location_city', city)}
                    />
                </Col>
            </Row>
        </>
    );
};
