import { ProfileLayoutClient } from "@/layout/ProfileLayout/layout-client";

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <ProfileLayoutClient>{children}</ProfileLayoutClient>
    );
  }