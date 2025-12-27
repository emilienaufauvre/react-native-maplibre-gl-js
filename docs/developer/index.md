# How it works

** TODO rewrite this page to include Map source vs Web object **


## The main library mechanism

The library exposes React Native components that wrap MapLibre GL JS classes.
To communicate between the React Native world and the MapLibre GL JS (web)
world, the library uses a WebView component that runs the MapLibre GL JS code.
This WebView is wrapped within a `MapProvider` component that manages messages
between the two worlds. Then, within the provider, one can insert MapLibre GL JS
components such as `Map`, `Marker`, `Popup`, etc. as direct children.


## The React Native components

A component provided by this library is made of two parts:
- Props that are made of `options` and `listeners` based on the underlying
  MapLibre GL JS object.
- Ref that exposes methods and properties of the underlying MapLibre GL JS
  object.

When the component mount for the first time, a message is sent to the WebView,
through the `MapProvider`, to create the corresponding MapLibre GL JS
object with the `options` provided in props. Then, the web object subscribes to
the events specified in the `listeners` property.

When a component method is called, a message is sent through the `MapProvider`
to the WebView, where the corresponding MapLibre GL JS method is called. Then,
the result is sent back to the React Native world and returned to the caller
using a `Promise`.

The same mechanism is used for the listeners. When an event is triggered in the
WebView, a message is sent to the React Native world, where the corresponding
listener is called.


## TypeScript support

TypeScript usage makes it possible to infer every method, property and event
listener available on each component. These are directly mapped to the official
MapLibre GL JS documentation, with some adjustments to make it work in React
Native. The methods, properties and listeners that are modified are available in
the `{ComponentName}.types.ts` file.


## Developer jargon

The following terms are used throughout the documentation and codebase.

| Name       | Definition                                                                                                                                                                                                                                                                                  |
|------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| RN world   | The React Native environment.                                                                                                                                                                                                                                                               |
| Web world  | The JS that runs within the React Native WebView (i.e. the code that runs the underlying MapLibre GL JS library). The corresponding code is stored in the [`web` folder](./../../src/web).                                                                                                  |
| Web object | A MapLibre GL JS object running in the `web world`. Except for the map, this is a MapLibre GL JS object that uses `.addTo(map)` method to be mounted on map. Multiple React Native components in this library are implementing a bridge to a `web object`.                                  |
| Map source | A MapLibre GL JS map source running in the `web world`. This is a MapLibre GL JS object that is mounted to the map using `map.addSource()` (and then `map.addLayer()` to add visible layers). Multiple React Native components in this library are implementing a bridge to a `map source`. |


## The code structure

### [`src/communcation`](./../../src/communication)

```mermaid
graph TD
A[src] --> B[communication]

B --> B1[Handle messages that are exchanged between the web world and the React Native one]

class B1 descriptionBlock;
classDef descriptionBlock fill:#CCC,stroke:#333,stroke-width:1px,rx:10,ry:10,color:#000,font-style:italic;
```

### [`src/react-native`](./../../src/react-native)

The React Native world that is used by this library end user.

```mermaid
graph TD
A[src] --> D[react-native]

D --> D2[components]
D --> D3[components-factories]
D --> D4[hooks]
D --> D5[logger]

D2 --> D2a[
Components exposed by the public
API
]
D3 --> D3a[
Factories to create components
that exchange with the web world
]
D4 --> D4a[
Shared hooks across components
]
D5 --> D5a[
Logs issued by the library
]

class D2a,D3a,D4a,D5a descriptionBlock;
classDef descriptionBlock fill:#CCC,stroke:#333,stroke-width:1px,rx:10,ry:10,color:#000,font-style:italic;
```

### [`src/web`](./../../src/web)

The web world that runs the MapLibre GL JS library.

