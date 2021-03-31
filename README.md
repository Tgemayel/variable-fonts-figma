# Figma Variable Fonts

"If you can play [DOOM](https://twitter.com/possan/status/1193164022885081089) in Figma, why not use variable fonts?" - [Lenny](https://twitter.com/rememberlenny)

A plugin to provide basic variable fonts support through Samsa.js.

This plugin allows you to:

- Render variable fonts in the Figma canvas
- Create static font instances, using a variable font's variable axes
- Load the static instances in a variable font's fvar table
- Preview, display, and update variable fonts
- Add and edit text for variable fonts to the Figma canvas

## How to install

Go to Menu > Plugins > Development > New Plugin...

This will bring up the "Create a plugin" modal to create a sample plugin. Give it a name, then choose the folder you downloaded this plugin to.

## Running the plugin

Create a new design file in the Figma editor. Go to Menu > Plugins > Development > VariableFonts to run your newly created plugin.

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
