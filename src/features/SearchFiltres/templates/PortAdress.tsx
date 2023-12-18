import React from 'react';
import { TChangeConfigProperty } from '../ui/SearhFiltres';
import { CountriesAutoComplete } from '@/shared/ui/CountriesAutoComplete';
import { Col, Input, Row } from 'antd';

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
    <>
        <p>Порт приписки</p>
        <Row>
            <Col span={12}>
                <p>страна</p>
                <CountriesAutoComplete
                    value={port_adress_country}
                    style={{width: '100%'}}
                    placeholder='Выберите страну'
                    onChange={(value) => changeConfigProperty<string>('port_adress_country', value)}
                    allowClear={true}
                />
            </Col>
            <Col span={12}>
                <p>город</p>
                <Input
                    style={{width: '100%'}}
                    value={port_adress_city}
                    onChange={(event) => changeConfigProperty<string>('port_adress_city', event.target.value)}
                />
            </Col>
        </Row>
    </>
  )
}

export default PortAdress;
