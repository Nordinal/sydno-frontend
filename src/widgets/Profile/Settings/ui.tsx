'use client';
import { Typography } from "antd";
import { ResetPassword } from "./ResetPassword/ui";
import { VerifyMail } from "./VerifyMail/ui";
import { ProfileInfo } from "./ProfileInfo/ui";


export const ProfileSettings = () => {

    return (
        <div>
            <Typography.Title level={2}>Настройки</Typography.Title>
            <ProfileInfo />
            <ResetPassword />
            <VerifyMail />
        </div>
    );
}