"use client"
import "./Header.css"
import "../../app/constants/routes"
import Link from "next/link";
import {HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, ROOT_ROUTE} from "../../app/constants/routes";
import {AuthContext} from "../../app/provider/AuthProvider";
import {useRouter} from "next/navigation";
import {memo, useCallback} from "react";
import {getAuth} from "firebase/auth";

const Header = () => {
    const {user}: any = AuthContext();
    const router = useRouter();

    const auth = getAuth();

    const logOut = useCallback(async () => {
        await router.replace(ROOT_ROUTE)
        setTimeout(() => {
            auth.signOut()
        },  500)
        await auth.signOut()
    }, [auth, router])

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
                    <div>На главную</div>
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
                                <span onClick={logOut}>{"Выйти"}</span>
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
