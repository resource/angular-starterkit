# Angular Starterkit

## Requirements

+ [Node](http://nodejs.org/) version >0.12
+ [Sass](http://sass-lang.com/)
+ [Gulp](http://gulpjs.com/) installed globally

## Installation

1. Clone repo.
2. Copy it's contents to a new local directory.
3. Commit to new repo.
2. Run `npm install` within the root of the local repo.
3. Run one of the gulp tasks depending on the need.

## Gulp Tasks

Available tasks include:

1. **`run-debug`**
2. **`run-inspect`**
3. **`build-release`**

These tasks are located in the tasks folder in the root directory of the repository.

## Browser Synchronization

There is no baked in support for browser synchronization in this starterkit. For browser synchronization (e.g. live reload) during project development you have your choice of tools to use. We kept the starterkit agnostic in this respect to keep the gulp file as simple as possible. There are a number of choices that you have though:

1. [Ghostlab](http://vanamco.com/ghostlab/)
2. [BrowserSync](http://www.browsersync.io/)