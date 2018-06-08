# vscode-searchfox

This is an extension for VS Code adding integration with Mozilla's Searchfox.

## Features

Adds new commands to VS Code to search Searchfox for keywords. You can access
the commands from the command palette, from keyboard shortcuts or from the
editor context menu.

* Alt+S: Search for the text selected or under the cursor in the editor.
* Alt+Shift+S: Ask for the text to search for.

## Requirements

Make sure you have the most up to date version of VS Code installed. I only test on the latest versions.

The extension currently assumes that the first folder in your workspace is the root of mozilla-central.

## Known Issues

Please find and file issues at [Github](https://github.com/FractalBrew/vscode-searchfox/issues).

## Release Notes

### 0.4.0

* Split searching into two commands.

### 0.3.0

* Various bug fixes and styling tweaks.

### 0.2.0

* Add icons for files.
* Improve Searchfox styling.

### 0.1.0

* Initial release.

## License

This extension is licensed under the [Mozilla Public License 2.0](https://www.mozilla.org/en-US/MPL/2.0/).

## Icons

The icons used in this extension come from various sources:

* [Tango](http://tango.freedesktop.org/) (public domain)
  * `icon.png`
* [Silk](http://www.famfamfam.com/lab/icons/silk/) (by Mark James, licensed under Creative Commons Attribution 2.5 License)
  * `mimetypes/*`
* [Fugue](http://p.yusukekamiyamane.com/) (by Yusuke Kamiyamane, licensed under Creative Commons Attribution 3.0 License)
  * `mimetypes/diff.png`
  * `mimetypes/tex.png`
