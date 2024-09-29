
import React, { createContext, useState } from 'react';

export const UserContext = createContext();


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [cartItems,setCartItems] = useState([])
    const [loading, setLoading] = useState(false);

    return (
        <UserContext.Provider value={{ user, setUser, loading, setLoading, setCartItems,cartItems }}>
            {children}
        </UserContext.Provider>
    );
};

