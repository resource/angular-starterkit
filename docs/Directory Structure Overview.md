# Directory Structure Overview

Below is a description of the most significant folders and files that make up this projects's general structure.

- *"build-config.js"* - Edit this file if you want to change the default project build behavior.
- **build-scripts/** ~ Supporting files used for building the project. You'll never use these files directly. To change the build behavior edit the configuration files at the root of the project.
- **debug/** (auto-generated) ~ The output directory used when running a debug build of this project.
- **docs/** ~ Use this folder for developer documentation.
- **source/**
    - **app/** ~ Use this folder for all HTML and JavaScript source files that comprise this Angular application. Files in this folder will be automatically preprocessed and concatenated during the automated build process. 
    - **assets/** ~ Use this folder for any static assets used by the application. Files in this folder are copied as-is during the automated build process without any pre-processing.
    - **libs/** ~ Use this folder for 3rd party code used by the application including **JavaScript** and **CSS** files. JavaScript files in this directory will be automatically concatenated into a single "libs.js" file during the build process. CSS files will be automatically concatenated to a "libs.css" file. If you have a 3rd party library that you _do not_ want to be concatenated place it under **source/assets/libs** instead.
    - *"server.js"* ~ A simple web server used during debugging. You should not have to edit this file.
    - **styles/** ~ Use this folder for your "main.scss" file and supporting SCSS files. You may also place SCSS files in other directories as long as you include them in "main.scss".
- **release/** (auto-generated) ~ The output directory when running a release build of this project.
- **tests/** ~ Use this folder for all automated test files.
    - **e2e/** ~ Use this folder for all your application's end-to-end tests. Make sure your test files end in "*.spec.js".
    - **libs/** ~ Use this folder for any 3rd party code that is needed by your tests.
    - **unit/** ~ Use this folder for all your application's unit tests. Make sure your test files end in "*.spec.js".