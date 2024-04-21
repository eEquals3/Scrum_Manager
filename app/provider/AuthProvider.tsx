"use client"
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {auth} from "../services/Firebase";

const Context = createContext({});

interface User {
    user?: any,
    isLogin: boolean
}

const AuthProvider = ({children}: ReactNode) => {

    const [user, setUser] = useState<User>({user: null, isLogin: false});

    useEffect(()=>{
        return auth.onAuthStateChanged((userState) => {
            setUser({isLogin: !!userState, user: userState})
        });
    }, []);

    console.log ("useState", user.user);

    return (
        <Context.Provider value={{user, setUser}}>
            {children}
        </Context.Provider>
    )
}

export const AuthContext = () => useContext(Context);

export default AuthProvider;
