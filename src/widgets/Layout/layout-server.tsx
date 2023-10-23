import { MainLayoutClient } from "./layout-client";

export const MainLayoutServer = ({children, user}: {children: React.ReactNode, user: object}) => {
    return (
        <MainLayoutClient user={user}>{children}</MainLayoutClient>
    );
} 