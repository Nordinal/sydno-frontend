import { Profile } from "@/widgets/Profile/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Мои объявления",
};

export default function ProfileServer() {

    return (
        <Profile />
    )
}
  