# WebStorm Setup Guide

This guide will walk you through how to set up this project with JetBrains' wonderful WebStorm IDE. Use of WebStorm is _completely optional_, but it will provide you with a very pleasant development experience!

## Running The Project

A Gulp task called "run-debug" is provided to build and run the project during development. To set up a WebStorm build configuration that executes this task, follow these steps:

1. Select **Run > Edit Configurations...**.
1. Click on the **+** and select "Gulp.js".
1. Set the **Name** of the new configuration to "Debug".
1. From the **Gulpfile** dropdown select "{ path-to-your-project }/build-scripts/gulpfile.js_
1. From the **Tasks** dropdown select "run-debug".
1. Click "OK" to save your configuration and dismiss the dialog.

Try running the project by selecting "Debug" from the menu in the upper right of the editor and then clicking the ▶︎ (run) button next to it. This builds the project and deploy it to a local web server (on port 3000 by default). Just open [http://localhost:3000](http://localhost:3000) to access the running app.

As long as you keep the project's web server running any changes you make to any of the source files will automatically trigger a rebuild of the project, providing a very efficient workflow as you develop. You can stop the web server at any time by clicking the ◼︎ (stop) button in the WebStorm **Run** panel.

## Running Unit Tests

Before you can run your unit tests from within WebStorm you'll need to follow these steps:

1. Select **Run > Edit Configurations...**.
1. Click on the **+** and select "Gulp.js".
1. Set the **Name** of the new configuration to "Build".
1. From the **Gulpfile** dropdown select "{ path-to-your-project }/build-scripts/gulpfile.js_
1. From the **Tasks** dropdown select "run-build".
1. Click "Apply".
1. Click on the **+** and select "Karma".
1. Set the **Name** of the new configration to "Run Unit Tests".
1. From the **Configuration file** dropdown select "{ path-to-your-project }/tests/karma.conf.js".
1. In the **Before launch** section click **+**, choose **Run Another Configuration**, and select the **"Build"** configuration.
1. Click the **OK** button to save your configuration and dismiss the dialog.

Try running the unit tests by selecting "Run Unit Tests" from the menu in the upper right of the editor and then clicking the ▶︎ (run) button next to it. If everything is set up correctly you should see the WebStorm **Run** panel appear containing **Test Runner** and **Karma Server** tabs and displaying a set of passing test results.

> **Tip:** Click the "Toggle auto-test" button in the WebStorm Test Runner tab and WebStorm will automatically re-run your tests whenever you make changes to any file.

## Running End-To-End Tests

Before you can run your end-to-end tests from within WebStorm you'll need to follow these steps:

1. Select **Run > Edit Configurations...**.
1. Click on the **+** and select "Gulp.js".
1. Set the **Name** of the new configuration to "Run E2E Tests".
1. From the **Gulpfile** dropdown select "{ path-to-your-project }/build-scripts/gulpfile.js_
1. From the **Tasks** dropdown select "run-e2e-tests".
2. In the **Environment** field, click the **[…]** button to open the **Environment Variables** dialog.
3. Click the **+** to add a new environment variable named "PORT" and set its value to "3001".
4. Click "OK" to close the **Environment Variables** dialog.
1. Click "OK" to close the **Run/Debug Configurations** dialog.

Try running the end-to-end tests by selecting "Run E2E Tests" from the menu in the upper right of the editor and then clicking the ▶︎ (run) button next to it. If everything is set up correctly you should see the WebStorm **Run** panel appear and display a passing test result.

> Note, the first time you run this it may take a while as it installs any required dependencies.

## Creating a Release Build

To set up a WebStorm build configuration that generates a release build of the project, follow these steps:

1. Select **Run > Edit Configurations...**.
1. Click on the **+** and select "Gulp.js".
1. Set the **Name** of the new configuration to "Release".
1. From the **Gulpfile** dropdown select "{ path-to-your-project }/build-scripts/gulpfile.js_
1. From the **Tasks** dropdown select "run-build".
2. Set **Arguments** to "--buildtype release".
1. Click "OK" to save your configuration and dismiss the dialog.

Try generating a release build of the project by selecting "Release" from the menu in the upper right of the editor and then clicking the ▶︎ (run) button next to it. This creates an optimized build of the project and places deployment-ready files in a "release" folder.

## Enabling JSHint Validation

This project use [**JSHint**](http://jshint.com/about/) to encourage a consistent programming style among team members. You'll want to enable JSHint support in WebStorm by following these steps.

1. Open the WebStorm preferences by selecting **WebStorm > Preferences...**.
2. Search for "jshint" _or_ navigate to **Languages & Frameworks > JavScript > Code Quality Tools > JSHint**.
3. Set **Enable** to "on" (checked).
4. Set **Use config files** to "on" (checked).
5. Set **Location** to "Default".
6. Click "Apply" to save the changes.
7. While still in the **Preferences** dialog, type "unresolved" into the search field.
8. Locate the entries for "Unresolved JavaScript function" and "Unresolved JavaScript variable" and turn them both "off" (unchecked).
9. Click "OK" to save your changes and dismiss the **Preferences** dialog.

