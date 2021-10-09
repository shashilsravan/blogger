import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext(null);

const ContextProvider = ({ children }) => {
    const [ account, setAccount ] = useState('');
    const oktaStorage = localStorage.getItem("okta-token-storage");
        
    useEffect(() => {
        try {
            let email = oktaStorage && JSON.parse(oktaStorage).idToken.claims.email;
            email = email && email.split('@')[0];
            setAccount(email);
        } catch (error) {
            setAccount('')
        }
    }, [])

    return (
        <LoginContext.Provider value={{ account, setAccount }}>
            {children}
        </LoginContext.Provider>
    )
}

export default ContextProvider;