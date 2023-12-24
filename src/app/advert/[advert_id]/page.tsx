'use client';
import React from "react";
import { Advert } from "@/widgets/Advert";

interface IAdvertPageProps {
    params?: {
        advert_id?: string;
    }
}

const AdvertPage: React.FC<IAdvertPageProps> = ({ params }) => {
    return (
        <Advert
            id={params?.advert_id || ''}
        />
    );
}

export default AdvertPage;
