import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import About from './About/About';
import Axes from './Axes/Axes';
import Font from './Font/Font';
import Glyphs from './Glyphs/Glyphs';
import Instances from './Instances/Instances';
import Layout from './Layout/Layout';
import Style from './Style/Style';
import Token from './Token/Token';

export const routeMap = [
    {
        path: '/font',
        title: 'Font',
        tab: true,
        component: () => <Font />,
    },
    {
        path: '/style',
        title: 'Style',
        tab: true,
        component: () => <Style />,
    },
    {
        path: '/axes',
        title: 'Axes',
        tab: true,
        component: () => <Axes />,
    },
    {
        path: '/instances',
        title: 'Instances',
        tab: true,
        component: () => <Instances />,
    },
    {
        path: '/glyphs',
        title: 'Glyphs',
        tab: true,
        component: () => <Glyphs />,
    },
    {
        title: 'Request a token',
        path: '/token',
        settings: true,
        component: () => <Token />,
    },
    {
        title: 'About',
        path: '/about',
        settings: true,
        component: () => <About />,
    },
];

export const routes = routeMap.map((route) => ({
    path: route.path,
    exact: true,
    component: route.component,
}));

export const route = (
    <Switch>
        <Route path="/" component={Layout} />
    </Switch>
);
