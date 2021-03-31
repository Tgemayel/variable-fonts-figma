# Figma Variable Fonts

"If you can play [DOOM](https://twitter.com/possan/status/1193164022885081089) in Figma, why not use variable fonts?" 

A plugin to provide basic variable fonts support through Samsa.js.

This plugin allows you to:

- Render variable fonts in the Figma canvas
- Create static font instances, using a variable font's variable axes
- Load the static instances in a variable font's fvar table
- Preview, display, and update variable fonts
- Add and edit text for variable fonts to the Figma canvas

## Todos

- [ ] Preview variable font axes
- [ ] Control variable font axes using slider
- [ ] Load variable fonts into plugin modal
- [ ] Load variable font as SVG in Figma canvas
- [ ] Upload variable font from file path 
- [ ] Load variable font as static instance in Figma canvas
- [ ] View font instances from fvar table as list
- [ ] Control variable font axes by "locking" axes together
- [ ] Edit text in Figma canvas that was added using the variable font plugin


# Design

![](https://github.com/rememberlenny/figma-variable-fonts/blob/master/preview.png?raw=true)

- [Link to Figma design](https://www.figma.com/community/file/841567018431192369/Figma-Variable-Font-Plugin-design)

## Development

- install node modules either with `Yarn` or `npm`

    Yarn:
    ````
    yarn 
    ````
    
    npm:
    ````
    npm install
    ````

- run

    Yarn:
    ````
    yarn build:watch
    ````
    
    npm:
    ````
    npm run build:watch
    ````
