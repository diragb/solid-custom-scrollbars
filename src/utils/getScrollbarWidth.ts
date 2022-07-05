// Packages:
import * as domcss from 'dom-css'


// Variables:
let scrollbarWidth: number | undefined


// Exports:
export default (cacheEnabled = true) => {
  if (cacheEnabled && scrollbarWidth !== undefined) return scrollbarWidth
  if (typeof document !== 'undefined') {
    const div = document.createElement('div')
    domcss.css(div, {
      width: '100px',
      height: '100px',
      position: 'absolute',
      top: -9999,
      overflow: 'scroll',
      MsOverflowStyle: 'scrollbar'
    })
    document.body.appendChild(div)
    scrollbarWidth = (div.offsetWidth - div.clientWidth)
    document.body.removeChild(div)
  } else {
    scrollbarWidth = 0
  }
  return scrollbarWidth || 0
}
