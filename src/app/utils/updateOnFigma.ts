import { FIGMA_EVENT_TYPES } from '../../plugin/constants';
import { convertTextToSvg } from './convertTextToSvg';

const asyncUpdateFigma = async (hbInstance, fontUrl, fontName, content, axes, color) => {
    const { paths } = await convertTextToSvg(hbInstance, fontUrl, content, {
        variations: axes,
    });
    let codePoints = [];
    for (let i = 0; i < content.length; i++) {
        codePoints.push(content.charCodeAt(i));
    }
    window.parent.postMessage(
        {
            pluginMessage: {
                type: FIGMA_EVENT_TYPES.UPDATE_SELECTED_VARIABLE_SETTINGS,
                payload: {
                    paths,
                    fontName: fontName,
                    axes,
                    codePoints,
                    color,
                },
            },
        },
        '*'
    );
};

export default asyncUpdateFigma;
