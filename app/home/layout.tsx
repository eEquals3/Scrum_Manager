import GlobalMenu from "../../components/GlobalMenu/GlobalMenu";
import "./home.css"
import React from "react";

export default function HomeLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <div className="HomePage">
            <GlobalMenu/>
            {children}
        </div>
    )
}
