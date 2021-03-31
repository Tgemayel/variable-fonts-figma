import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store/configStore';

import 'react-figma-plugin-ds/figma-plugin-ds.css';
import AppStateProvider from './context/stateContext';

ReactDOM.render(
    <AppStateProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </AppStateProvider>,
    document.getElementById('react-page')
);
