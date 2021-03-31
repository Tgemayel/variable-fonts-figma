import * as React from 'react';
import hbWasm from '../../libraries/hb.wasm';
import hbjs from '../../libraries/hbjs.js';
import { useAppState } from '../context/stateContext';

const useGetHbInstance = () => {
    const { setHbInstance } = useAppState();

    React.useEffect(() => {
        hbWasm({}).then(({ instance }) => {
            instance.exports.memory.grow(400);
            setHbInstance(hbjs(instance));
        });
    }, []);
};

export default useGetHbInstance;
