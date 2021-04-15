import * as React from 'react';
import { HashRouter } from 'react-router-dom';
import { route } from './routes';

import Spinner from '../common/Spinner';
import useFetchFigmaMessages from '../hooks/useFetchFigmaMessages';
import useGetFontList from '../hooks/useGetFontList';
import useGetHbInstance from '../hooks/useGetHbInstance';
import GlobalStyles from '../common/Global.styles';
import useGetToken from '../hooks/useGetToken';

const App = ({}) => {
    useGetToken();
    useGetHbInstance();
    useFetchFigmaMessages();

    const { loading } = useGetFontList();

    return (
        <>
            <GlobalStyles />
            {loading ? <Spinner /> : <HashRouter children={route} />}
        </>
    );
};

export default App;
