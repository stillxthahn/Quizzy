import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../service/userService";
import { useNavigate } from "react-router-dom";

const INITIAL_USER = {
    id: "",
    fullName: "",
    email: "",
    password: "",
    token: ""
}

const AuthContext = createContext(INITIAL_USER);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(INITIAL_USER)

    const fetchCurrentUser = async (token: string) => {
        const response = await getCurrentUser(token);
        setUser(response)
    }
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            fetchCurrentUser(token)
        }
        else {
            navigate("/sign-in")
        }
    }, [])
    if (user.id === "") {
        return null
    }
    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
export const useUserContext = () => useContext(AuthContext);