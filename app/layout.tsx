import type {Metadata} from "next";
import "./globals.css";
import Header from "../components/Header/Header";
import AuthProvider from "./provider/AuthProvider";
import React from "react";
import GlobalMenu from "../components/GlobalMenu/GlobalMenu";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className="Body">
        <AuthProvider>
            <Header/>
            <span>
                <GlobalMenu/>
                {children}
            </span>
        </AuthProvider>
        </body>
        </html>
    );
}
