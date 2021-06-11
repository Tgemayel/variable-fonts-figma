export const addSpaces = (path: any) => {
    let newPath = path;
    newPath = newPath.split('M').join(' M ');
    newPath = newPath.split('m').join(' m ');
    newPath = newPath.split('L').join(' L ');
    newPath = newPath.split('l').join(' l ');
    newPath = newPath.split('H').join(' H ');
    newPath = newPath.split('h').join(' h ');
    newPath = newPath.split('V').join(' V ');
    newPath = newPath.split('v').join(' v ');
    newPath = newPath.split('Q').join(' Q ');
    newPath = newPath.split('q').join(' q ');
    newPath = newPath.split('Z').join(' Z ');
    newPath = newPath.split('z').join(' z ');
    newPath = newPath.split(',').join(' ');
    newPath = newPath.split('  ').join(' ');
    return newPath.trim();
};

export const isJsonString = (str: string) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

export const getFontFileName = (metadata: string) => {
    return metadata.match(/[a-zA-Z0-9\[\]\-\,]*\.ttf/g);
};
