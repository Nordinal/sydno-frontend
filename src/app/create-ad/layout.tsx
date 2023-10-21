import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Создать объявление",
    description: "123",
    icons: {
      icon: "/favicon.ico",
    }
};

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <>{children}</>
    );
  }