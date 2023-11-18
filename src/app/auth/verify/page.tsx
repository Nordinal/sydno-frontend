import { NotFoundQueryParams } from "@/shared/ui/NotFoundQueryParams";
import { VerifyResult } from "@/widgets/Auth/VerifyResult/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Верификация почты"
};


export default function Verify(props: {
    searchParams: {
        id: string;
        hash: string;
        expires: string;
        signature: string;
    }
}) {
    const { id = null, hash = null, expires = null, signature = null } = props.searchParams;

    if(!id || !hash || !expires || !signature) return <NotFoundQueryParams />
    return (
        <VerifyResult id={id} hash={hash} expires={expires} signature={signature} />
    )
};
  