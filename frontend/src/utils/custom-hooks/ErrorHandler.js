import React, {useState} from 'react';

const useErrorHandler = (initialState) => {
    const [error, setError] = useState(initialState);
    const showError = (errorMessage) => {
        setError(errorMessage);
        window.setTimeout(() => {
            setError(null);
        }, 1000)
    };
    return {error, showError};
};
