export const defineGoogleFontFace = (name, url) => {
    const newStyle = document.createElement('style');
    newStyle.appendChild(
        document.createTextNode(
            `@font-face {
                font-family: '${name}';
                src: url('${url}');
            }`
        )
    );

    document.head.appendChild(newStyle);
};
