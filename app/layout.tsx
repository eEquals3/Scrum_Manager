import "./globals.css";
import Header from "../components/Header/Header";
import AuthProvider from "./provider/AuthProvider";
import React from "react";


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
            {children}
        </AuthProvider>
        </body>
        </html>
    );
}
