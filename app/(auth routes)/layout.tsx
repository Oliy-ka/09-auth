import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | Notehub",
  description: "Login and registration pages for Notehub",
};

export default function AuthLayout({children,}: {children: React.ReactNode;}) {
  return (
    <section>
      {children}
    </section>
  );
}
