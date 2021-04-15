import { FIGMA_EVENT_TYPES, NODE_PROPS, NODE_TYPES, STATUSES } from './constants';
import { createVariableFontVector, updateVariableFontVector } from './glyphs';
import { isJsonString } from './utils';

const onSelectChange = () => {
    if (figma.currentPage.selection.length !== 1) {
        return {
            type: FIGMA_EVENT_TYPES.SELECTED_CHANGED,
            status: STATUSES.ERROR,
            message: 'Select a single node.',
        };
    }

    const node = figma.currentPage.selection[0];

    if (node.getPluginData(NODE_PROPS.IS_VARIABLE_FONT)) {
        let axes = '';
        const nodeAxes = node.getPluginData(NODE_PROPS.AXES);
        if (isJsonString(nodeAxes)) {
            axes = JSON.parse(nodeAxes);
        }
        return {
            status: STATUSES.SUCCESS,
            type: FIGMA_EVENT_TYPES.SELECTED_CHANGED,
            axes,
            fontName: node.getPluginData(NODE_PROPS.FONT_NAME),
            fontSize: node.getPluginData(NODE_PROPS.FONT_SIZE),
            isVariableFontNode: node.getPluginData(NODE_PROPS.IS_VARIABLE_FONT),
            content: node.getPluginData(NODE_PROPS.TEXT_CONTENT),
            color: JSON.parse(node.getPluginData(NODE_PROPS.FONT_COLOR)),
        };
    }

    if (node.type !== NODE_TYPES.TEXT) {
        return {
            type: FIGMA_EVENT_TYPES.SELECTED_CHANGED,
            status: STATUSES.ERROR,
            message: 'Select a single text node.',
        };
    }

    if (node.type === NODE_TYPES.TEXT) {
        const textNode = node as TextNode;
        return {
            type: FIGMA_EVENT_TYPES.SELECTED_CHANGED,
            status: STATUSES.SUCCESS,
            content: textNode.characters,
            fontSize: textNode.fontSize,
        };
    }
};

const updateUiSelection = () => {
    const payload = onSelectChange();
    figma.ui.postMessage({
        payload,
    });
};

export const setupFigmaEvents = () => {
    figma.on('selectionchange', () => {
        updateUiSelection();
    });

    figma.ui.onmessage = async (msg) => {
        if (msg.type === FIGMA_EVENT_TYPES.ON_UI_LOADED) {
            updateUiSelection();
        }

        if (msg.type === FIGMA_EVENT_TYPES.RENDER_SVG) {
            createVariableFontVector(msg.payload);
        }

        if (msg.type === FIGMA_EVENT_TYPES.UPDATE_SELECTED_VARIABLE_SETTINGS) {
            updateVariableFontVector(msg.payload);
        }

        if (msg.type === FIGMA_EVENT_TYPES.SET_TOKEN) {
            await figma.clientStorage.setAsync('token', msg.payload);
        }

        if (msg.type === FIGMA_EVENT_TYPES.GET_TOKEN) {
            const token = await figma.clientStorage.getAsync('token');
            await figma.ui.postMessage({
                payload: {
                    type: FIGMA_EVENT_TYPES.GET_TOKEN,
                    token,
                },
            });
        }
    };
};
