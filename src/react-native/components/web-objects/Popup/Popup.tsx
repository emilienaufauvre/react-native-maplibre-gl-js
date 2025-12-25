import createWebObjectAsComponent from '../../../components-factories/web-objects/createWebObjectAsComponent'
import type { PopupProps, PopupRef } from './Popup.types'

/**
 * MapLibre Popup view.
 * @props {@link PopupProps}
 * @ref {@link PopupRef}
 * @see {@link https://maplibre.org/maplibre-gl-js/docs/API/classes/Popup/ `MapLibre GL JS` docs}
 * @example
 * ```tsx
 * <Popup
 *   ref={popupRef}
 *   options={{
 *     closeButton: true,
 *   }}
 *   listeners={{
 *     mount: {
 *       rnListener: () => {
 *         popupRef.current?.setLngLat([2.32, 48.86])
 *         popupRef.current?.setText('This is a popup')
 *         // The popup is opened once added to the map (as in the official
 *         // MapLibre GL JS docs).
 *         popupRef.current?.addTo()
 *       },
 *     },
 *     open: {
 *       objectListener: () => console.log('Popup opened'),
 *     },
 *     close: {
 *       objectListener: () => console.log('Popup closed'),
 *     },
 *   }}
 * />
 * ```
 * @group Components – web objects
 */
const Popup = createWebObjectAsComponent<PopupRef, PopupProps>('popup')

export default Popup
