import { SamsaFont } from '../../libraries/samsa.js';
import opentype from 'opentype.js';
import { defineFontFace } from './fontUtils';
import { IFont, IGlyphsIndexMap } from '../types';

export const getFontData = (url): Promise<IFont> => {
    return new Promise((resolve) => {
        new SamsaFont({
            url,
            callback: (data: { [key: string]: any }) => {
                resolve(data);
            },
        });
    }).then((samsaFont: any) => {
        return new Promise((resolve, reject) => {
            opentype.load(url, (error, opentypeFont) => {
                if (error) {
                    reject(error);
                } else {
                    const fontName = samsaFont.names[6] || samsaFont.filename.split('.')[0];
                    let glyphsIndexMap: IGlyphsIndexMap = {};
                    samsaFont.glyphs.forEach(({ id }) => {
                        glyphsIndexMap[id] = {
                            unicode: opentypeFont.glyphs.glyphs[id].unicode,
                            unicodes: opentypeFont.glyphs.glyphs[id].unicodes,
                        };
                    });

                    defineFontFace(fontName, url);

                    resolve({
                        fontName,
                        fontUrl: url,
                        filename: samsaFont.filename,
                        instances: samsaFont.instances,
                        axes: samsaFont.axes,
                        names: samsaFont.names,
                        glyphs: samsaFont.glyphs,
                        glyphsIndexMap,
                        unitsPerEm: samsaFont.unitsPerEm,
                        fontUniqueIdentifier: samsaFont.names[3],
                        fontFamilyName: samsaFont.names[4] || fontName,
                        designer: samsaFont.names[9],
                    });
                }
            });
        });
    });
};
