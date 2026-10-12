import { createContext, useContext, useState } from "react";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [userLocal, setUserLocal] = useState(() => {
        const rawUser = localStorage.getItem("userLocal")
        return rawUser ? JSON.parse(rawUser) : null
    })
    const login = (user) => {
        setIsAuth(true);
        setUserLocal(user);
    }
    const logout = () => {
        setIsAuth(false);
        setUserLocal(null);
    }
    return (
        <AuthContext.Provider value={{ isAuth, userLocal, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);