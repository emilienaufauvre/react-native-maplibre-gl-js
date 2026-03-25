/**
 * @param data - The information to be normalized.
 * @returns A normalized array of non-empty strings or `undefined` if the given
 *  value is `undefined` or empty.
 */
export const normalizeData = (
  data?: string | string[],
): string[] | undefined => {
  const normalizedData = (Array.isArray(data) ? data : data ? [data] : [])
    .map((s) => s.trim())
    .filter(Boolean)

  return normalizedData.length ? normalizedData : undefined
}

/**
 * @param normalizedCss - The CSS to be injected, typically produced by
 *  {@link normalizeData}.
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
