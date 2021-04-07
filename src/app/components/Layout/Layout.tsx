import * as React from 'react';
import { renderRoutes } from 'react-router-config';
import { Redirect, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Preview from '../Preview/Preview';

import { routeMap, routes } from '../routes';
import Footer from './Footer';
import Header from './Header';

const Layout = () => {
    const location = useLocation();
    const isPreviewEnabled =
        routeMap.findIndex((route) => route.path === location.pathname && route.tab === true) !== -1;

    return (
        <Wrapper>
            <Header />
            <Content>
                {isPreviewEnabled && <Preview />}
                <Redirect to="/font" />
                {renderRoutes(routes)}
            </Content>
            <Footer />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const Content = styled.div`
    flex: 1;
`;

export default Layout;
