function getSVG(result, glyphs) {
    var xmin = 1000;
    var xmax = -1000;
    var ymin = 1000;
    var ymax = -1000;
    let ax = 0;
    let ay = 0;
    const paths = result
        .map(function (x) {
            const result = glyphs[x.g].map(function (command) {
                if (command.type !== 'Z') {
                    const result = command.values
                        .map(function (p, i) {
                            // apply ax/ay/dx/dy to coords
                            return i % 2 ? p + ay + x.dy : p + ax + x.dx;
                        })
                        .map(function (x, i) {
                            // bbox calc
                            if (i % 2) {
                                if (x < ymin) ymin = x;
                                if (x > ymax) ymax = x;
                            } else {
                                if (x < xmin) xmin = x;
                                if (x > xmax) xmax = x;
                            }
                            return x;
                        });
                    return [command.type].concat(result).toString();
                } else {
                    return command.type;
                }
            });
            ax += x.ax;
            ay += x.ay;
            return result;
        })
        .reduce((acc, val) => {
            return acc.concat(val.join(''));
        }, []);

    let parsedPaths = [];
    paths.forEach((path) => {
        const parsed = path.match(/[mM][^mMzZ]*[zZ]/g);
        if (parsed) {
            parsed.forEach((p) => {
                parsedPaths.push(p);
            });
        }
    });

    let width = xmax - xmin;
    let height = ymax - ymin;
    // pad it a bit
    let pad = Math.round(Math.min(width / 10, height / 10));
    xmin -= pad;
    ymin -= pad;
    width += pad * 2;
    height += pad * 2;

    const bbox = xmin + ' ' + ymin + ' ' + width + ' ' + height;

    return {
        bbox,
        paths: parsedPaths,
    };
}

export const convertTextToSvg = async (hb: any, font: string, text: string, attributes: object) => {
    return fetch(font)
        .then((x) => {
            return x.arrayBuffer();
        })
        .then((fontblob) => {
            const blob = hb.createBlob(new Uint8Array(fontblob));
            const face = hb.createFace(blob, 0);
            const font = hb.createFont(face);
            font.setVariations(attributes['variations']);

            const buffer = hb.createBuffer();
            buffer.addText(text);
            buffer.guessSegmentProperties();

            hb.shape(font, buffer);

            const result = buffer.json(font);

            let glyphs = {};
            result.forEach((item) => {
                if (glyphs[item.g]) return;
                glyphs[item.g] = font.glyphToJson(item.g);
            });

            buffer.destroy();
            font.destroy();
            face.destroy();
            blob.destroy();

            return {
                paths: getSVG(result, glyphs).paths,
                glyphIds: result.map((item) => item.g),
            };
        });
};

export const convertGlyphToSvg = async (hb: any, font: string, glyphId: number, attributes: object) => {
    return fetch(font)
        .then((x) => {
            return x.arrayBuffer();
        })
        .then((fontblob) => {
            const blob = hb.createBlob(new Uint8Array(fontblob));
            const face = hb.createFace(blob, 0);
            const font = hb.createFont(face);
            font.setVariations(attributes['variations']);

            const path = font.glyphToPath(glyphId);

            font.destroy();
            face.destroy();
            blob.destroy();

            return [path];
        });
};
