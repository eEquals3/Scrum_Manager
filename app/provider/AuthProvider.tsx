"use client"
import {createContext, useContext, useEffect, useState} from "react";
import {auth} from "../services/Firebase";

const Context = createContext({});

interface User {
    user?: any,
    isLogin: boolean
}

const AuthProvider = ({children}: any) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User>({user: null, isLogin: false});

    useEffect(()=>{
        return auth.onAuthStateChanged((userState) => {
            setUser({isLogin: !!userState, user: userState})
            setLoading(false);
        });
    }, []);

    console.log ("useState", user.user);

    return (
        <Context.Provider value={{user, setUser}}>
            {loading && <div className="h-screen flex w-full justify-center item-center"> Загрузка </div>}
            {!loading && children}
        </Context.Provider>
    )
}

export const AuthContext = () => useContext(Context);

export default AuthProvider;
