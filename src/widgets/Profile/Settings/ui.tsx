'use client';
import { useUser } from "@/entities/user/model";
import { Typography } from "antd";
import { useShallow } from "zustand/react/shallow";
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