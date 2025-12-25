import createWebObjectAsComponent from '../../../components-factories/web-objects/createWebObjectAsComponent'
import type { MarkerProps, MarkerRef } from './Marker.types'

/**
 * MapLibre Marker view.
 * @props {@link MarkerProps}
 * @ref {@link MarkerRef}
 * @see {@link https://maplibre.org/maplibre-gl-js/docs/API/classes/Marker/ `MapLibre GL JS` docs}
 * @example
 * ```tsx
 * <Marker
 *   ref={markerRef}
 *   options={{
 *     draggable: true,
 *     // The element to be used as the marker (a descriptor of an HTMLElement).
 *     element: {
 *       innerHTML: `
 *           <style>
 *             .pin {
 *               display: flex;
 *               align-items: center;
 *               justify-content: center;
 *               width: 32px;
 *               height: 32px;
 *               margin: 0;
 *               padding: 4px;
 *               border-radius: 50%;
 *               background-color: #FFF;
 *               box-shadow: 0 0 10px #000A;
 *             }
 *           </style>
 *           <div class="pin">
 *             <h1>📍</h1>
 *           </div>`,
 *     },
 *   }}
 *   listeners={{
 *     mount: {
 *       rnListener: () => {
 *         // The marker coordinate must be set on mount.
 *         markerRef.current?.setLngLat([2.32, 48.86])
 *       },
 *     },
 *     click: {
 *       elementListener: async (_: MouseEvent) => {
 *         const lngLat = await markerRef.current?.getLngLat()
 *         console.log('Marker clicked at', lngLat)
 *       },
 *     },
 *   }}
 * />
 * ```
 * @group Components – web objects
 */
const Marker = createWebObjectAsComponent<MarkerRef, MarkerProps>('marker')

export default Marker
