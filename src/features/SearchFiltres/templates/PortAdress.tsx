import React from 'react';
import { TChangeConfigProperty } from '../types';
import { CountriesAutoComplete } from '@/shared/ui/CountriesAutoComplete';
import { Col, Row } from 'antd';
import { RegionAutoComplete } from '@/shared/ui/RegionAutoComplete';

export const PortAdress: React.FC<{
    port_adress_country?: string | null;
    port_adress_city?: string | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    port_adress_country,
    port_adress_city,
    changeConfigProperty
}) => {
  return (
    <>
        <p>Порт приписки</p>
        <Row>
            <Col span={12}>
                <p>страна</p>
                <CountriesAutoComplete
                    value={port_adress_country || undefined}
                    style={{width: '100%'}}
                    placeholder='Выберите страну'
                    onChange={(value: string) => changeConfigProperty<string>('port_adress_country', value)}
                    allowClear={true}
                />
            </Col>
            <Col span={12}>
                <p>город</p>
                <RegionAutoComplete
                    value={port_adress_city || undefined}
                    style={{width: '100%'}}
                    allowClear={true}
                    onChange={({city}) => changeConfigProperty<string>('port_adress_city', city)}
                />
            </Col>
        </Row>
    </>
  )
}
