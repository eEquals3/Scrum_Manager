"use client"
import "./Header.css"
import "../../app/constants/routes"
import Link from "next/link";
import {HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, ROOT_ROUTE} from "../../app/constants/routes";
import {AuthContext} from "../../app/provider/AuthProvider";
import {signOut} from "@firebase/auth";
import {auth} from "../../app/services/Firebase";
import {useRouter} from "next/navigation";
import {memo, useCallback} from "react";
import Image from "next/image";

const Header = () => {
    const {user}: any = AuthContext();
    const router = useRouter();

    const logOut = useCallback(() => {
        signOut(auth).then((response) => {
            router.push(ROOT_ROUTE)
            console.log("response", response);
        }).catch((e) => {
            console.log("error", e);
        })
    }, [router])

    const onLogoClick = useCallback(() => {
        if (user?.isLogin) {
            router.push(HOME_ROUTE)
        } else {
            router.push(ROOT_ROUTE)
        }
    }, [router, user?.isLogin])

    return (
        <header>
            <nav>
                <li onClick={onLogoClick}>
                    <div>logo</div>
                </li>
                <ul>
                    {!user?.isLogin ? (
                        <>
                            <Link href={LOGIN_ROUTE}>
                                <span>Войти</span>
                            </Link>
                        </>
                    ) : null
                    }
                    {user?.isLogin ? (
                        <>
                            {/*
                                {user?.user.photoURL ? (
                                    <>
                                        <Image fill={true} src={user?.user.photoURL} alt="Profile Icon"/>
                                    </>
                                ) : null}
                            */}
                            <Link href={PROFILE_ROUTE}>
                                <span>Профиль</span>
                            </Link>
                            <li onClick={logOut}>
                                <span>Выйти</span>
                            </li>
                        </>
                    ) : null
                    }
                </ul>
            </nav>
        </header>
    )
}

export default memo(Header);
