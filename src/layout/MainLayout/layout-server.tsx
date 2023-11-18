import { MainLayoutClient } from "./layout-client";

export const MainLayoutServer = ({children}: {children: React.ReactNode}) => {
    return (
        <MainLayoutClient>{children}</MainLayoutClient>
    );
} 