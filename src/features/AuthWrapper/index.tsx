import { useUser } from "@/entities/user/model";
import { SingButton } from "@/entities/user/ui/SingButton";
import { Result } from "antd";
import { useShallow } from "zustand/react/shallow";
import { LoadingOutlined } from '@ant-design/icons';


export const AuthWrapper = ({children}: {children: React.ReactElement}) => {
    const { auth } = useUser(useShallow(state => ({auth: state.auth})));

    if(auth === null) {
        return (
            <Result
                icon={<LoadingOutlined />}
                status="info"
                title="Загрузка..."
            />
        );
    }
    if(auth === false) {
        return (
            <Result
                status="warning"
                title="Необходимо авторизоваться на сайте"
                extra={[
                    <SingButton caption="Вход" type="primary" key='sing'/>
                ]}
            />
        );
    }
    else if(auth === true) {
        return (
            <>{children}</>
        );
    }
}