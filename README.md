# SurfNative
React Native application for [surfcheck app](https://github.com/fabriziobertoglio1987/surfcheck).

## Installation Instruction
Start your android/ios emulator

```
git checkout git@github.com:fabriziobertoglio1987/surfnative.git
react-native start
# for android
react-native run-android
# for ios
react-native run-ios
```

## Main App Features
* Native application available for Iphone and Android
* Authentication via email/password or Google Account
* Takes pictures and Uploades them to a backend server
* Recording geolocation of picture
* Listing surfspots pictures filtered by location, date, likes etc..
* Notifing users based on their location/preferences
* Videos of surf conditions
* Surf info retrieved via api

## Technical Details
* React native app
* Libraries:
  - React Native Navigation
  - React Native Camera
  - React Native Base
  - React Native Elements
  - React Native Google Signin
* Project Structure:
  - app/screens: all the projects screens components 
  - app/config: autogenerated file to set up backend server ip
  - app/components: project components to render error messages, posts, google authentication button
  - app/lib: javascript classes which do not use react, responsible for api calls or for handling logic not-relevant to react

The [backend](https://github.com/fabriziobertoglio1987/surfcheck) is built with ruby on rails, hosting both web application and json-api. 
