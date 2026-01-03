[react-native-maplibre-gl-js](../../index.md) / [Public API](../index.md) / MapRef

# MapRef

Defined in: [src/react-native/components/web-objects/Map/Map.types.ts:33](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/web-objects/Map/Map.types.ts#L33)

Map component ref.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="getid"></a> `getId` | () => `string` |  |
| <a id="off"></a> `off` | (...`args`: \[`string`, `Listener`\]) => `Promise`\<`Map$1`\> |  |
| <a id="fire"></a> `fire` | (...`args`: \[`string` \| `Event$1`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="stop"></a> `stop` | (...`args`: \[\]) => `Promise`\<`Map$1`\> |  |
| <a id="resize"></a> `resize` | (...`args`: \[`any`, `boolean`\]) => `Promise`\<`Map$1`\> |  |
| <a id="_terraindatacallback"></a> `_terrainDataCallback` | (...`args`: \[`MapStyleDataEvent` \| `MapSourceDataEvent`\]) => `Promise`\<`void`\> |  |
| <a id="_getmapid"></a> `_getMapId` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="setglobalstateproperty"></a> `setGlobalStateProperty` | (...`args`: \[`string`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="getglobalstate"></a> `getGlobalState` | (...`args`: \[\]) => `Promise`\<`Record`\<`string`, `any`\>\> |  |
| <a id="addcontrol"></a> `addControl` | (...`args`: \[`IControl`, `ControlPosition`\]) => `Promise`\<`Map$1`\> |  |
| <a id="removecontrol"></a> `removeControl` | (...`args`: \[`IControl`\]) => `Promise`\<`Map$1`\> |  |
| <a id="hascontrol"></a> `hasControl` | (...`args`: \[`IControl`\]) => `Promise`\<`boolean`\> |  |
| <a id="coveringtiles"></a> `coveringTiles` | (...`args`: \[`CoveringTilesOptions`\]) => `Promise`\<`OverscaledTileID`[]\> |  |
| <a id="calculatecameraoptionsfromto"></a> `calculateCameraOptionsFromTo` | (...`args`: \[`LngLat`, `number`, `LngLat`, `number`\]) => `Promise`\<`CameraOptions`\> |  |
| <a id="_resizetransform"></a> `_resizeTransform` | (...`args`: \[`boolean`\]) => `Promise`\<`void`\> |  |
| <a id="_getclampedpixelratio"></a> `_getClampedPixelRatio` | (...`args`: \[`number`, `number`\]) => `Promise`\<`number`\> |  |
| <a id="getpixelratio"></a> `getPixelRatio` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="setpixelratio"></a> `setPixelRatio` | (...`args`: \[`number`\]) => `Promise`\<`void`\> |  |
| <a id="getbounds"></a> `getBounds` | (...`args`: \[\]) => `Promise`\<`LngLatBounds`\> |  |
| <a id="getmaxbounds"></a> `getMaxBounds` | (...`args`: \[\]) => `Promise`\<`LngLatBounds` \| `null`\> |  |
| <a id="setmaxbounds"></a> `setMaxBounds` | (...`args`: \[`LngLatBoundsLike` \| `null`\]) => `Promise`\<`Map$1`\> |  |
| <a id="setminzoom"></a> `setMinZoom` | (...`args`: \[`number` \| `null`\]) => `Promise`\<`Map$1`\> |  |
| <a id="getminzoom"></a> `getMinZoom` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="setmaxzoom"></a> `setMaxZoom` | (...`args`: \[`number` \| `null`\]) => `Promise`\<`Map$1`\> |  |
| <a id="getmaxzoom"></a> `getMaxZoom` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="setminpitch"></a> `setMinPitch` | (...`args`: \[`number` \| `null`\]) => `Promise`\<`Map$1`\> |  |
| <a id="getminpitch"></a> `getMinPitch` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="setmaxpitch"></a> `setMaxPitch` | (...`args`: \[`number` \| `null`\]) => `Promise`\<`Map$1`\> |  |
| <a id="getmaxpitch"></a> `getMaxPitch` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="getrenderworldcopies"></a> `getRenderWorldCopies` | (...`args`: \[\]) => `Promise`\<`boolean`\> |  |
| <a id="setrenderworldcopies"></a> `setRenderWorldCopies` | (...`args`: \[`boolean` \| `null`\]) => `Promise`\<`Map$1`\> |  |
| <a id="settransformconstrain"></a> `setTransformConstrain` | (...`args`: \[`TransformConstrainFunction` \| `null`\]) => `Promise`\<`Map$1`\> |  |
| <a id="project"></a> `project` | (...`args`: \[`LngLatLike`\]) => `Promise`\<`Point`\> |  |
| <a id="unproject"></a> `unproject` | (...`args`: \[`PointLike`\]) => `Promise`\<`LngLat`\> |  |
| <a id="ismoving"></a> `isMoving` | (...`args`: \[\]) => `Promise`\<`boolean`\> |  |
| <a id="iszooming"></a> `isZooming` | (...`args`: \[\]) => `Promise`\<`boolean`\> |  |
| <a id="isrotating"></a> `isRotating` | (...`args`: \[\]) => `Promise`\<`boolean`\> |  |
| <a id="_createdelegatedlistener"></a> `_createDelegatedListener` | (...`args`: \[`string`, `string`[], `Listener`\]) => `Promise`\<`DelegatedListener`\> |  |
| <a id="_savedelegatedlistener"></a> `_saveDelegatedListener` | (...`args`: \[`string`, `DelegatedListener`\]) => `Promise`\<`void`\> |  |
| <a id="_removedelegatedlistener"></a> `_removeDelegatedListener` | (...`args`: \[`string`, `string`[], `Listener`\]) => `Promise`\<`void`\> |  |
| <a id="on"></a> `on` | (...`args`: \[`string`, `Listener`\]) => `Promise`\<`Subscription`\> |  |
| <a id="once"></a> `once` | (...`args`: \[`string`, `Listener`\]) => `Promise`\<`Promise`\<`any`\> \| `Map$1`\> |  |
| <a id="queryrenderedfeatures"></a> `queryRenderedFeatures` | (...`args`: \[`PointLike` \| \[`PointLike`, `PointLike`\] \| `QueryRenderedFeaturesOptions`, `QueryRenderedFeaturesOptions`\]) => `Promise`\<`MapGeoJSONFeature`[]\> |  |
| <a id="querysourcefeatures"></a> `querySourceFeatures` | (...`args`: \[`string`, `QuerySourceFeatureOptions` \| `null`\]) => `Promise`\<`GeoJSONFeature`[]\> |  |
| <a id="setstyle"></a> `setStyle` | (...`args`: \[`string` \| `StyleSpecification` \| `null`, `StyleSwapOptions` & `StyleOptions`\]) => `Promise`\<`Map$1`\> |  |
| <a id="settransformrequest"></a> `setTransformRequest` | (...`args`: \[`RequestTransformFunction` \| `null`\]) => `Promise`\<`Map$1`\> |  |
| <a id="_getuistring"></a> `_getUIString` | (...`args`: \[`"AttributionControl.ToggleAttribution"` \| `"AttributionControl.MapFeedback"` \| `"FullscreenControl.Enter"` \| `"FullscreenControl.Exit"` \| `"GeolocateControl.FindMyLocation"` \| `"GeolocateControl.LocationNotAvailable"` \| `"LogoControl.Title"` \| `"Map.Title"` \| `"Marker.Title"` \| `"NavigationControl.ResetBearing"` \| `"NavigationControl.ZoomIn"` \| `"NavigationControl.ZoomOut"` \| `"Popup.Close"` \| `"ScaleControl.Feet"` \| `"ScaleControl.Meters"` \| `"ScaleControl.Kilometers"` \| `"ScaleControl.Miles"` \| `"ScaleControl.NauticalMiles"` \| `"GlobeControl.Enable"` \| `"GlobeControl.Disable"` \| `"TerrainControl.Enable"` \| `"TerrainControl.Disable"` \| `"CooperativeGesturesHandler.WindowsHelpText"` \| `"CooperativeGesturesHandler.MacHelpText"` \| `"CooperativeGesturesHandler.MobileHelpText"`\]) => `Promise`\<`string`\> |  |
| <a id="_updatestyle"></a> `_updateStyle` | (...`args`: \[`string` \| `StyleSpecification` \| `null`, `StyleSwapOptions` & `StyleOptions`\]) => `Promise`\<`Map$1`\> |  |
| <a id="_lazyinitemptystyle"></a> `_lazyInitEmptyStyle` | (...`args`: \[\]) => `Promise`\<`void`\> |  |
| <a id="_diffstyle"></a> `_diffStyle` | (...`args`: \[`string` \| `StyleSpecification`, `StyleSwapOptions` & `StyleOptions`\]) => `Promise`\<`void`\> |  |
| <a id="_updatediff"></a> `_updateDiff` | (...`args`: \[`StyleSpecification`, `StyleSwapOptions` & `StyleOptions`\]) => `Promise`\<`void`\> |  |
| <a id="getstyle"></a> `getStyle` | (...`args`: \[\]) => `Promise`\<`StyleSpecification`\> |  |
| <a id="_getstyleandimages"></a> `_getStyleAndImages` | (...`args`: \[\]) => `Promise`\<`LostContextStyle`\> |  |
| <a id="isstyleloaded"></a> `isStyleLoaded` | (...`args`: \[\]) => `Promise`\<`boolean` \| `void`\> |  |
| <a id="addsource"></a> `addSource` | (...`args`: \[`string`, `SourceSpecification` \| `CanvasSourceSpecification`\]) => `Promise`\<`Map$1`\> |  |
| <a id="issourceloaded"></a> `isSourceLoaded` | (...`args`: \[`string`\]) => `Promise`\<`boolean`\> |  |
| <a id="setterrain"></a> `setTerrain` | (...`args`: \[`TerrainSpecification` \| `null`\]) => `Promise`\<`Map$1`\> |  |
| <a id="getterrain"></a> `getTerrain` | (...`args`: \[\]) => `Promise`\<`TerrainSpecification` \| `null`\> |  |
| <a id="aretilesloaded"></a> `areTilesLoaded` | (...`args`: \[\]) => `Promise`\<`boolean`\> |  |
| <a id="removesource"></a> `removeSource` | (...`args`: \[`string`\]) => `Promise`\<`Map$1`\> |  |
| <a id="getsource"></a> `getSource` | (...`args`: \[`string`\]) => `Promise`\<`Source` \| `undefined`\> |  |
| <a id="setsourcetilelodparams"></a> `setSourceTileLodParams` | (...`args`: \[`number`, `number`, `string`\]) => `Promise`\<`Map$1`\> |  |
| <a id="refreshtiles"></a> `refreshTiles` | (...`args`: \[`string`, \{ `x`: `number`; `y`: `number`; `z`: `number`; \}[]\]) => `Promise`\<`void`\> |  |
| <a id="addimage"></a> `addImage` | (...`args`: \[`string`, `string`, `Partial`\<`StyleImageMetadata`\>\]) => `Promise`\<`Promise`\<`void`\>\> |  |
| <a id="updateimage"></a> `updateImage` | (...`args`: \[`string`, `HTMLImageElement` \| `ImageBitmap` \| `ImageData` \| `StyleImageInterface` \| \{ `width`: `number`; `height`: `number`; `data`: `Uint8Array`\<`ArrayBufferLike`\> \| `Uint8ClampedArray`\<`ArrayBufferLike`\>; \}\]) => `Promise`\<`Map$1`\> |  |
| <a id="getimage"></a> `getImage` | (...`args`: \[`string`\]) => `Promise`\<`StyleImage`\> |  |
| <a id="hasimage"></a> `hasImage` | (...`args`: \[`string`\]) => `Promise`\<`boolean`\> |  |
| <a id="removeimage"></a> `removeImage` | (...`args`: \[`string`\]) => `Promise`\<`void`\> |  |
| <a id="loadimage"></a> `loadImage` | (...`args`: \[`string`\]) => `Promise`\<`Promise`\<`GetResourceResponse`\<`HTMLImageElement` \| `ImageBitmap`\>\>\> |  |
| <a id="listimages"></a> `listImages` | (...`args`: \[\]) => `Promise`\<`string`[]\> |  |
| <a id="addlayer"></a> `addLayer` | (...`args`: \[`AddLayerObject`, `string`\]) => `Promise`\<`Map$1`\> |  |
| <a id="movelayer"></a> `moveLayer` | (...`args`: \[`string`, `string`\]) => `Promise`\<`Map$1`\> |  |
| <a id="removelayer"></a> `removeLayer` | (...`args`: \[`string`\]) => `Promise`\<`Map$1`\> |  |
| <a id="getlayer"></a> `getLayer` | (...`args`: \[`string`\]) => `Promise`\<`StyleLayer` \| `undefined`\> |  |
| <a id="getlayersorder"></a> `getLayersOrder` | (...`args`: \[\]) => `Promise`\<`string`[]\> |  |
| <a id="setlayerzoomrange"></a> `setLayerZoomRange` | (...`args`: \[`string`, `number`, `number`\]) => `Promise`\<`Map$1`\> |  |
| <a id="setfilter"></a> `setFilter` | (...`args`: \[`string`, `FilterSpecification` \| `null`, `StyleSetterOptions`\]) => `Promise`\<`Map$1`\> |  |
| <a id="getfilter"></a> `getFilter` | (...`args`: \[`string`\]) => `Promise`\<`void` \| `FilterSpecification`\> |  |
| <a id="setpaintproperty"></a> `setPaintProperty` | (...`args`: \[`string`, `string`, `any`, `StyleSetterOptions`\]) => `Promise`\<`Map$1`\> |  |
| <a id="getpaintproperty"></a> `getPaintProperty` | (...`args`: \[`string`, `string`\]) => `Promise`\<`unknown`\> |  |
| <a id="setlayoutproperty"></a> `setLayoutProperty` | (...`args`: \[`string`, `string`, `any`, `StyleSetterOptions`\]) => `Promise`\<`Map$1`\> |  |
| <a id="getlayoutproperty"></a> `getLayoutProperty` | (...`args`: \[`string`, `string`\]) => `Promise`\<`any`\> |  |
| <a id="setglyphs"></a> `setGlyphs` | (...`args`: \[`string` \| `null`, `StyleSetterOptions`\]) => `Promise`\<`Map$1`\> |  |
| <a id="getglyphs"></a> `getGlyphs` | (...`args`: \[\]) => `Promise`\<`string` \| `null`\> |  |
| <a id="addsprite"></a> `addSprite` | (...`args`: \[`string`, `string`, `StyleSetterOptions`\]) => `Promise`\<`Map$1`\> |  |
| <a id="removesprite"></a> `removeSprite` | (...`args`: \[`string`\]) => `Promise`\<`Map$1`\> |  |
| <a id="getsprite"></a> `getSprite` | (...`args`: \[\]) => `Promise`\<\{ `id`: `string`; `url`: `string`; \}[]\> |  |
| <a id="setsprite"></a> `setSprite` | (...`args`: \[`string` \| `null`, `StyleSetterOptions`\]) => `Promise`\<`Map$1`\> |  |
| <a id="setlight"></a> `setLight` | (...`args`: \[`LightSpecification`, `StyleSetterOptions`\]) => `Promise`\<`Map$1`\> |  |
| <a id="getlight"></a> `getLight` | (...`args`: \[\]) => `Promise`\<`LightSpecification`\> |  |
| <a id="setsky"></a> `setSky` | (...`args`: \[`SkySpecification`, `StyleSetterOptions`\]) => `Promise`\<`Map$1`\> |  |
| <a id="getsky"></a> `getSky` | (...`args`: \[\]) => `Promise`\<`SkySpecification`\> |  |
| <a id="setfeaturestate"></a> `setFeatureState` | (...`args`: \[`FeatureIdentifier`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="removefeaturestate"></a> `removeFeatureState` | (...`args`: \[`FeatureIdentifier`, `string`\]) => `Promise`\<`Map$1`\> |  |
| <a id="getfeaturestate"></a> `getFeatureState` | (...`args`: \[`FeatureIdentifier`\]) => `Promise`\<`any`\> |  |
| <a id="getcontainer"></a> `getContainer` | (...`args`: \[\]) => `Promise`\<`HTMLElement`\> |  |
| <a id="getcanvascontainer"></a> `getCanvasContainer` | (...`args`: \[\]) => `Promise`\<`HTMLElement`\> |  |
| <a id="getcanvas"></a> `getCanvas` | (...`args`: \[\]) => `Promise`\<`HTMLCanvasElement`\> |  |
| <a id="_containerdimensions"></a> `_containerDimensions` | (...`args`: \[\]) => `Promise`\<`number`[]\> |  |
| <a id="_setupcontainer"></a> `_setupContainer` | (...`args`: \[\]) => `Promise`\<`void`\> |  |
| <a id="_resizecanvas"></a> `_resizeCanvas` | (...`args`: \[`number`, `number`, `number`\]) => `Promise`\<`void`\> |  |
| <a id="_setuppainter"></a> `_setupPainter` | (...`args`: \[\]) => `Promise`\<`void`\> |  |
| <a id="migrateprojection"></a> `migrateProjection` | (...`args`: \[`ITransform`, `ICameraHelper`\]) => `Promise`\<`void`\> |  |
| <a id="_contextlost"></a> `_contextLost` | (...`args`: \[`any`\]) => `Promise`\<`void`\> |  |
| <a id="_contextrestored"></a> `_contextRestored` | (...`args`: \[`any`\]) => `Promise`\<`void`\> |  |
| <a id="_onmapscroll"></a> `_onMapScroll` | (...`args`: \[`any`\]) => `Promise`\<`boolean`\> |  |
| <a id="loaded"></a> `loaded` | (...`args`: \[\]) => `Promise`\<`boolean`\> |  |
| <a id="_update"></a> `_update` | (...`args`: \[`boolean`\]) => `Promise`\<`Map$1`\> |  |
| <a id="_requestrenderframe"></a> `_requestRenderFrame` | (...`args`: \[() => `void`\]) => `Promise`\<`number`\> |  |
| <a id="_cancelrenderframe"></a> `_cancelRenderFrame` | (...`args`: \[`number`\]) => `Promise`\<`void`\> |  |
| <a id="_render"></a> `_render` | (...`args`: \[`number`\]) => `Promise`\<`Map$1`\> |  |
| <a id="redraw"></a> `redraw` | (...`args`: \[\]) => `Promise`\<`Map$1`\> |  |
| <a id="remove"></a> `remove` | (...`args`: \[\]) => `Promise`\<`void`\> |  |
| <a id="triggerrepaint"></a> `triggerRepaint` | (...`args`: \[\]) => `Promise`\<`void`\> |  |
| <a id="_onwindowonline"></a> `_onWindowOnline` | (...`args`: \[\]) => `Promise`\<`void`\> |  |
| <a id="getcameratargetelevation"></a> `getCameraTargetElevation` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="getprojection"></a> `getProjection` | (...`args`: \[\]) => `Promise`\<`ProjectionSpecification`\> |  |
| <a id="setprojection"></a> `setProjection` | (...`args`: \[`ProjectionSpecification`\]) => `Promise`\<`Map$1`\> |  |
| <a id="_oneaseframe"></a> `_onEaseFrame` | (...`args`: \[`number`\]) => `Promise`\<`void`\> |  |
| <a id="_oneaseend"></a> `_onEaseEnd` | (...`args`: \[`string`\]) => `Promise`\<`void`\> |  |
| <a id="getcenter"></a> `getCenter` | (...`args`: \[\]) => `Promise`\<`LngLat`\> |  |
| <a id="setcenter"></a> `setCenter` | (...`args`: \[`LngLatLike`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="getcenterelevation"></a> `getCenterElevation` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="setcenterelevation"></a> `setCenterElevation` | (...`args`: \[`number`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="getcenterclampedtoground"></a> `getCenterClampedToGround` | (...`args`: \[\]) => `Promise`\<`boolean`\> |  |
| <a id="setcenterclampedtoground"></a> `setCenterClampedToGround` | (...`args`: \[`boolean`\]) => `Promise`\<`void`\> |  |
| <a id="panby"></a> `panBy` | (...`args`: \[`PointLike`, `EaseToOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="panto"></a> `panTo` | (...`args`: \[`LngLatLike`, `EaseToOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="getzoom"></a> `getZoom` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="setzoom"></a> `setZoom` | (...`args`: \[`number`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="zoomto"></a> `zoomTo` | (...`args`: \[`number`, `EaseToOptions` \| `null`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="zoomin"></a> `zoomIn` | (...`args`: \[`AnimationOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="zoomout"></a> `zoomOut` | (...`args`: \[`AnimationOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="getverticalfieldofview"></a> `getVerticalFieldOfView` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="setverticalfieldofview"></a> `setVerticalFieldOfView` | (...`args`: \[`number`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="getbearing"></a> `getBearing` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="setbearing"></a> `setBearing` | (...`args`: \[`number`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="getpadding"></a> `getPadding` | (...`args`: \[\]) => `Promise`\<`PaddingOptions`\> |  |
| <a id="setpadding"></a> `setPadding` | (...`args`: \[`PaddingOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="rotateto"></a> `rotateTo` | (...`args`: \[`number`, `EaseToOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="resetnorth"></a> `resetNorth` | (...`args`: \[`AnimationOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="resetnorthpitch"></a> `resetNorthPitch` | (...`args`: \[`AnimationOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="snaptonorth"></a> `snapToNorth` | (...`args`: \[`AnimationOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="getpitch"></a> `getPitch` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="setpitch"></a> `setPitch` | (...`args`: \[`number`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="getroll"></a> `getRoll` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="setroll"></a> `setRoll` | (...`args`: \[`number`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="cameraforbounds"></a> `cameraForBounds` | (...`args`: \[`LngLatBoundsLike`, `CameraForBoundsOptions`\]) => `Promise`\<`CenterZoomBearing` \| `undefined`\> |  |
| <a id="_cameraforboxandbearing"></a> `_cameraForBoxAndBearing` | (...`args`: \[`LngLatLike`, `LngLatLike`, `number`, `CameraForBoundsOptions`\]) => `Promise`\<`CenterZoomBearing` \| `undefined`\> |  |
| <a id="fitbounds"></a> `fitBounds` | (...`args`: \[`LngLatBoundsLike`, `FitBoundsOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="fitscreencoordinates"></a> `fitScreenCoordinates` | (...`args`: \[`PointLike`, `PointLike`, `number`, `FitBoundsOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="_fitinternal"></a> `_fitInternal` | (...`args`: \[`CenterZoomBearing`, `FitBoundsOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="jumpto"></a> `jumpTo` | (...`args`: \[`JumpToOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="calculatecameraoptionsfromcameralnglataltrotation"></a> `calculateCameraOptionsFromCameraLngLatAltRotation` | (...`args`: \[`LngLatLike`, `number`, `number`, `number`, `number`\]) => `Promise`\<`CameraOptions`\> |  |
| <a id="easeto"></a> `easeTo` | (...`args`: \[`EaseToOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="_prepareease"></a> `_prepareEase` | (...`args`: \[`any`, `boolean`, \{ `moving?`: `boolean`; `zooming?`: `boolean`; `rotating?`: `boolean`; `pitching?`: `boolean`; `rolling?`: `boolean`; \}\]) => `Promise`\<`void`\> |  |
| <a id="_prepareelevation"></a> `_prepareElevation` | (...`args`: \[`LngLat`\]) => `Promise`\<`void`\> |  |
| <a id="_updateelevation"></a> `_updateElevation` | (...`args`: \[`number`\]) => `Promise`\<`void`\> |  |
| <a id="_finalizeelevation"></a> `_finalizeElevation` | (...`args`: \[\]) => `Promise`\<`void`\> |  |
| <a id="_gettransformforupdate"></a> `_getTransformForUpdate` | (...`args`: \[\]) => `Promise`\<`ITransform`\> |  |
| <a id="_elevatecameraifinsideterrain"></a> `_elevateCameraIfInsideTerrain` | (...`args`: \[`ITransform`\]) => `Promise`\<\{ `pitch?`: `number`; `zoom?`: `number`; \}\> |  |
| <a id="_applyupdatedtransform"></a> `_applyUpdatedTransform` | (...`args`: \[`ITransform`\]) => `Promise`\<`void`\> |  |
| <a id="_firemoveevents"></a> `_fireMoveEvents` | (...`args`: \[`any`\]) => `Promise`\<`void`\> |  |
| <a id="_afterease"></a> `_afterEase` | (...`args`: \[`any`, `string`\]) => `Promise`\<`void`\> |  |
| <a id="flyto"></a> `flyTo` | (...`args`: \[`FlyToOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="iseasing"></a> `isEasing` | (...`args`: \[\]) => `Promise`\<`boolean`\> |  |
| <a id="_stop"></a> `_stop` | (...`args`: \[`boolean`, `string`\]) => `Promise`\<`Map$1`\> |  |
| <a id="_ease"></a> `_ease` | (...`args`: \[(`_`: `number`) => `void`, () => `void`, \{ `animate?`: `boolean`; `duration?`: `number`; `easing?`: (`_`: `number`) => `number`; \}\]) => `Promise`\<`void`\> |  |
| <a id="_renderframecallback"></a> `_renderFrameCallback` | (...`args`: \[\]) => `Promise`\<`void`\> |  |
| <a id="_normalizebearing"></a> `_normalizeBearing` | (...`args`: \[`number`, `number`\]) => `Promise`\<`number`\> |  |
| <a id="queryterrainelevation"></a> `queryTerrainElevation` | (...`args`: \[`LngLatLike`\]) => `Promise`\<`number` \| `null`\> |  |
| <a id="_eventedparentdata"></a> `_eventedParentData` | (...`args`: `unknown`[]) => `Promise`\<`unknown`\> |  |
| <a id="listens"></a> `listens` | (...`args`: \[`string`\]) => `Promise`\<`boolean`\> |  |
| <a id="seteventedparent"></a> `setEventedParent` | (...`args`: \[`Evented` \| `null`, `any`\]) => `Promise`\<`Map$1`\> |  |
