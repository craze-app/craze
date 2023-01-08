
# Contribution Guide

You can follow the steps below to contribute to this project:

## Issues

First, create an issue to report a feature or bug you want to fix. Assign the issue to yourself and start working on it.

## Branches

-   To fix a bug: create a branch named `fix/bug-name`.
-   To add a new feature: create a branch named `feature/feature-name`.

## Coding
> If you are going to make an edit to the code, please first consult the [Code Style Guide](/docs/CODESTYLE-en.md).

Use the standard file structure for features. To create a directory for a feature, create a `/src/features/FeatureName` directory. The following files should be inside this directory:

-   `FeatureName.tsx`: The main file where the feature is created. There should be no logic code in this React component. It should also contain the required InputBar and OutputBar components.
-   `FeatureName.service.ts`: The logic for the feature should be written in this service class.
-   `FeatureName.store.ts`: State management for each feature should be done using zustand in a store file specific to that feature.
-   `FeatureName.types.ts`: TypeScript feature-specific type/interface/enum definitions should be made and exported in this file.
-   `FeatureName.module.scss`: The style definitions for the React component should be made using module.css and scss in this file.

In addition, there should be at least one test for each new feature. To test the logic in your service file, create a test file named `FeatureName.spec.ts` in the `/test/unit/services` directory.

Finally, to make the feature visible in the application, add it to the features list in the `/src/features.tsx` file.

## Test and Build

During development, you can run the electron app on your own computer using the `yarn dev` command. When you have completed the development process, follow these steps in order:

-   Run `yarn lint` to verify compliance with the code style.
-   Run `yarn test` to verify that all tests have been completed successfully.
-   Run `yarn build` to create a stable build of the software.

## Pull Request

After you have finished your changes, commit and push your code to the branch you opened. Create a pull request on GitHub and specify what you changed and how you fixed it. Don't forget to include a screenshot if you added a feature. You should also use the `develop` branch as the target branch. Only when a new release is shared is the merge operation performed on the `main` branch
