import { VerifyResult } from "@/widgets/VerifyResult/ui";
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

    return (
        <VerifyResult id={id} hash={hash} expires={expires} signature={signature} />
    )
};
  