```mermaid
graph TD
A[src] --> C[web]

C --> C2[bridge]
C --> C3[controllers]
C --> C4[generated]
C --> C5[logger]

C2 --> C2a[
Communication layer to
receive and send messages
to the React Native world
]
C3 --> C3a[
Core logic that create,
mount, update, unmount,
MapLibre GL JS object
]
C4 --> C4a[
Auto-generated code used
in the React Native WebView
]
C5 --> C5a[
Forward logs to React Native
for display
]

class C2a,C3a,C4a,C5a descriptionBlock;
classDef descriptionBlock fill:#CCC,stroke:#333,stroke-width:1px,rx:10,ry:10,color:#000,font-style:italic;
```


## Current status

Here is a status of the MapLibre GL JS classes implemented in this library as
React Native components.

### Definitions

| Symbol | Definition      |
|--------|-----------------|
| 🖼️    | Core            |
| 🫟     | Web Object view |
| 🧩     | Map Source view |
| 🕹     | Control view    |
| 👆     | Gesture handler |
| 📦     | Data container  |

### Implemented classes

| Implemented class | Type |
|-------------------|------|
| Map               | 🖼️  |
| Marker            | 🫟   |
| Popup             | 🫟   |
| GeoJSONSource     | 🧩   |
| ImageSource       | 🧩   |
| VideoSource       | 🧩   |
| VectorTileSource  | 🧩   |
| RasterTileSource  | 🧩   |

### To be implemented classes

Source classes can be instantiated using the `Map` component listeners (see
[the map examples](./../../example/src/app/1.-Map)).
However, the library tries to implement most of them as React Native components
to make it easier to use.

| To be implemented class          | Type |
|----------------------------------|------|
| AttributionControl               | 🕹️  |
| CanvasSource                     | 🧩   |
| GlobeControl                     | 🕹️  |
| GlobeControl                     | 🕹️  |
| LogoControl                      | 🕹️  |
| NavigationControl                | 🕹️  |
| RasterDEMTileSource              | 🧩   |
| ScaleControl                     | 🕹️  |
| TerrainControl                   | 🕹️  |

### Unsupported classes

The following table lists the MapLibre GL JS classes that are not implemented
because they are not relevant in the React Native context.

| Unsupported class                | Type | Reason                                           |
|----------------------------------|------|--------------------------------------------------|
| AJAXError                        | 📦   | No need to instantiated to use the public API.   |
| BoxZoomHandler                   | 👆   | No need to instantiated to use the public API.   |
| CooperativeGesturesHandler       | 👆   | No need to instantiated to use the public API.   |
| DoubleClickZoomHandler           | 👆   | No need to instantiated to use the public API.   |
| DragPanHandler                   | 👆   | No need to instantiated to use the public API.   |
| DragRotateHandler                | 👆   | No need to instantiated to use the public API.   |
| EdgeInsets                       | 📦   | No need to instantiated to use the public API.   |
| Event                            | 📦   | No need to instantiated to use the public API.   |
| Evented                          | 📦   | No need to instantiated to use the public API.   |
| FullscreenControl                | 🕹   | No need to control fullscreen.                   |
| Hash                             | 🫟   | Browser URL is not visible in WebView.           |
| KeyboardHandler                  | 👆   | No need to instantiated to use the public API.   |
| LngLat                           | 📦   | LngLatLike type is enough to provide coordinate. |
| LngLatBounds                     | 📦   | No need to instantiated to use the public API.   |
| MapMouseEvent                    | 📦   | No need to instantiated to use the public API.   |
| MapTouchEvent                    | 📦   | No need to instantiated to use the public API.   |
| MapWheelEvent                    | 📦   | No need to instantiated to use the public API.   |
| MercatorCoordinate               | 📦   | No need to instantiated to use the public API.   |
| ScrollZoomHandler                | 👆   | No need to instantiated to use the public API.   |
| Style                            | 📦   | No need to instantiated to use the public API.   |
| TwoFingersTouchPitchHandler      | 👆   | No need to instantiated to use the public API.   |
| TwoFingersTouchRotateHandler     | 👆   | No need to instantiated to use the public API.   |
| TwoFingersTouchZoomHandler       | 👆   | No need to instantiated to use the public API.   |
| TwoFingersTouchZoomRotateHandler | 👆   | No need to instantiated to use the public API.   |
