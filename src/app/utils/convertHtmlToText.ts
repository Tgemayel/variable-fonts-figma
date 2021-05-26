import * as striptags from 'striptags';

const TAGS_TO_BREAK_ON = [
    'p',
    'div',
    'br',
    'hr',
    'title',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'ol',
    'ul',
    'li',
    'pre',
    'table',
    'th',
    'td',
    'blockquote',
    'header',
    'footer',
    'nav',
    'section',
    'summary',
    'aside',
    'article',
    'address',
];

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

const removeAllNonTagsToBreakOn = (html) => striptags(html, TAGS_TO_BREAK_ON);
const convertTagsToBreak = (html) => striptags(html, [], '\n');
const replaceSpaces = (html) => html.replace(/&nbsp;/g, ' ');
const replaceMultiNewLines = (html) => html.replace(/\n\n/g, '\n');
const removeLeadingNewLines = (html) => html.replace(/\n+$/, '');
const removeTrailingNewLines = (html) => html.replace(/^\n+/, '');

export default compose(
    removeTrailingNewLines,
    removeLeadingNewLines,
    replaceMultiNewLines,
    replaceSpaces,
    convertTagsToBreak,
    removeAllNonTagsToBreakOn
);
