/**
 * @param css - The CSS to be normalized.
 * @returns A normalized array of non-empty CSS strings or `undefined` if the
 *  given CSS is `undefined` or empty.
 */
export const normalizeCss = (css?: string | string[]): string[] | undefined => {
  const normalizedCss = (Array.isArray(css) ? css : css ? [css] : [])
    .map((s) => s.trim())
    .filter(Boolean)

  return normalizedCss.length ? normalizedCss : undefined
}

/**
 * @param normalizedCss - The CSS to be injected, typically produced by
 *  {@link normalizeCss}.
 * @returns A JavaScript snippet that injects CSS into the document and
 *  evaluates to `true` once executed.
 */
export const buildCssInjectionScript = (normalizedCss: string[]): string => {
  const INJECTED_STYLE_ID = '__map_provider_injected_css__'

  const css = normalizedCss.join('\n')
  const cssJSON = JSON.stringify(css)
  const idJSON = JSON.stringify(INJECTED_STYLE_ID)

  return `
    (function() {
      try {
        var doc = document;
        var id = ${idJSON};
        var css = ${cssJSON};

        var styleEl = doc.getElementById(id);

        if (!styleEl) {
          styleEl = doc.createElement('style');
          styleEl.type = 'text/css';
          styleEl.id = id;
          // If the document head isn't available yet, we append the style to
          // documentElement as a fallback.
          // Note: this script won't automatically move the node later when head
          // becomes available; it will only be moved on a subsequent injection.
          (doc.head || doc.documentElement).appendChild(styleEl);
        }

        if (styleEl.textContent !== css) {
          styleEl.textContent = css;
        }

        // If head was not available at the time, bring it up now.
        if (doc.head && styleEl.parentNode !== doc.head) {
          doc.head.appendChild(styleEl);
        }
      } catch (_) {}

      return true;
    })();
  `
}
