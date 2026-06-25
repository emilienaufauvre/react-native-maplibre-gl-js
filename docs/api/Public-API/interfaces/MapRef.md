[react-native-maplibre-gl-js](../../index.md) / [Public API](../index.md) / MapRef

# MapRef

Defined in: [src/react-native/components/web-objects/Map/Map.types.ts:47](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/web-objects/Map/Map.types.ts#L47)

Map component ref.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-getid"></a> `getId` | () => `string` |  |
| <a id="property-off"></a> `off` | (...`args`: \[`string`, `Listener`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-remove"></a> `remove` | (...`args`: \[\]) => `Promise`\<`void`\> |  |
| <a id="property-stop"></a> `stop` | (...`args`: \[\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-_terraindatacallback"></a> `_terrainDataCallback` | (...`args`: \[`MapStyleDataEvent` \| `MapSourceDataEvent`\]) => `Promise`\<`void`\> |  |
| <a id="property-_getmapid"></a> `_getMapId` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="property-setglobalstateproperty"></a> `setGlobalStateProperty` | (...`args`: \[`string`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-getglobalstate"></a> `getGlobalState` | (...`args`: \[\]) => `Promise`\<`Record`\<`string`, `any`\>\> |  |
| <a id="property-addcontrol"></a> `addControl` | (...`args`: \[`IControl`, `ControlPosition`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-removecontrol"></a> `removeControl` | (...`args`: \[`IControl`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-hascontrol"></a> `hasControl` | (...`args`: \[`IControl`\]) => `Promise`\<`boolean`\> |  |
| <a id="property-coveringtiles"></a> `coveringTiles` | (...`args`: \[`CoveringTilesOptions`\]) => `Promise`\<`OverscaledTileID`[]\> |  |
| <a id="property-calculatecameraoptionsfromto"></a> `calculateCameraOptionsFromTo` | (...`args`: \[`LngLat`, `number`, `LngLat`, `number`\]) => `Promise`\<`CameraOptions`\> |  |
| <a id="property-resize"></a> `resize` | (...`args`: \[`any`, `boolean`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-_resizeinternal"></a> `_resizeInternal` | (...`args`: \[`boolean`\]) => `Promise`\<`void`\> |  |
| <a id="property-_resizetransform"></a> `_resizeTransform` | (...`args`: \[`boolean`\]) => `Promise`\<`void`\> |  |
| <a id="property-_getclampedpixelratio"></a> `_getClampedPixelRatio` | (...`args`: \[`number`, `number`\]) => `Promise`\<`number`\> |  |
| <a id="property-getpixelratio"></a> `getPixelRatio` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="property-setpixelratio"></a> `setPixelRatio` | (...`args`: \[`number`\]) => `Promise`\<`void`\> |  |
| <a id="property-getbounds"></a> `getBounds` | (...`args`: \[\]) => `Promise`\<`LngLatBounds`\> |  |
| <a id="property-getmaxbounds"></a> `getMaxBounds` | (...`args`: \[\]) => `Promise`\<`LngLatBounds` \| `null`\> |  |
| <a id="property-setmaxbounds"></a> `setMaxBounds` | (...`args`: \[`LngLatBoundsLike` \| `null`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-setminzoom"></a> `setMinZoom` | (...`args`: \[`number` \| `null`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-getminzoom"></a> `getMinZoom` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="property-setmaxzoom"></a> `setMaxZoom` | (...`args`: \[`number` \| `null`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-getmaxzoom"></a> `getMaxZoom` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="property-setminpitch"></a> `setMinPitch` | (...`args`: \[`number` \| `null`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-getminpitch"></a> `getMinPitch` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="property-setmaxpitch"></a> `setMaxPitch` | (...`args`: \[`number` \| `null`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-getmaxpitch"></a> `getMaxPitch` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="property-getanisotropicfilterpitch"></a> `getAnisotropicFilterPitch` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="property-setanisotropicfilterpitch"></a> `setAnisotropicFilterPitch` | (...`args`: \[`number` \| `null`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-getrenderworldcopies"></a> `getRenderWorldCopies` | (...`args`: \[\]) => `Promise`\<`boolean`\> |  |
| <a id="property-setrenderworldcopies"></a> `setRenderWorldCopies` | (...`args`: \[`boolean` \| `null`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-settransformconstrain"></a> `setTransformConstrain` | (...`args`: \[`TransformConstrainFunction` \| `null`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-project"></a> `project` | (...`args`: \[`LngLatLike`\]) => `Promise`\<`Point`\> |  |
| <a id="property-unproject"></a> `unproject` | (...`args`: \[`PointLike`\]) => `Promise`\<`LngLat`\> |  |
| <a id="property-ismoving"></a> `isMoving` | (...`args`: \[\]) => `Promise`\<`boolean`\> |  |
| <a id="property-iszooming"></a> `isZooming` | (...`args`: \[\]) => `Promise`\<`boolean`\> |  |
| <a id="property-isrotating"></a> `isRotating` | (...`args`: \[\]) => `Promise`\<`boolean`\> |  |
| <a id="property-_createdelegatedlistener"></a> `_createDelegatedListener` | (...`args`: \[`string`, `string`[], `Listener`\]) => `Promise`\<`DelegatedListener`\> |  |
| <a id="property-_savedelegatedlistener"></a> `_saveDelegatedListener` | (...`args`: \[`string`, `DelegatedListener`\]) => `Promise`\<`void`\> |  |
| <a id="property-_removedelegatedlistener"></a> `_removeDelegatedListener` | (...`args`: \[`string`, `string`[], `Listener`\]) => `Promise`\<`void`\> |  |
| <a id="property-on"></a> `on` | (...`args`: \[`string`, `Listener`\]) => `Promise`\<`Subscription`\> |  |
| <a id="property-once"></a> `once` | (...`args`: \[`string`, `Listener`\]) => `Promise`\<`Promise`\<`any`\> \| `Map$1`\> |  |
| <a id="property-queryrenderedfeatures"></a> `queryRenderedFeatures` | (...`args`: \[`PointLike` \| \[`PointLike`, `PointLike`\] \| `QueryRenderedFeaturesOptions`, `QueryRenderedFeaturesOptions`\]) => `Promise`\<`MapGeoJSONFeature`[]\> |  |
| <a id="property-querysourcefeatures"></a> `querySourceFeatures` | (...`args`: \[`string`, `QuerySourceFeatureOptions` \| `null`\]) => `Promise`\<`GeoJSONFeature`[]\> |  |
| <a id="property-setstyle"></a> `setStyle` | (...`args`: \[`string` \| `StyleSpecification` \| `null`, `StyleSwapOptions` & `StyleOptions`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-settransformrequest"></a> `setTransformRequest` | (...`args`: \[`RequestTransformFunction` \| `null`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-_getuistring"></a> `_getUIString` | (...`args`: \[`"AttributionControl.ToggleAttribution"` \| `"AttributionControl.MapFeedback"` \| `"FullscreenControl.Enter"` \| `"FullscreenControl.Exit"` \| `"GeolocateControl.FindMyLocation"` \| `"GeolocateControl.LocationNotAvailable"` \| `"LogoControl.Title"` \| `"Map.Title"` \| `"Marker.Title"` \| `"NavigationControl.ResetBearing"` \| `"NavigationControl.ZoomIn"` \| `"NavigationControl.ZoomOut"` \| `"Popup.Close"` \| `"ScaleControl.Feet"` \| `"ScaleControl.Meters"` \| `"ScaleControl.Kilometers"` \| `"ScaleControl.Miles"` \| `"ScaleControl.NauticalMiles"` \| `"GlobeControl.Enable"` \| `"GlobeControl.Disable"` \| `"TerrainControl.Enable"` \| `"TerrainControl.Disable"` \| `"CooperativeGesturesHandler.WindowsHelpText"` \| `"CooperativeGesturesHandler.MacHelpText"` \| `"CooperativeGesturesHandler.MobileHelpText"`\]) => `Promise`\<`string`\> |  |
| <a id="property-_updatestyle"></a> `_updateStyle` | (...`args`: \[`string` \| `StyleSpecification` \| `null`, `StyleSwapOptions` & `StyleOptions`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-_lazyinitemptystyle"></a> `_lazyInitEmptyStyle` | (...`args`: \[\]) => `Promise`\<`void`\> |  |
| <a id="property-_diffstyle"></a> `_diffStyle` | (...`args`: \[`string` \| `StyleSpecification`, `StyleSwapOptions` & `StyleOptions`\]) => `Promise`\<`Promise`\<`void`\>\> |  |
| <a id="property-_updatediff"></a> `_updateDiff` | (...`args`: \[`StyleSpecification`, `StyleSwapOptions` & `StyleOptions`\]) => `Promise`\<`void`\> |  |
| <a id="property-getstyle"></a> `getStyle` | (...`args`: \[\]) => `Promise`\<`StyleSpecification`\> |  |
| <a id="property-_getstyleandimages"></a> `_getStyleAndImages` | (...`args`: \[\]) => `Promise`\<`LostContextStyle`\> |  |
| <a id="property-isstyleloaded"></a> `isStyleLoaded` | (...`args`: \[\]) => `Promise`\<`boolean` \| `void`\> |  |
| <a id="property-addsource"></a> `addSource` | (...`args`: \[`string`, `SourceSpecification` \| `CanvasSourceSpecification`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-issourceloaded"></a> `isSourceLoaded` | (...`args`: \[`string`\]) => `Promise`\<`boolean`\> |  |
| <a id="property-setterrain"></a> `setTerrain` | (...`args`: \[`TerrainSpecification` \| `null`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-getterrain"></a> `getTerrain` | (...`args`: \[\]) => `Promise`\<`TerrainSpecification` \| `null`\> |  |
| <a id="property-aretilesloaded"></a> `areTilesLoaded` | (...`args`: \[\]) => `Promise`\<`boolean`\> |  |
| <a id="property-removesource"></a> `removeSource` | (...`args`: \[`string`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-getsource"></a> `getSource` | (...`args`: \[`string`\]) => `Promise`\<`Source` \| `undefined`\> |  |
| <a id="property-setsourcetilelodparams"></a> `setSourceTileLodParams` | (...`args`: \[`number`, `number`, `string`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-refreshtiles"></a> `refreshTiles` | (...`args`: \[`string`, \{ `x`: `number`; `y`: `number`; `z`: `number`; \}[]\]) => `Promise`\<`void`\> |  |
| <a id="property-addimage"></a> `addImage` | (...`args`: \[`string`, `string`, `Partial`\<`StyleImageMetadata`\>\]) => `Promise`\<`Promise`\<`void`\>\> |  |
| <a id="property-updateimage"></a> `updateImage` | (...`args`: \[`string`, `HTMLImageElement` \| `ImageBitmap` \| `ImageData` \| `StyleImageInterface` \| \{ `width`: `number`; `height`: `number`; `data`: `Uint8Array`\<`ArrayBufferLike`\> \| `Uint8ClampedArray`\<`ArrayBufferLike`\>; \}\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-getimage"></a> `getImage` | (...`args`: \[`string`\]) => `Promise`\<`StyleImage`\> |  |
| <a id="property-hasimage"></a> `hasImage` | (...`args`: \[`string`\]) => `Promise`\<`boolean`\> |  |
| <a id="property-removeimage"></a> `removeImage` | (...`args`: \[`string`\]) => `Promise`\<`void`\> |  |
| <a id="property-loadimage"></a> `loadImage` | (...`args`: \[`string`\]) => `Promise`\<`Promise`\<`GetResourceResponse`\<`HTMLImageElement` \| `ImageBitmap`\>\>\> |  |
| <a id="property-listimages"></a> `listImages` | (...`args`: \[\]) => `Promise`\<`string`[]\> |  |
| <a id="property-addlayer"></a> `addLayer` | (...`args`: \[`AddLayerObject`, `string`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-movelayer"></a> `moveLayer` | (...`args`: \[`string`, `string`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-removelayer"></a> `removeLayer` | (...`args`: \[`string`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-getlayer"></a> `getLayer` | (...`args`: \[`string`\]) => `Promise`\<`StyleLayer` \| `undefined`\> |  |
| <a id="property-getlayersorder"></a> `getLayersOrder` | (...`args`: \[\]) => `Promise`\<`string`[]\> |  |
| <a id="property-setlayerzoomrange"></a> `setLayerZoomRange` | (...`args`: \[`string`, `number`, `number`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-setfilter"></a> `setFilter` | (...`args`: \[`string`, `FilterSpecification` \| `null`, `StyleSetterOptions`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-getfilter"></a> `getFilter` | (...`args`: \[`string`\]) => `Promise`\<`void` \| `FilterSpecification`\> |  |
| <a id="property-setpaintproperty"></a> `setPaintProperty` | (...`args`: \[`string`, `string`, `any`, `StyleSetterOptions`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-getpaintproperty"></a> `getPaintProperty` | (...`args`: \[`string`, `string`\]) => `Promise`\<`unknown`\> |  |
| <a id="property-setlayoutproperty"></a> `setLayoutProperty` | (...`args`: \[`string`, `string`, `any`, `StyleSetterOptions`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-getlayoutproperty"></a> `getLayoutProperty` | (...`args`: \[`string`, `string`\]) => `Promise`\<`any`\> |  |
| <a id="property-setglyphs"></a> `setGlyphs` | (...`args`: \[`string` \| `null`, `StyleSetterOptions`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-getglyphs"></a> `getGlyphs` | (...`args`: \[\]) => `Promise`\<`string` \| `null`\> |  |
| <a id="property-addsprite"></a> `addSprite` | (...`args`: \[`string`, `string`, `StyleSetterOptions`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-removesprite"></a> `removeSprite` | (...`args`: \[`string`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-getsprite"></a> `getSprite` | (...`args`: \[\]) => `Promise`\<\{ `id`: `string`; `url`: `string`; \}[]\> |  |
| <a id="property-setsprite"></a> `setSprite` | (...`args`: \[`string` \| `null`, `StyleSetterOptions`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-setlight"></a> `setLight` | (...`args`: \[`LightSpecification`, `StyleSetterOptions`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-getlight"></a> `getLight` | (...`args`: \[\]) => `Promise`\<`LightSpecification`\> |  |
| <a id="property-setsky"></a> `setSky` | (...`args`: \[`SkySpecification`, `StyleSetterOptions`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-getsky"></a> `getSky` | (...`args`: \[\]) => `Promise`\<`SkySpecification`\> |  |
| <a id="property-setfeaturestate"></a> `setFeatureState` | (...`args`: \[`FeatureIdentifier`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-removefeaturestate"></a> `removeFeatureState` | (...`args`: \[`FeatureIdentifier`, `string`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-getfeaturestate"></a> `getFeatureState` | (...`args`: \[`FeatureIdentifier`\]) => `Promise`\<`any`\> |  |
| <a id="property-getcontainer"></a> `getContainer` | (...`args`: \[\]) => `Promise`\<`HTMLElement`\> |  |
| <a id="property-getcanvascontainer"></a> `getCanvasContainer` | (...`args`: \[\]) => `Promise`\<`HTMLElement`\> |  |
| <a id="property-getcanvas"></a> `getCanvas` | (...`args`: \[\]) => `Promise`\<`HTMLCanvasElement`\> |  |
| <a id="property-_containerdimensions"></a> `_containerDimensions` | (...`args`: \[\]) => `Promise`\<`number`[]\> |  |
| <a id="property-_setupcontainer"></a> `_setupContainer` | (...`args`: \[\]) => `Promise`\<`void`\> |  |
| <a id="property-_resizecanvas"></a> `_resizeCanvas` | (...`args`: \[`number`, `number`, `number`\]) => `Promise`\<`void`\> |  |
| <a id="property-_setuppainter"></a> `_setupPainter` | (...`args`: \[\]) => `Promise`\<`void`\> |  |
| <a id="property-migrateprojection"></a> `migrateProjection` | (...`args`: \[`ITransform`, `ICameraHelper`\]) => `Promise`\<`void`\> |  |
| <a id="property-_contextlost"></a> `_contextLost` | (...`args`: \[`any`\]) => `Promise`\<`void`\> |  |
| <a id="property-_contextrestored"></a> `_contextRestored` | (...`args`: \[`any`\]) => `Promise`\<`void`\> |  |
| <a id="property-_onmapscroll"></a> `_onMapScroll` | (...`args`: \[`any`\]) => `Promise`\<`boolean`\> |  |
| <a id="property-loaded"></a> `loaded` | (...`args`: \[\]) => `Promise`\<`boolean`\> |  |
| <a id="property-_update"></a> `_update` | (...`args`: \[`boolean`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-_requestrenderframe"></a> `_requestRenderFrame` | (...`args`: \[() => `void`\]) => `Promise`\<`number`\> |  |
| <a id="property-_cancelrenderframe"></a> `_cancelRenderFrame` | (...`args`: \[`number`\]) => `Promise`\<`void`\> |  |
| <a id="property-_render"></a> `_render` | (...`args`: \[`number`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-redraw"></a> `redraw` | (...`args`: \[\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-triggerrepaint"></a> `triggerRepaint` | (...`args`: \[\]) => `Promise`\<`void`\> |  |
| <a id="property-_onwindowonline"></a> `_onWindowOnline` | (...`args`: \[\]) => `Promise`\<`void`\> |  |
| <a id="property-getcameratargetelevation"></a> `getCameraTargetElevation` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="property-getprojection"></a> `getProjection` | (...`args`: \[\]) => `Promise`\<`ProjectionSpecification`\> |  |
| <a id="property-setprojection"></a> `setProjection` | (...`args`: \[`ProjectionSpecification`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-_oneaseframe"></a> `_onEaseFrame` | (...`args`: \[`number`\]) => `Promise`\<`void`\> |  |
| <a id="property-_oneaseend"></a> `_onEaseEnd` | (...`args`: \[`string`\]) => `Promise`\<`void`\> |  |
| <a id="property-getcenter"></a> `getCenter` | (...`args`: \[\]) => `Promise`\<`LngLat`\> |  |
| <a id="property-setcenter"></a> `setCenter` | (...`args`: \[`LngLatLike`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-getcenterelevation"></a> `getCenterElevation` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="property-setcenterelevation"></a> `setCenterElevation` | (...`args`: \[`number`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-getcenterclampedtoground"></a> `getCenterClampedToGround` | (...`args`: \[\]) => `Promise`\<`boolean`\> |  |
| <a id="property-setcenterclampedtoground"></a> `setCenterClampedToGround` | (...`args`: \[`boolean`\]) => `Promise`\<`void`\> |  |
| <a id="property-panby"></a> `panBy` | (...`args`: \[`PointLike`, `EaseToOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-panto"></a> `panTo` | (...`args`: \[`LngLatLike`, `EaseToOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-getzoom"></a> `getZoom` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="property-setzoom"></a> `setZoom` | (...`args`: \[`number`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-zoomto"></a> `zoomTo` | (...`args`: \[`number`, `EaseToOptions` \| `null`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-zoomin"></a> `zoomIn` | (...`args`: \[`AnimationOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-zoomout"></a> `zoomOut` | (...`args`: \[`AnimationOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-getverticalfieldofview"></a> `getVerticalFieldOfView` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="property-setverticalfieldofview"></a> `setVerticalFieldOfView` | (...`args`: \[`number`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-getbearing"></a> `getBearing` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="property-setzoomsnap"></a> `setZoomSnap` | (...`args`: \[`number`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-getzoomsnap"></a> `getZoomSnap` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="property-setbearing"></a> `setBearing` | (...`args`: \[`number`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-getpadding"></a> `getPadding` | (...`args`: \[\]) => `Promise`\<`PaddingOptions`\> |  |
| <a id="property-setpadding"></a> `setPadding` | (...`args`: \[`PaddingOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-rotateto"></a> `rotateTo` | (...`args`: \[`number`, `EaseToOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-resetnorth"></a> `resetNorth` | (...`args`: \[`AnimationOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-resetnorthpitch"></a> `resetNorthPitch` | (...`args`: \[`AnimationOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-snaptonorth"></a> `snapToNorth` | (...`args`: \[`AnimationOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-getpitch"></a> `getPitch` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="property-setpitch"></a> `setPitch` | (...`args`: \[`number`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-getroll"></a> `getRoll` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="property-setroll"></a> `setRoll` | (...`args`: \[`number`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-cameraforbounds"></a> `cameraForBounds` | (...`args`: \[`LngLatBoundsLike`, `CameraForBoundsOptions`\]) => `Promise`\<`CenterZoomBearing` \| `undefined`\> |  |
| <a id="property-_cameraforboxandbearing"></a> `_cameraForBoxAndBearing` | (...`args`: \[`LngLatLike`, `LngLatLike`, `number`, `CameraForBoundsOptions`\]) => `Promise`\<`CenterZoomBearing` \| `undefined`\> |  |
| <a id="property-fitbounds"></a> `fitBounds` | (...`args`: \[`LngLatBoundsLike`, `FitBoundsOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-fitscreencoordinates"></a> `fitScreenCoordinates` | (...`args`: \[`PointLike`, `PointLike`, `number`, `FitBoundsOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-_fitinternal"></a> `_fitInternal` | (...`args`: \[`CenterZoomBearing`, `FitBoundsOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-jumpto"></a> `jumpTo` | (...`args`: \[`JumpToOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-calculatecameraoptionsfromcameralnglataltrotation"></a> `calculateCameraOptionsFromCameraLngLatAltRotation` | (...`args`: \[`LngLatLike`, `number`, `number`, `number`, `number`\]) => `Promise`\<`CameraOptions`\> |  |
| <a id="property-easeto"></a> `easeTo` | (...`args`: \[`EaseToOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-_prepareease"></a> `_prepareEase` | (...`args`: \[`any`, `boolean`, \{ `moving?`: `boolean`; `zooming?`: `boolean`; `rotating?`: `boolean`; `pitching?`: `boolean`; `rolling?`: `boolean`; \}\]) => `Promise`\<`void`\> |  |
| <a id="property-_prepareelevation"></a> `_prepareElevation` | (...`args`: \[`LngLat`\]) => `Promise`\<`void`\> |  |
| <a id="property-_updateelevation"></a> `_updateElevation` | (...`args`: \[`number`\]) => `Promise`\<`void`\> |  |
| <a id="property-_finalizeelevation"></a> `_finalizeElevation` | (...`args`: \[\]) => `Promise`\<`void`\> |  |
| <a id="property-_gettransformforupdate"></a> `_getTransformForUpdate` | (...`args`: \[\]) => `Promise`\<`ITransform`\> |  |
| <a id="property-_elevatecameraifinsideterrain"></a> `_elevateCameraIfInsideTerrain` | (...`args`: \[`ITransform`\]) => `Promise`\<\{ `pitch?`: `number`; `zoom?`: `number`; \}\> |  |
| <a id="property-_applyupdatedtransform"></a> `_applyUpdatedTransform` | (...`args`: \[`ITransform`\]) => `Promise`\<`void`\> |  |
| <a id="property-_firemoveevents"></a> `_fireMoveEvents` | (...`args`: \[`any`\]) => `Promise`\<`void`\> |  |
| <a id="property-_afterease"></a> `_afterEase` | (...`args`: \[`any`, `string`\]) => `Promise`\<`void`\> |  |
| <a id="property-flyto"></a> `flyTo` | (...`args`: \[`FlyToOptions`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-iseasing"></a> `isEasing` | (...`args`: \[\]) => `Promise`\<`boolean`\> |  |
| <a id="property-_stop"></a> `_stop` | (...`args`: \[`boolean`, `string`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-_ease"></a> `_ease` | (...`args`: \[(`_`: `number`) => `void`, () => `void`, \{ `animate?`: `boolean`; `duration?`: `number`; `easing?`: (`_`: `number`) => `number`; \}\]) => `Promise`\<`void`\> |  |
| <a id="property-_renderframecallback"></a> `_renderFrameCallback` | (...`args`: \[\]) => `Promise`\<`void`\> |  |
| <a id="property-_normalizebearing"></a> `_normalizeBearing` | (...`args`: \[`number`, `number`\]) => `Promise`\<`number`\> |  |
| <a id="property-queryterrainelevation"></a> `queryTerrainElevation` | (...`args`: \[`LngLatLike`\]) => `Promise`\<`number` \| `null`\> |  |
| <a id="property-_eventedparentdata"></a> `_eventedParentData` | (...`args`: `unknown`[]) => `Promise`\<`unknown`\> |  |
| <a id="property-fire"></a> `fire` | (...`args`: \[`string` \| `Event$1`, `any`\]) => `Promise`\<`Map$1`\> |  |
| <a id="property-listens"></a> `listens` | (...`args`: \[`string`\]) => `Promise`\<`boolean`\> |  |
| <a id="property-seteventedparent"></a> `setEventedParent` | (...`args`: \[`Evented` \| `null`, `any`\]) => `Promise`\<`Map$1`\> |  |
