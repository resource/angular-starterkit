# Angular Starterkit

An Angular starter-kit that uses karma, protractor, a clean folder structure, and Gulp integration with robust build config file.

## Requirements

+ [Node](http://nodejs.org/) version >=0.10.x
+ [NPM](https://www.npmjs.com/) >2.5
+ [Sass](http://sass-lang.com/) >3.4

## Installation

1. Clone starterkit repository.
2. Copy it's contents to a new local directory or switch the repositories origin to your repository endpoint.
3. Commit to your repository.
2. Run `npm install` within the root of your local repository.
3. Run one of the gulp tasks depending on the need.

## Automation Tasks

**Available tasks include:**

`npm run debug`

Builds the debug version of the project and starts up a node express server on port 3000.

`npm run unit`

Runs the unit tests after build the debug version of the app.

`npm run e2e`

Runs the e2e tests after starting the debug server.

`npm run release`

Builds a release version of the application (cssmin, uglify, etc.).


## Browser Synchronization

There is no baked in support for browser synchronization in this starterkit. For browser synchronization (e.g. live reload) during project development you have your choice of tools to use. We kept the starterkit agnostic in this respect to keep the gulp file as simple as possible. There are a number of choices that you have though:

1. [Ghostlab](http://vanamco.com/ghostlab/)
2. [BrowserSync](http://www.browsersync.io/)
3. [LiveReload](http://livereload.com/)

## Using With JetBrains Webstorm

To use *jshint* correctly you will need to turn off some of webstorms default javascript validation.

+ *unresolved javascript functions*
+ *unresolved javascript variables*
