<div align="center">
  <h1>react-native-maplibre-gl-js</h1>
</div>
<div align="center">
  <img src="https://img.shields.io/github/license/emilienaufauvre/react-native-maplibre-gl-js?style=for-the-badge&labelColor=black" />
  <img src="https://img.shields.io/github/actions/workflow/status/emilienaufauvre/react-native-maplibre-gl-js/ci.yml?branch=main&style=for-the-badge&label=CI&labelColor=black" />
  <img src="https://img.shields.io/github/actions/workflow/status/emilienaufauvre/react-native-maplibre-gl-js/cd.yml?branch=main&style=for-the-badge&label=CD&labelColor=black" />
  <img src="https://img.shields.io/npm/v/react-native-maplibre-gl-js.svg?style=for-the-badge&label=NPM&labelColor=black" />
</div>

<div align="center">
  <br/>
  <p>
    A TypeScript library to enable the use of
    <a href="https://github.com/maplibre/maplibre-gl-js" target="_blank">
        MapLibre GL JS
    </a>
    within React Native.
    <br/>
    Aims to bring all the web features into React Native components, thereby
    offering new capabilities to React Native developers.
  </p>
  <p align="center">
    <img
      src="./res/demo1.gif"
      width="300"
      alt="Example of a MapLibre GL JS map in React Native with marker drag"
    />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <img
      src="./res/demo2.gif"
      width="300"
      alt="Example of a MapLibre GL JS map in React Native with flyto camera animation"
    />
  </p>
</div>

> [!IMPORTANT]
> This project **is not** affiliated with, endorsed by, or sponsored by MapLibre.


## Supported platforms

| Platform | Status |
|--------|--------|
| iOS | ✅ |
| Android | ✅ |
| Web | ❌ |

## Documentation

📘 [**API Reference** – Complete TypeScript API documentation.](./docs/api/index.md)

🧪 [**Examples** – Real-world examples showcasing common use cases.](./docs/examples/index.md)

📚 [**For library developers** – Internal architecture, glossary and design decisions.](./docs/developer/index.md)


## Installation

```sh
npm install react-native-maplibre-gl-js
```

## Getting started

The minimal setup to render a MapLibre map in React Native.

```js
import { MapProvider, Map } from 'react-native-maplibre-gl-js';

const App = () => {
  return (
    <MapProvider>
      <Map
        options={{
          style: 'https://tiles.openfreemap.org/styles/liberty',
          center: [2.32, 48.86],
          zoom: 12,
        }}
      />
    </MapProvider>
  )
}

export default App
```


## Design rationale

Explain why I decided to build a new React Native map library instead of using
an existing one.

### Existing React Native map solutions

Considering tile-based maps, these are the maintained or supported libraries
that can be used in React Native. Each has its strengths, and credit goes to
their contributors. Still, I have highlighted what I consider to be their main
drawbacks.

| Library                     | Notes                                                                  | Main Drawbacks                                                                                                                                                                                                                                                                                                                                                       |
|-----------------------------|------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `react-native-maps` / `expo-maps` | Overlay custom tiles on Apple Maps (iOS) or Google Maps (iOS/Android). | - On tile loading, the map below (Google Maps or Apple Maps) is visible.<br/>- If the map provider is Google Maps (mandatory on the Android platform), an API key is needed to use Google Maps SDK, and therefore its use is billed.                                                                                                                                      |
| `@rnmapbox/maps`             | -                                                                      | - Dependence on Mapbox choices.<br>- On the latest versions, an API key is required (at least on the Android side that drops the MapLibre SDK support), and therefore its use is billed.<br>- To render animated markers or markers with dynamic content and developed visual styles, the use of native views is necessary, and this greatly slows down the application. |
| `maplibre-react-native`      | Open source fork of MapBox.                                            | - Being an open source fork of MapBox, the library is years behind (1000+ commits to date) and lacks many features and bug fixes.<br>- The same performance issue with native views as `@rnmapbox` is also present.                                                                                                                                                  |

### Architectural approach

To address these drawbacks, two main approaches are possible (as far as I know):
either build a library on top of native views using free mobile SDKs (such as
MapLibre Native, meaning the effort should instead go into improving
`maplibre-react-native`), or leverage existing web-based map libraries.

The second option is far easier to build and maintain since it relies on a
single rendering engine rather than separate iOS and Android SDKs. It also opens
the door to fixing performance issues and limitations found in earlier
libraries, while enabling more features.

I outline two solutions in this category below, along with the issues they still
carry. This library implements the second approach.

| Approach                                      | Description                                                                                   | Main Drawbacks                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|-----------------------------------------------|-----------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Remote WebView-based map                      | Host a map on a web page and access it through a WebView.                                          | - Requires additional infrastructure.<br>- Very sensitive to network latency, and in general, a degraded user experience.<br>- Offline usage is not possible.                                                                                                                                                                                                                                                                                                                                                                            |
| Embedded WebView with bundled MapLibre GL JS | Bundle JS code that runs MapLibre GL JS, enabling two-way communication with React Native, and inject it into a WebView for execution. | - Any interaction between the WebView content and the React Native world is made through message-passing, which can make certain interactions more indirect.<br>- Some objects cannot be serialized and sent between the WebView code and React Native (e.g., HTMLElement).<br>- Some GitHub repositories are implementing this solution, however, no one is actively maintained, and the underlying web libraries are missing key features — good examples being `react-native-leaflet-view` and `@neukolabs/react-native-maplibre-js`. |


## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)


## Credits

- [OpenFreeMap](https://openfreemap.org/) for providing free tile data in the
  examples ❤️.


## License

MIT

---
