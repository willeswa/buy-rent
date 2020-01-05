import React, {useEffect, useRef} from 'react';

const useDidMountEffect = (callBack, state) => {
    const didMount = useRef(false);

    useEffect(() => {
        
        if(didMount.current) callBack();
        else didMount.current = true;
    }, state)
};


export default useDidMountEffect;

