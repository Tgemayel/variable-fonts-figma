import * as React from 'react';
import { Button, Text } from 'react-figma-plugin-ds';
import styled from 'styled-components';
import ContentEditable from 'react-contenteditable';
import { FIGMA_EVENT_TYPES } from '../../../plugin/constants';
import { convertTextToSvg } from '../../utils/convertTextToSvg';
import { RootState } from '../../store/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { updateActiveText } from '../../store/activeTextSlice';
import { useAppState } from '../../context/stateContext';
import asyncUpdateFigma from '../../utils/updateOnFigma';

const Preview = () => {
    const dispatch = useDispatch();
    const ref = React.useRef();
    const { content, fontName, axes, color, selectedStatus } = useSelector((state: RootState) => state.activeText);
    const { hbInstance, fonts, activeColor } = useAppState();

    const fontVariationSettings = React.useMemo(() => {
        if (fontName) {
            return Object.keys(axes)
                .map((axisName) => `"${axisName}" ${axes[axisName]}`)
                .join(', ');
        } else return '';
    }, [fontName, axes]);

    const handleChange = React.useCallback(
        (event) => {
            const text = event.target.value;
            dispatch(updateActiveText(text));
            asyncUpdateFigma(hbInstance, fonts[fontName].fontUrl, fontName, text, axes, activeColor);
        },
        [hbInstance, fonts, fontName, axes, activeColor, updateActiveText, selectedStatus]
    );

    const handleAdd = React.useCallback(() => {
        const asyncAdd = async function () {
            const { paths } = await convertTextToSvg(hbInstance, fonts[fontName].fontUrl, content, {
                variations: axes,
            });
            let codePoints = [];
            for (let i = 0; i < content.length; i++) {
                codePoints.push(content.charCodeAt(i));
            }
            window.parent.postMessage(
                {
                    pluginMessage: {
                        type: FIGMA_EVENT_TYPES.RENDER_SVG,
                        payload: {
                            paths,
                            fontName: fontName,
                            axes,
                            codePoints,
                            color: activeColor,
                        },
                    },
                },
                '*'
            );
        };
        asyncAdd();
    }, [hbInstance, fontName, axes, fonts, content, activeColor]);

    if (!fontName) return <></>;

    return (
        <SectionWrapper>
            <SectionTitle>
                <Text size="xlarge" weight="bold">
                    Preview
                </Text>
                {!selectedStatus && <Button onClick={handleAdd}>Add</Button>}
            </SectionTitle>
            <PreviewWrapper>
                <PreviewLabel>
                    <ContentEditable
                        innerRef={ref}
                        html={content} // innerHTML of the editable div
                        onChange={handleChange} // handle innerHTML change
                        className="preview-content"
                        style={{
                            color: `rgba(${color.r},${color.g},${color.b},${color.a})`,
                            fontFamily: fontName,
                            fontVariationSettings,
                        }}
                    />
                </PreviewLabel>
            </PreviewWrapper>
        </SectionWrapper>
    );
};

const SectionWrapper = styled.div`
    padding: 0.625rem;
    border-bottom: 1px solid #e5e5e5;
`;

const SectionTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const PreviewWrapper = styled.div`
    display: flex;
    align-items: center;
    vertical-align: center;
    min-height: 65px;
    background: #f7f7f7;
    padding: 0.625rem;
    margin: 0.625rem -0.625rem -0.625rem -0.625rem;
`;

const PreviewLabel = styled.div`
    width: 100%;

    .preview-content {
        width: 100%;
        font-size: 32px;
        word-break: break-word;
    }
`;

export default Preview;
