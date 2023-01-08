
# Coding Style Guide

There are a few points to consider when developing the Craze app. If you want to contribute to this open source project, you must follow these rules to ensure the sustainability of the application. If you want to contribute and haven't read it yet, first take a look at the [Contribution Guide](/CONTRIBUTING-en.md).

## Codebase

Craze is a cross-platform desktop application developed using [Electron](https://www.electronjs.org/). [TypeScript](https://www.typescriptlang.org/) is used to ensure code reliability on both the server and client sides. [React](https://reactjs.org/) is chosen to facilitate dynamic rendering/state management on the client side.

> TypeScript and React were chosen for Craze as a community application through a poll on Twitter.

## Linter/Formatter

[ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) are used to have a standard style when developing the application. Prettier works in conjunction with ESLint, so activating the ESLint plugin in your editor or IDE is sufficient.

## Command Line

To speed up the work of those who want to add new features to Craze, we have created a command file. When you run the following code from the command line, the command will create a feature file structure in the `src/features` directory with the name you specify. You are not required to use this command to create a new feature, this is just a helper command. Keep in mind that there will be no logic in the created feature files and you will need to fill it in.

```sh
yarn generate-feature markdown-editor
```

After running the command, if you see the successfully created message, add your feature to the `features` array in the `src/features.tsx` file. Your feature will be listed in this way in the left menu and will be accessible. There is an icon for each feature in the left menu and you can choose an icon from [Tabler Icons](https://tabler-icons.io/) for your feature. If your feature does not have an icon, you can create an SVG file or use a text icon.

## 3rd Party Packages

We use [Yarn](https://yarnpkg.com/) as our package manager to avoid creating different lock files. If you want to include a new npm package in the codebase, there are three points to consider:

Before these three points, if you can easily provide the same functionality without including a 3rd party package, it is beneficial to avoid adding extra packages.

1.  Check if there is another package in the project that does the same job. For example, use the `ace-editor` package that is already available for code blocks and do not include alternatives such as `monaco-editor` in the project.
2.  Make sure the 3rd party package you want to include does not require internet access to work. Craze should be an application that can work offline.
3.  Correctly distinguish between `dependency` and `devDependency` for the 3rd party package you want to include. Craze is an Electron application, so this distinction may seem strange to you if you have not developed an Electron application before. However, during the build process, when the project is converted into an executable application, the `devDependency` list will also be included in the application. The distinction can be made as follows:


| Classification | Example 3rd Party Applications | dependencies | devDependencies |
|--|--|--|--|
| NodeJS Native Modules (C/C++) | serialport, sqlite3 | ✅ | ❌ |
| NodeJS CJM and ESM Modules | bcrypt, execa | ❌ | ✅ |
| Web Modules | formik, lodash | ❌ | ✅ |

## Current 3rd Party Assistants

You can see the usage areas of some of the existing 3rd party packages in the project in the list below. This list may not always be up to date, to see all packages, you can look at the `package.json` file in the `develop` branch.

| Package | Use |
|--|--|
| [React](https://reactjs.org/) | This is the library we use for rendering, managing state, and setting up the component hierarchy. |
| [Zustand](https://github.com/pmndrs/zustand) | This is the preferred package for managing global state. Each feature also has its own store file where state management is provided. |
| [Lodash](https://lodash.com/docs/) | Lodash can be thought of as a Swiss Army knife. It provides helper functions for working with arrays, strings, dates, functions, and objects. |
| [Formik](https://formik.org/docs/overview) | You can use Formik to manage forms in your React component. |
| [Fuse.js](https://fusejs.io/) | Fuse.js provides a comprehensive search capability for features that require search. |
| [Classnames](https://www.npmjs.com/package/classnames) | Allows you to combine multiple styles you want to include in your React component, and also allows you to add styles conditionally. |

## CSS and UI Kit

Craze does not contain any UI Kit. For writing scoped CSS, we use Module.css. We also use SCSS to improve code readability and writing comfort. If you are developing a feature, there will be a module.scss file for that feature. Styles that are intended to affect the entire application are located in `src/assets/styles`.

## Testing

Currently, there are unit tests in the project, and a minimum of one unit test must be created for each developed feature. The [Jest](https://jestjs.io/) library is used for testing. You can also get help from ChatGPT to create unit tests; it will prepare a few scenarios for you to start with.

You can also contribute to other types of tests in addition to unit tests. You can create a directory alongside the `unit` directory in the `tests` folder and write the tests you want to create in that directory.
