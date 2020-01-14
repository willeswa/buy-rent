import { createContext } from "react";

export const UserContextWrapper = createContext({
    loggedIn: false,
    user: '',
    updateUser: () => {},
})