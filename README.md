# Angular Starterkit

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

## Gulp Tasks

Available tasks include:

1. **`run-debug`**
3. **`run-tests`**
4. **`run-build`**

These tasks are located in the tasks folder in the root directory of the repository.

Running these tasks is all handled through npm scripts.

1. To run the `run-debug` gulp task run the npm command `npm run debug`
2. To run the `run-tests` gulp task run the npm command `npm test`
3. To run the release version of `run-build` gulp task run the npm command `npm run release`

## Browser Synchronization

There is no baked in support for browser synchronization in this starterkit. For browser synchronization (e.g. live reload) during project development you have your choice of tools to use. We kept the starterkit agnostic in this respect to keep the gulp file as simple as possible. There are a number of choices that you have though:

1. [Ghostlab](http://vanamco.com/ghostlab/)
2. [BrowserSync](http://www.browsersync.io/)
3. [LiveReload](http://livereload.com/)

## Using With JetBrains Webstorm

To use jshint correctly you will need to turn off webstorms checking.

* unresolved javascript functions
* unresolved javascript variables