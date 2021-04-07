import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre, a,
    abbr, acronym, address, big, cite, code, del, dfn, em,
    font, img, ins, kbd, q, s, samp, small, strike, strong,
    sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend, table, caption, tbody, tfoot,
    thead, tr, th, td, input, textarea, keygen, select, button {
        margin: 0;
        padding: 0;
        outline: 0;
        border: 0;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;
    }

    button {
        cursor: pointer;
    }

    .disclosure__content {
        user-select: all;
        pointer-events: all;
    }
    `;
