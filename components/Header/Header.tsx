import "./Header.css"
import "../../app/constants/routes"
import Link from "next/link";
import {HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE} from "../../app/constants/routes";

const Header = () => {
    const isLogin: boolean = false;

    return (
        <header>
            <nav>
                <Link href={HOME_ROUTE}>
                    <div>logo</div>
                </Link>
                <ul>
                    {!isLogin &&
                    <>
                        <Link href={LOGIN_ROUTE}>
                            <li>Войти</li>
                        </Link>
                    </>
                    }
                    {isLogin &&
                    <>
                        <Link href={PROFILE_ROUTE}>
                            <li>Профиль</li>
                        </Link>
                        <Link href={HOME_ROUTE}>
                            <li>Выйти</li>
                        </Link>
                    </>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header;
