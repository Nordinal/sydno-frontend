import { Input, Select } from "antd";
import { SearchOutlined } from '@ant-design/icons';


// Разобраться что нужно
export const SearchInput = () => {
    return (
        <div
        >
            <Input.Search
                addonBefore={
                    <Select
                        placeholder="Поиск по"
                        variant="borderless"
                        style={{width: 220}}
                        allowClear={true}
                        defaultValue={0}
                        options={[
                            { value: 0, label: 'По названию объявления' },
                            { value: 1, label: 'По названию судна' },
                            { value: 2, label: 'По городу' }
                        ]}
                    />
                }
                allowClear
                enterButton={<span><SearchOutlined /> Поиск</span>}
                size="large"
                placeholder="Найти"
            />
        </div>
    );
}