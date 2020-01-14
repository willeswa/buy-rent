import React, {useEffect, useState} from 'react';
import axios from "axios";


export default () => {
    const baseUrl = "http://localhost:8000/api/properties/all";
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(baseUrl)

    useEffect(() => {
        const doFetch = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const result = await axios (url);
                setData(result.data);
            } catch (error) {
                setIsError(true);

                console.log(error.response)
            }

            setIsLoading(false);
        };
        doFetch();
    }, []);
    return [{data, isLoading, isError, error}, setUrl]
};