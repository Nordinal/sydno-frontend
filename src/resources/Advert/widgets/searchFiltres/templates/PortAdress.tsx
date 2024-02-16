import React from 'react';
import { TChangeConfigProperty } from '../types';
import { CountriesSelector, RegionSelector } from 'SydnoComponents/selectors';
import { Col, Row } from 'antd';

export const PortAdress: React.FC<{
    port_adress_country?: string | null;
    port_adress_city?: string | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({ port_adress_country, port_adress_city, changeConfigProperty }) => {
    return (
        <>
            <p>Порт приписки</p>
            <Row>
                <Col span={12}>
                    <p style={{ width: '98%' }}>страна</p>
                    <CountriesSelector
                        value={port_adress_country || undefined}
                        style={{ width: '98%' }}
                        placeholder='Выберите страну'
                        onChange={(value: string) => changeConfigProperty<string>('port_adress_country', value)}
                        allowClear={true}
                    />
                </Col>
                <Col span={12}>
                    <p style={{ width: '98%', marginLeft: '2%' }}>город</p>
                    <RegionSelector
                        value={(port_adress_city as any) || undefined}
                        style={{ width: '98%', marginLeft: '2%' }}
                        allowClear={true}
                        onChange={({ city }: { city: any }) => changeConfigProperty<string>('port_adress_city', city)}
                    />
                </Col>
            </Row>
        </>
    );
};
