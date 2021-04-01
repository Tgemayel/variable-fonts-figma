# Figma Variable Fonts

![Figma Variable Fonts plugin v0.1.0 screenshot](screenshot.png)

"If you can play [DOOM](https://twitter.com/possan/status/1193164022885081089) in Figma, why not use variable fonts?" - [Lenny](https://twitter.com/rememberlenny)

A plugin to provide basic variable fonts support through [samsa.js](https://github.com/Lorp/samsa).

This plugin enables you to:

- Render variable fonts **as graphics** on the Figma canvas
- Preview, create, and edit/update these graphics
- Choose from all the axes in a variable font
- Choose from all the variable fonts available from Google Fonts

Near term roadmap features include:

- Choose from all the named instances in a variable font's fvar and STAT table

Longer term aims:

- Create static font instances to download and install, to create 'real' figma Text objects (for now, use [Slice](https://github.com/source-foundry/Slice) instead and do it manually)
- Support OpenType Shaping for Arabic, Indic, South East Asian fonts ([#7](https://github.com/Tgemayel/variable-fonts-figma/issues/7))

## Install

**1. Obtain a built copy of the plugin.**

A simple way is to download an release asset zip from this repo's [releases page](https://github.com/Tgemayel/variable-fonts-figma/releases) (`Archive.zip`) and unzip it.

Developers can build their own copy from source, see below.

**2. Install the plugin within Figma's desktop client.**

- Go to Menu → Plugins → Development → New Plugin
- This will bring up the "Create a plugin" modal dialog
- In the lower 2nd section to "Link existing plugin", click to choose a manifest.json file
- Select the `manifest.json` file in the folder you downloaded this plugin to

## Usage

Run the Figma desktop client, and open or create a new file.

Go to Menu → Plugins → Development → Variable Fonts

You should see the Variable Fonts palette appear, similar to the screenshot above.

- Pick one of the dozens of variable fonts available from [Google Fonts](https://fonts.google.com/?vfonly=true).

- In the Preview section, enter some custom text.

- Set the color and axes values you want.

- Then click the **Add** button at the top of the Preview section.

This will add a Vector graphic object to your Figma canvas.

That result is a normal figma Vector object that you can do all the normal things you can typically do with such objects.

It is **NOT** a Text object!

You can only edit a graphic's text within the plugin window, because the plugin saves some metadata of what the text input was inside that Vector object.

It can only load variable fonts as TTF files from URLs, not fonts you have installed.

An "upload any font" feature is planned soon.

## Development

As of April 2021, this plugin is still in an early phase of development - but it is a "MVP," and basically works.

Please contribute ideas and suggestions to the Github issue tracker:

[github.com/tgemayel/variable-fonts-figma/issues](http://github.com/tgemayel/variable-fonts-figma/issues)

#### Contributing Code

If you are a developer, you may prefer to download the source code from this repo and built it yourself, using [yarn](https://yarnpkg.com), instead of using a pre-built release.

The dependencies can be conveniently installed on macOS with [Homebrew](https://brew.sh) and on Windows with [Chocolatey](https://chocolatey.org).
If you use Windows, replace the following `brew` command with `choco`.

To install Homebrew, open Terminal and run these 2 commands:

    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)";
    brew doctor;

You will be offered to install the Command Line Developer Tools from Apple.
Confirm by clicking Install.
After the installation finishes, continue installing Homebrew by hitting Return again.

Then install git, yarn, and the Figma desktop client, download this repo, and build it:

    brew install git yarn figma;
    git clone https://github.com/Tgemayel/variable-fonts-figma.git;
    cd variable-fonts-figma;
    yarn;
    yarn build:watch;

The final command means that if you update the source code, it will rebuild automatically on save.
Just close the plugin and reopen it to see how your changes work.

Pull requests are welcome!

## License

Apache License 2.0

## Thanks

Thanks to [Dave Crossland](https://twitter.com/davelab6) for organizing this project, [Lenny Bogonoff](https://twitter.com/rememberlenny) for initial prototyping, and the Google Fonts team for generously supporting development.
