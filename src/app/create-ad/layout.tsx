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
      <>{children}</>
    );
  }