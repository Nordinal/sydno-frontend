import { AuthWrapper } from "@/entities/user/ui/AuthWrapper";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Создать объявление",
};

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <AuthWrapper>
            {children}
      </AuthWrapper>
    );
  }