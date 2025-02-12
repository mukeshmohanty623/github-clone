import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "github-clone",
  description: "A github clone app for home page of repository",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="max-w-screen h-screen">
      <head>
      <link rel="icon" href="https://github.githubassets.com/favicons/favicon.png" sizes="any" />
      </head>
      <body
        className={`antialiased max-w-screen h-screen`}
      >
        {children}
      </body>
    </html>
  );
}

