import React from 'react';
import { TChangeConfigProperty } from '../ui/SearhFiltres';
import { CountriesAutoComplete } from '@/shared/ui/CountriesAutoComplete';

const BuildingCountry: React.FC<{
    building_country?: string | null;
    changeConfigProperty: TChangeConfigProperty;
}> = ({
    building_country,
    changeConfigProperty
}) => {
  return (
    <>
      <p>Страна постройки</p>
      <CountriesAutoComplete
          value={building_country || undefined}
          style={{width: '100%'}}
          placeholder='Выберите страну'
          onChange={(value: string) => changeConfigProperty<string>('building_country', value)}
          allowClear={true}
      />
    </>
  )
}

export default BuildingCountry;
