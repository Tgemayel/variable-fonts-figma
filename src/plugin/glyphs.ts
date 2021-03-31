import { NODE_PROPS } from './constants';
import { addSpaces } from './utils';

export const createVariableFontVector = (pathData) => {
    const node = figma.createVector();

    node.vectorPaths = pathData.paths.map((path) => {
        return {
            windingRule: 'NONZERO',
            data: addSpaces(path),
        };
    });

    node.fills = [
        {
            type: 'SOLID',
            color: {
                r: pathData.color.r / 255,
                g: pathData.color.g / 255,
                b: pathData.color.b / 255,
            },
            opacity: pathData.color.a,
        },
    ];
    node.strokeWeight = 0;

    node.setPluginData(NODE_PROPS.IS_VARIABLE_FONT, 'true');
    node.setPluginData(NODE_PROPS.FONT_NAME, pathData.fontName);
    node.setPluginData(NODE_PROPS.AXES, JSON.stringify(pathData.axes));
    node.setPluginData(NODE_PROPS.TEXT_CONTENT, String.fromCharCode(...pathData.codePoints));
    node.setPluginData(NODE_PROPS.FONT_SIZE, '14');
    node.setPluginData(NODE_PROPS.FONT_COLOR, JSON.stringify(pathData.color));
    node.height && node.rescale(100 / node.height);

    const angle = 0;
    node.relativeTransform = [
        [Math.cos(angle), -Math.sin(angle), 0],
        [-Math.sin(angle), -Math.cos(angle), 0],
    ];

    // Put the node in the center of the viewport so we can see it
    node.x = figma.viewport.center.x - node.width / 2;
    node.y = figma.viewport.center.y - node.height / 2;
};

export const updateVariableFontVector = (pathData) => {
    const node = figma.currentPage.selection[0] as VectorNode;

    if (node) {
        const { x, y, height } = node;
        node.vectorPaths = pathData.paths.map((path) => {
            return {
                windingRule: 'NONZERO',
                data: addSpaces(path),
            };
        });

        node.fills = [
            {
                type: 'SOLID',
                color: {
                    r: pathData.color.r / 255,
                    g: pathData.color.g / 255,
                    b: pathData.color.b / 255,
                },
                opacity: pathData.color.a,
            },
        ];
        node.strokeWeight = 0;

        node.setPluginData(NODE_PROPS.FONT_NAME, pathData.fontName);
        node.setPluginData(NODE_PROPS.AXES, JSON.stringify(pathData.axes));
        node.setPluginData(NODE_PROPS.TEXT_CONTENT, String.fromCharCode(...pathData.codePoints));
        node.setPluginData(NODE_PROPS.FONT_COLOR, JSON.stringify(pathData.color));

        node.x = x;
        node.y = y;
        node.height && node.rescale(height / node.height);
    }
};
