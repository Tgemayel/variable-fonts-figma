import * as React from 'react';
import { Text } from 'react-figma-plugin-ds';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FIGMA_EVENT_TYPES } from '../../plugin/constants';
import Section from '../common/Section';
import { useAppState } from '../context/stateContext';
import { RootState } from '../store/rootReducer';
import { convertGlyphToSvg } from '../utils/convertTextToSvg';

const GlyphsSection = () => {
    const fontName = useSelector((state: RootState) => state.activeText.fontName);
    const { hbInstance, fonts, activeAxes, activeColor } = useAppState();

    const font = React.useMemo(() => {
        if (fontName) {
            return fonts[fontName];
        } else {
            return null;
        }
    }, [fontName]);

    const onClick = React.useCallback(
        (glyph) => {
            const asyncLoad = async function () {
                const svgPathData = await convertGlyphToSvg(hbInstance, font.fontUrl, glyph.id, {
                    variations: activeAxes,
                });
                const codePoints = [font.glyphsIndexMap[glyph.id].unicode];
                window.parent.postMessage(
                    {
                        pluginMessage: {
                            type: FIGMA_EVENT_TYPES.RENDER_SVG,
                            payload: {
                                paths: svgPathData,
                                fontName: fontName,
                                axes: activeAxes,
                                codePoints,
                                color: activeColor,
                            },
                        },
                    },
                    '*'
                );
            };
            asyncLoad();
        },
        [font, hbInstance, activeAxes]
    );

    if (!fontName) return <></>;

    return (
        <Section label="Glyphs">
            <GlyphWrapper>
                {font &&
                    font.glyphs.map((glyph) => {
                        const scale = 50 / font.unitsPerEm;

                        let glyphName = glyph.name || 'undefined';
                        let iglyph;
                        if (glyph.numContours < 0) iglyph = glyph.decompose(font.instances[0].tuple);
                        else iglyph = glyph.instantiate(null, font.instances[0]);

                        return (
                            <Glyph key={`${glyphName}-${glyph.id}`} onClick={() => onClick(glyph)}>
                                <Text weight="medium" size="small">
                                    {glyphName}
                                </Text>
                                <svg xmlns="http://www.w3.org/2000/svg" width="85" height="85">
                                    <g transform={`translate(24 60) scale(${scale}, -${scale})`}>
                                        <path d={iglyph.svgPath()}></path>
                                    </g>
                                </svg>
                            </Glyph>
                        );
                    })}
            </GlyphWrapper>
        </Section>
    );
};

const GlyphWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const Glyph = styled.div`
    display: inline-block;
    :hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

export default GlyphsSection;
