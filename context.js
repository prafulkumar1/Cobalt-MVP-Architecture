import React from "react";
import  { useState } from "react";
//import UserContext from "./UserContext";


const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

UserContextProvider.displayName='UserContextProvider';
UserContext.displayName='UserContext';

export { UserContextProvider, UserContext};