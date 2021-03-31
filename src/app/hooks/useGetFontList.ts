import * as React from 'react';
import opentype from 'opentype.js';
import { SamsaFont } from '../../libraries/samsa.js';
import { useAppState } from '../context/stateContext';
import { IGlyphsIndexMap } from '../types.js';
import { GOOGLE_VARIABLE_FONTS } from '../utils/googleVariableFontList';
import { getFontFileName } from '../../plugin/utils';
import { GOOGLE_FONT_PATH } from '../consts';
import { defineGoogleFontFace } from '../utils/googleFontUtils';

const useGetFontList = () => {
    const { setFonts } = useAppState();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fontLoader = function () {
            const promiseList = Object.keys(GOOGLE_VARIABLE_FONTS).map((font) => {
                return new Promise((resolve) => {
                    const url = `${GOOGLE_FONT_PATH}/${font}/METADATA.pb`;
                    fetch(url)
                        .then((response) => {
                            return response.arrayBuffer();
                        })
                        .then((arrayBuffer) => {
                            const metaData = String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));
                            resolve({
                                name: font,
                                url: `${GOOGLE_FONT_PATH}/${font}/${getFontFileName(metaData)}`,
                            });
                        });
                });
            });
            return Promise.all(promiseList).then((fontList) => {
                return fontList;
            });
        };

        const loader = async function () {
            const vfFonts = await fontLoader();
            const promiseList = vfFonts.map((vfFont: { url: string; name: string }) => {
                return new Promise((resolve) => {
                    new SamsaFont({
                        url: vfFont.url,
                        fontFamily: vfFont.name,
                        callback: (data: { [key: string]: any }) => {
                            resolve(data);
                        },
                    });
                }).then((samsaFont: any) => {
                    return new Promise((resolve, reject) => {
                        opentype.load(vfFont.url, (error, opentypeFont) => {
                            if (error) {
                                reject(error);
                            } else {
                                const fontName = samsaFont.names[6];
                                let glyphsIndexMap: IGlyphsIndexMap = {};
                                samsaFont.glyphs.forEach(({ id }) => {
                                    glyphsIndexMap[id] = {
                                        unicode: opentypeFont.glyphs.glyphs[id].unicode,
                                        unicodes: opentypeFont.glyphs.glyphs[id].unicodes,
                                    };
                                });

                                defineGoogleFontFace(fontName, vfFont.url);

                                resolve({
                                    fontName,
                                    fontUrl: vfFont.url,
                                    filename: samsaFont.filename,
                                    instances: samsaFont.instances,
                                    axes: samsaFont.axes,
                                    names: samsaFont.names,
                                    glyphs: samsaFont.glyphs,
                                    glyphsIndexMap,
                                    unitsPerEm: samsaFont.unitsPerEm,
                                    fontUniqueIdentifier: samsaFont.names[3],
                                    fontFamilyName: samsaFont.names[4],
                                    designer: samsaFont.names[9],
                                });
                            }
                        });
                    });
                });
            });
            Promise.all(promiseList).then((data) => {
                const fontList = {};
                data.forEach(({ fontName, ...rest }) => {
                    fontList[fontName] = rest;
                });
                setFonts(fontList);
                setLoading(false);
            });
        };
        loader();
    }, []);

    return {
        loading,
    };
};

export default useGetFontList;
