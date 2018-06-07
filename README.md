# vscode-searchfox

This is an extension for VS Code adding integration with Mozilla's Searchfox.

## Features

Adds a new command to VS Code to search Searchfox for a given keyword. You can
access the command from the command palette or from the context menu of an open
editor where it will search for the keyword under the cursor or the current
selection.

## Requirements

Make sure you have the most up to date version of VS Code installed. I only test on the latest versions.

The extension currently assumes that the first folder in your workspace is the root of mozilla-central.

## Known Issues

Please find and file issues at [Github](https://github.com/FractalBrew/vscode-searchfox/issues).

## Release Notes

### 0.1.0

Initial release

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
