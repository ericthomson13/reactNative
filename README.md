# Introduction to React-Native

These are practice apps built for a Udemy course on React-Native.

It contains several different applications built throughout the course.

These applications were built to optimally run on iOS or Android but will also work on web.

### Running Applications in Emulators for iOS and Android:

To be able to run any of these applications in an iOS emulator you must have a Mac, XCode and the iOS Simulator.  To set up an iOS simulator follow the instructions [here](https://www.macinstruct.com/node/494)

To run the application on Android you will need [AndroidStudio](https://developer.android.com/studio) installed and have to have an Android device configured.  Instructions for how to create a virtual Android device can be found [here](https://developer.android.com/studio/run/managing-avds).

### If You Want to Run Any of the Applications:

If you'd like to run any of the 4 applications within this repository you must first have both the [Expo-CLI](https://expo.io/learn) and [NodeJS](https://nodejs.org/en/download/) installed.

To install Expo-CLI using npm run:

```bash
npm install expo-cli --global
```

To use any individual application navigate to the folder for whichever application you'd like to use.

Install the necessary packages via:

```bash
npm install
```

To start the application run:
```bash
expo start
```

Once the Metro-Bundler has launched you can compile the application for whichever devices you would like to run.  If running emulators for iOS or Android and the app does not launch on the emulator you may have to install the Expo app onto the emulator through the AppStore or GooglePlay Store.

### App Descriptions:

1. Course Goals App:
    - This is a riff on a CRUDy To-Do app. Used as a basic introduction to React-Native.
    - This introduced basic concepts of React Native including styling, React Native components, and setting up and running multiple emulators.

2. Number Guesser Game App:
    - This app allows for the user to select a number and then tells the computer whether it is higher or lower than the selected number.
    - The techonolgies that were familarized were adding custom fonts, configuring custom headers, styling for multiple platforms in React Native.

3. Meals App:
    - This app allows you to select different recipes. It allows the user to select favorites and filter recipes by dietary preferences.
    - The technologies that were familiarized were React Navigation (stack, tabs, and drawers), Redux with hooks, and useCallback hook.

4. Shopping App:
    - This app allows you to navigate a small retail store, add and remove items from a shopping cart.
    - The technologies that were familiarized were handling and validating user input, adding database and http server requests, and user auth.
