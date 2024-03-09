import { Segmented, Select, Typography } from "antd";
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';


export const SortedFilters = ({mode, setMode}: {mode: 'list' | 'kanban', setMode: (value: 'list' | 'kanban') => void}) => {
    return (
        <div
            className='pt-2 pb-2 pr-4 pl-4 flex justify-between items-center'
            style={{
                boxShadow: '0 0 20px rgba(128, 128, 128, 0.2)',
                overflow: 'hidden',
                borderRadius: 'var(--main-app-br)'
            }}
        >
            <div>
                <Typography.Text>Сортировка: </Typography.Text>
                <Select
                    placeholder="Сортировка"
                    variant="borderless"
                    style={{width: '160px'}}
                    allowClear={true}
                    options={[
                        { value: 0, label: 'Дешевле' },
                        { value: 1, label: 'Дороже' },
                        { value: 2, label: 'По дате' },
                        { value: 2, label: 'По просмотрам' }
                    ]}
                />
            </div>
            <div>
                <Segmented
                    value={mode}
                    options={[
                        { value: 'list', icon: <BarsOutlined /> },
                        { value: 'kanban', icon: <AppstoreOutlined /> },
                    ]}
                    onChange={setMode}
                />
            </div>
        </div>
    );
}