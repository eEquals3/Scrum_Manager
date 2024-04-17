import "./Header.css"
import "../../app/constants/routes"
import Link from "next/link";
import {HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE} from "../../app/constants/routes";

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
                            <li>Login</li>
                        </Link>
                        <Link href={REGISTER_ROUTE}>
                            <li>Register</li>
                        </Link>
                    </>
                    }
                    {isLogin &&
                    <>
                        <Link href={PROFILE_ROUTE}>
                            <li>Profile</li>
                        </Link>
                        <Link href={HOME_ROUTE}>
                            <li>Logout</li>
                        </Link>
                    </>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header;
