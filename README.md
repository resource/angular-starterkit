# AngularJS Starter Kit

An easy to use AngularJS project template offering turn-key support for automated builds and testing as well as a clean, well-organized folder structure.

## Getting Started

Before proceding, make sure you have the [prerequisite software](#requirements) installed.

1. Download the ZIP file for this project.
1. Extract the ZIP file and rename the folder to whatever you'd like.
1. Run `npm install` from within the root of the project folder.

## Usage

This starter kit provides a number of **npm** scripts to make your development workflow effortless. Available tasks include:

**`npm run debug`** ~ Builds a debug version of the project and makes it available at [http://localhost:3000](http://localhost:3000).

**`npm run unit`** ~ Runs the project's unit tests.

**`npm run e2e`** ~ Runs the project's end-to-end tests.

**`npm run release`** ~ Builds a release version of the application with minified, concatenated code.

You can modify the behavior of the above scripts by editing either of the following configuration files:

- build-config.js
- tests/karma.conf.js

## Additional Info

For a full description of the directories and files included in this project and how to use them, see [Directory Structure Overview](docs/Directory_Structure_Overview.md).

For information on how to set up this project to work with JetBrains' excellent WebStorm IDE, see [WebStorm Setup Guide](docs/WebStorm_Setup_Guide.md).

Note, this starter kit has no baked-in support for browser synchronization (i.e. live reload). If you'd like to add browser synchronization to your project we suggest one of the following solutions.

1. [Ghostlab](http://vanamco.com/ghostlab/)
2. [BrowserSync](http://www.browsersync.io/)
3. [LiveReload](http://livereload.com/)

## Requirements

The following sofware is required when using this project.

+ [Node](http://nodejs.org/) version >=0.10.x
+ [NPM](https://www.npmjs.com/) >2.5
+ [Sass](http://sass-lang.com/) >3.4

