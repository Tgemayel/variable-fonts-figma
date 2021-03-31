export interface IFigmaSelectOption {
    label: string;
    value: string | number;
}

export interface IFonts {
    [key: string]: IFont;
}

export interface IFont {
    fontUrl: string;
    fontName: string;
    instances: IInstance[];
    axes: IAxis[];
    filename: string;
    names: Array<string>;
    glyphs: any;
    glyphsIndexMap: any;
    unitsPerEm: number;
    fontFamilyName?: string | null;
    fontUniqueIdentifier?: string | null;
    designer?: string | null;
}

export interface IGlyphsIndexMap {
    [key: number]: IGlyphUnicode;
}

export interface IGlyphUnicode {
    unicode: number;
    unicodes: number[];
}
export interface IActiveAxes {
    [key: string]: number;
}

export interface IActiveFont {
    fontName: string;
    variantName: string;
    axes: IActiveAxes;
}

export interface IAxis {
    default: number;
    max: number;
    min: number;
    name: string;
    tag: string;
}

export interface IInstance {
    fvs: IActiveAxes;
    glyphs: any[];
    id: number;
    name: string;
    static: any;
    tuple: number[];
    type: string;
}

export interface IColor {
    r: number;
    g: number;
    b: number;
    a: number;
}

export enum LANGUAGE {
    EN = 'en',
}
