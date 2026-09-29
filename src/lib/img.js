// Responsive-image helper.
//
// Every screenshot under /public ships in two widths: the full 1200px render
// and a 700px cut that matches how large the image is actually laid out
// (roughly 665px in the two-column rows). Shipping only the 1200px file made
// the browser download about twice the pixels it could display.
const SMALL_WIDTH = 700
const LARGE_WIDTH = 1200

/** "/foo.webp" -> "/foo-700.webp", the pre-rendered narrow cut. */
export function smallVariant(src) {
  return String(src).replace(/\.webp$/, `-${SMALL_WIDTH}.webp`)
}

/**
 * srcset for a full-size screenshot. `sizes` should describe the layout
 * width, so a phone picks the 700px file and a wide, high-DPI screen still
 * gets the 1200px one.
 */
export function screenshotSrcSet(src) {
  return `${smallVariant(src)} ${SMALL_WIDTH}w, ${src} ${LARGE_WIDTH}w`
}

// The rows cap at ~665px inside the 1224px container; below the 1024px
// breakpoint the grid collapses to one column, so the image is near full width.
export const SCREENSHOT_SIZES = '(max-width: 1024px) 92vw, 665px'
