import { AuthWrapper } from "@/entities/user/ui/AuthWrapper";
import { NotFoundQueryParams } from "@/shared/ui/NotFoundQueryParams";
import { ForgotPassword } from "@/widgets/Auth/ForgotPassword/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Восстановление пароля"
};


export default function Verify(props: {
    searchParams: {
        token: string;
        email: string;
    }
}) {
    const { token = null, email = null } = props.searchParams;

    if(!token || !email) return <NotFoundQueryParams />
    return (
        <AuthWrapper invert>
            <div className="" style={{width: '35%', margin: '50px auto'}}>
                <ForgotPassword token={token} email={email}/>
            </div>
        </AuthWrapper>
    )
};
  