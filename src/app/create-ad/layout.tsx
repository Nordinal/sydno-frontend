import CreateAdLayoutClient from "@/layout/CreateAdLayout/layout-client";
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
      <CreateAdLayoutClient>{children}</CreateAdLayoutClient>
    );
  }