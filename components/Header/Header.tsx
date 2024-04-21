"use client"
import "./Header.css"
import "../../app/constants/routes"
import Link from "next/link";
import {HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE} from "../../app/constants/routes";
import {AuthContext} from "../../app/provider/AuthProvider";
import {signOut} from "@firebase/auth";
import {auth} from "../../app/services/Firebase";
import {useRouter} from "next/navigation";

const Header = () => {
    const {user}: any = AuthContext();
    const router = useRouter();

    const logOut = () => {
        signOut(auth).then((response) => {
            console.log("response", response);
        }).catch((e) => {
            console.log("error", e);
        })

        router.push (HOME_ROUTE);
    }

    return (
        <header>
            <nav>
                <Link href={HOME_ROUTE}>
                    <div>logo</div>
                </Link>
                <ul>
                    {!user?.isLogin &&
                    <>
                        <Link href={LOGIN_ROUTE}>
                            <span>Войти</span>
                        </Link>
                    </>
                    }
                    {user?.isLogin &&
                    <>
                        <Link href={PROFILE_ROUTE}>
                            <span>Профиль</span>
                        </Link>
                        <li onClick={logOut}>
                            <span>Выйти</span>
                        </li>
                    </>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header;
