import React, { useState } from "react";
import {UserContextWrapper} from  "../utils/custom-hooks/ContextHook";


export default ({children}) => {
    const [user, setUser] = useState('');
    const [loggedIn, setLoggedIn] = useState(false)

    const updateUser = () => {
        setUser(user => user);
        setLoggedIn(loggedIn => !loggedIn);
    }

    return (
        <UserContextWrapper.Provider value={{loggedIn, user, updateUser}}>
            {children}
        </UserContextWrapper.Provider>
    )

}