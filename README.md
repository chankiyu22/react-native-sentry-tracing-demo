# react-native-sentry-tracing-demo

## App

```
$ cd reactnativeapp
```

### Prerequisite

- nvm
- yarn
- CocoaPods
- xcode

### Setup

```
$ nvm use
```

```
$ yarn
```

#### iOS

```
$ cd ios
$ pod install
```

### Development

```
$ nvm use
```

```
$ npx react-native start
```

```
$ npx react-native run-ios
```

### Sentry Tracing Debrief

- [Init tracing](https://docs.sentry.io/platforms/react-native/performance/#enable-tracing), `Sentry.init` in `index.js`
- [Start tracing by navigation](https://docs.sentry.io/platforms/react-native/performance/instrumentation/automatic-instrumentation/#react-navigation-v5) in `App.tsx`
    - Taking react navigation v5 as an example
- [Component profiling](https://docs.sentry.io/platforms/react-native/performance/instrumentation/automatic-instrumentation/#react-profiler) in `Home.tsx`
- [XHR tracing](https://docs.sentry.io/platforms/react-native/performance/instrumentation/automatic-instrumentation/#tracingorigins) in `Details.tsx`
- [Custom tracing](https://docs.sentry.io/platforms/react-native/performance/instrumentation/custom-instrumentation/) in `Details.tsx`

## Dummy server

```
$ cd dummy-server
```

### Prerequisite

- nvm
- yarn

### Setup

```
$ nvm use
```

```
$ yarn
```

### Development

```
$ nvm use
```

```
$ node app.js
```
