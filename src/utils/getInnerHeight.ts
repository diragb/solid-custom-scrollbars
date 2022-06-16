// Exports:
export default (el: Element) => {
  const { paddingTop, paddingBottom } = getComputedStyle(el)
  return el.clientHeight - parseFloat(paddingTop) - parseFloat(paddingBottom)
}
