import React, {useState, useEffect} from 'react';

const usePersistedState = (key, defaultValue) => {
    const [state, setState] = useState(() => JSON.parse(localStorage.getItem(key))||defaultValue);

    useEffect(() => {
        JSON.stringify(localStorage.setItem(key, state));
    }, [key, state]);

    

    return [state, setState];
}


export default usePersistedState;